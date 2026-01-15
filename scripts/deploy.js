const { NodeSSH } = require('node-ssh');
const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const ora = require('ora').default || require('ora');
require('dotenv').config();

const ssh = new NodeSSH();

// Configuration
const config = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 22,
    username: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    privateKeyPath: process.env.SERVER_PRIVATE_KEY_PATH,
    remotePath: process.env.REMOTE_DEST_PATH,
    keepReleases: process.env.KEEP_RELEASES || 5
};

function validateConfig() {
    const required = ['host', 'username', 'remotePath'];
    const missing = required.filter(key => !config[key]);

    if (!config.password && !config.privateKeyPath) {
        missing.push('password OR privateKeyPath');
    }

    if (missing.length > 0) {
        console.error(chalk.red('Error: Missing configuration variables:'));
        missing.forEach(key => console.error(chalk.red(` - ${key}`)));
        console.error(chalk.yellow('Please check your .env file.'));
        process.exit(1);
    }
}

// ... existing code ...

function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const cmd = spawn(command, args, {
            shell: true,
            stdio: 'inherit', // Changed to inherit to see output directly
            ...options
        });

        cmd.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}`));
            }
        });

        cmd.on('error', (err) => {
            reject(err);
        });
    });
}

async function buildProject() {
    console.log(chalk.blue('\n🏗️  Starting build process...'));
    
    try {
        // Clean
        console.log(chalk.yellow('\nRunning clean...'));
        await runCommand('npx', ['hexo', 'clean']);
        console.log(chalk.green('Clean successful'));

        // Build
        console.log(chalk.yellow('\nRunning generate...'));
        await runCommand('npx', ['hexo', 'generate']);
        console.log(chalk.green('Build successful'));

        // Verify
        if (!fs.existsSync(path.join(__dirname, '../public/index.html'))) {
            throw new Error('public/index.html not found after build');
        }
    } catch (err) {
        console.error(chalk.red('\nBuild process failed:'));
        console.error(err);
        process.exit(1);
    }
}

async function cleanupOldReleases() {
    if (!config.keepReleases || config.keepReleases <= 0) return;
    
    const spinner = ora('Cleaning up old backups...').start();
    try {
        const parentDir = path.posix.dirname(config.remotePath);
        // Find backup files sorted by time
        const cmd = `ls -tp ${parentDir}/backup_*.tar.gz | grep -v '/$' | tail -n +${parseInt(config.keepReleases) + 1} | xargs -I {} rm -- "{}"`;
        
        await ssh.execCommand(cmd);
        spinner.succeed(`Cleaned up old backups (kept ${config.keepReleases})`);
    } catch (err) {
        spinner.warn('Failed to clean old backups (non-critical)');
    }
}

async function connectServer() {
    const spinner = ora(`Connecting to ${config.host}...`).start();
    try {
        const sshConfig = {
            host: config.host,
            port: config.port,
            username: config.username,
        };
        
        if (config.privateKeyPath) {
            sshConfig.privateKeyPath = config.privateKeyPath;
        } else {
            sshConfig.password = config.password;
        }

        await ssh.connect(sshConfig);
        spinner.succeed(`Connected to ${config.host}`);
    } catch (err) {
        spinner.fail('Connection failed');
        console.error(chalk.red(err));
        process.exit(1);
    }
}

async function backupRemote() {
    const spinner = ora('Backing up remote files...').start();
    try {
        // Check if remote path exists
        const checkDir = await ssh.execCommand(`[ -d "${config.remotePath}" ] && echo "exists"`);
        
        if (checkDir.stdout.trim() === 'exists') {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupName = `backup_${timestamp}.tar.gz`;
            // Use path.posix for remote (Linux) paths to ensure forward slashes
            const parentDir = path.posix.dirname(config.remotePath);
            const dirName = path.posix.basename(config.remotePath);
            
            // Create backup archive
            // We backup the directory to the parent folder
            const cmd = `tar -czf ${path.posix.join(parentDir, backupName)} -C ${parentDir} ${dirName}`;
            
            const result = await ssh.execCommand(cmd);
            if (result.code !== 0) {
                throw new Error(`Backup failed: ${result.stderr}`);
            }
            spinner.succeed(`Backup created: ${backupName}`);
        } else {
            spinner.info('Remote directory does not exist, skipping backup.');
            // Create directory
            await ssh.execCommand(`mkdir -p ${config.remotePath}`);
        }
    } catch (err) {
        spinner.fail('Backup failed');
        console.error(chalk.red(err));
        process.exit(1);
    }
}

async function uploadFiles() {
    const spinner = ora('Uploading files...').start();
    try {
        const localPath = path.join(__dirname, '../public');
        
        // Use putDirectory
        const status = await ssh.putDirectory(localPath, config.remotePath, {
            recursive: true,
            concurrency: 10,
            validate: (itemPath) => {
                const baseName = path.basename(itemPath);
                return baseName.substr(0, 1) !== '.' && // ignore hidden files
                       baseName !== 'node_modules';
            },
            tick: (localPath, remotePath, error) => {
                // optional progress update
            }
        });

        if (!status) {
            throw new Error('Upload failed');
        }
        spinner.succeed('Files uploaded successfully');
    } catch (err) {
        spinner.fail('Upload failed');
        console.error(chalk.red(err));
        process.exit(1);
    }
}

async function verifyDeployment() {
    const spinner = ora('Verifying deployment...').start();
    try {
        // Simple verification: check if index.html exists and is not empty
        const cmd = `[ -s "${path.posix.join(config.remotePath, 'index.html')}" ] && echo "verified"`;
        const result = await ssh.execCommand(cmd);
        
        if (result.stdout.trim() === 'verified') {
            spinner.succeed('Deployment verified successfully');
        } else {
            throw new Error('Verification failed: index.html missing or empty');
        }
    } catch (err) {
        spinner.fail('Verification failed');
        console.error(chalk.red(err));
        // Note: Automatic rollback logic could be added here
    }
}

async function run() {
    console.log(chalk.green('🚀 Starting Deployment Script\n'));
    
    validateConfig();
    
    await buildProject();
    
    await connectServer();
    
    await backupRemote();
    
    await cleanupOldReleases();
    
    await uploadFiles();
    
    await verifyDeployment();
    
    ssh.dispose();
    
    console.log(chalk.green('\n✨ Deployment completed successfully!'));
}

if (require.main === module) {
    run();
}
