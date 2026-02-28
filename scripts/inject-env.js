/**
 * Hexo 脚本：构建时注入加密的 API 密钥
 * 从 .env 文件读取 API 密钥，加密后注入到主题配置中
 */

'use strict';

require('dotenv').config();

// 混淆密钥（用于 XOR 加密）
const OBFUSCATION_KEY = 'kira-blog-2024';

/**
 * 简单加密函数
 * 使用 Base64 + 反转 + XOR 混淆
 * @param {string} text - 待加密文本
 * @returns {string} - 加密后的文本
 */
function encrypt(text) {
    if (!text) return '';
    
    // 1. 先进行 Base64 编码
    const base64 = Buffer.from(text).toString('base64');
    
    // 2. 字符串反转
    const reversed = base64.split('').reverse().join('');
    
    // 3. XOR 混淆
    let xored = '';
    for (let i = 0; i < reversed.length; i++) {
        const charCode = reversed.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length);
        xored += String.fromCharCode(charCode);
    }
    
    // 4. 再次 Base64 编码
    return Buffer.from(xored).toString('base64');
}

/**
 * 加密 API 密钥数组
 * @param {string[]} keys - API 密钥数组
 * @returns {string[]} - 加密后的密钥数组
 */
function encryptKeys(keys) {
    if (!Array.isArray(keys)) {
        keys = [keys].filter(Boolean);
    }
    return keys.map(key => encrypt(key));
}

// Hexo 过滤器：在生成前修改主题配置
hexo.extend.filter.register('before_generate', function() {
    const theme = hexo.theme.config;
    
    if (!theme.ai_assistant || !theme.ai_assistant.enable) {
        return;
    }
    
    // 从环境变量读取 API 密钥
    const siliconFlowKeys = [
        process.env.SILICON_FLOW_API_KEY_1,
        process.env.SILICON_FLOW_API_KEY_2
    ].filter(Boolean);
    
    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    
    // 加密并注入到配置中
    if (siliconFlowKeys.length > 0) {
        theme.ai_assistant.silicon_flow.api_key = encryptKeys(siliconFlowKeys);
        theme.ai_assistant.silicon_flow.encrypted = true;
    }
    
    if (deepseekKey) {
        theme.ai_assistant.deepseek.api_key = encrypt(deepseekKey);
        theme.ai_assistant.deepseek.encrypted = true;
    }
    
    // 注入混淆密钥（前端解密需要）
    theme.ai_assistant.obfuscation_key = OBFUSCATION_KEY;
    
    hexo.log.info('API 密钥已从 .env 加载并加密注入');
});
