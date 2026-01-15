const { NodeSSH } = require('node-ssh');
const chalk = require('chalk');
const path = require('path');
const ora = require('ora').default || require('ora');
require('dotenv').config();

const ssh = new NodeSSH();

// Configuration (Reused from deploy.js logic)
const config = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 22,
    username: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    privateKeyPath: process.env.SERVER_PRIVATE_KEY_PATH,
    remotePath: process.env.REMOTE_DEST_PATH,
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

async function performRollback() {
    const spinner = ora('Finding latest backup...').start();
    try {
        const parentDir = path.posix.dirname(config.remotePath);
        
        // Find latest backup file
        // ls -t sorts by modification time (newest first)
        const cmd = `ls -t ${parentDir}/backup_*.tar.gz | head -n 1`;
        const result = await ssh.execCommand(cmd);
        
        const backupFile = result.stdout.trim();
        
        if (!backupFile) {
            spinner.fail('No backup found!');
            process.exit(1);
        }
        
        spinner.succeed(`Found latest backup: ${path.posix.basename(backupFile)}`);
        
        // Restore
        const restoreSpinner = ora('Restoring backup...').start();
        
        // 1. Remove current files (safety first: maybe just overwrite? tar overwrites by default)
        // But to be clean, let's empty the directory first to remove added files in broken deploy
        // Be careful not to delete the directory itself if it's a mount point or something, but rm -rf dir/* is usually safe
        // However, config.remotePath might be /var/www/html
        
        // Safer approach: Extract directly. Tar will overwrite existing files.
        // But files that were *added* in the new (broken) version but didn't exist in the backup will remain.
        // So we SHOULD clean the directory.
        
        await ssh.execCommand(`rm -rf ${config.remotePath}/*`);
        
        // 2. Extract
        // backup was created with: tar -czf ... -C parentDir dirName
        // so it contains 'dirName' at the root.
        // If we extract to parentDir, it will recreate 'dirName' (which is config.remotePath)
        
        const extractCmd = `tar -xzf ${backupFile} -C ${parentDir}`;
        const extractResult = await ssh.execCommand(extractCmd);
        
        if (extractResult.code !== 0) {
            throw new Error(`Extraction failed: ${extractResult.stderr}`);
        }
        
        restoreSpinner.succeed('Backup restored successfully');

        // Delete the backup file after successful restoration
        const deleteSpinner = ora('Deleting used backup...').start();
        const deleteResult = await ssh.execCommand(`rm "${backupFile}"`);
        
        if (deleteResult.code !== 0) {
             deleteSpinner.warn(`Failed to delete backup file: ${deleteResult.stderr}`);
        } else {
             deleteSpinner.succeed('Backup file deleted permanently');
        }
        
    } catch (err) {
        spinner.fail('Rollback failed');
        console.error(chalk.red(err));
        process.exit(1);
    }
}

async function run() {
    console.log(chalk.magenta('⏪ Starting Rollback Script\n'));
    
    validateConfig();
    
    await connectServer();
    
    await performRollback();
    
    ssh.dispose();
    
    console.log(chalk.magenta('\n✨ Rollback completed successfully!'));
}

if (require.main === module) {
    run();
}
