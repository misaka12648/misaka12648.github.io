/**
 * AI悬浮球助手JavaScript模块
 * 企业级AI助手功能实现
 * 集成DeepSeek API，支持实时对话
 */
let converter = new showdown.Converter();
converter.setOption('tables', true);

class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];

        // 从主题配置中读取API配置
        this.loadApiConfig();

        // 默认使用硅基流动API
        this.apiKey = this.siliconFlowApiKey;
        this.apiUrl = this.siliconFlowApiUrl;
        this.model = this.siliconFlowModel;

        this.init();
    }

    /**
     * 从主题配置中加载API配置
     * 支持从window.aiAssistantConfig或_config.kira.yml中读取配置
     */
    loadApiConfig() {
        // 尝试从全局变量获取配置
        let config = {};

        // 从页面中查找配置脚本标签
        const configScript = document.getElementById('ai-assistant-config');
        if (configScript) {
            try {
                config = JSON.parse(configScript.textContent);
                console.log('从页面脚本标签加载配置');
            } catch (e) {
                console.error('解析配置脚本失败:', e);
            }
        } else if (window.aiAssistantConfig) {
            config = window.aiAssistantConfig;
            console.log('从全局变量aiAssistantConfig加载配置');
        } else if (window.themeConfig?.ai_assistant) {
            config = window.themeConfig.ai_assistant;
            console.log('从themeConfig加载配置');
        } else {
            console.log('未找到全局配置，使用默认配置');
        }

        // 硅基流动API配置
        const siliconFlowConfig = config.silicon_flow;

        this.siliconFlowApiKey = siliconFlowConfig.api_key
        this.siliconFlowApiUrl = 'https://api.siliconflow.cn/v1/chat/completions';
        this.siliconFlowModel = siliconFlowConfig.model;

        // DeepSeek API配置（作为备用）
        const deepseekConfig = config.deepseek;
        this.deepseekApiKey = deepseekConfig.api_key;
        this.deepseekApiUrl = 'https://api.deepseek.com/v1/chat/completions';
        this.deepseekModel = deepseekConfig.model;

        console.log('已从配置文件加载API配置');
    }

    /**
     * 初始化AI助手
     */
    init() {
        const configScript = document.getElementById('ai-assistant-config');
        const config = JSON.parse(configScript.textContent);
        const isEnabled = config.enable;
        
        if (isEnabled) {
            this.createUI();
            this.elements.textarea.style.height = '36px';
            this.bindEvents();
            this.addWelcomeMessage();
        }

    }

    /**
     * 创建UI界面
     */
    createUI() {
        // 创建悬浮球容器
        const container = document.createElement('div');
        container.className = 'ai-assistant-container';
        container.innerHTML = `
            <div class="ai-chat-window">
                <div class="ai-chat-header">
                    <div class="ai-chat-title">
                        <img src="/img/deepseek.svg" class="ai-icon" alt="DeepSeek AI">
                        <span class="ai-title-text">DeepSeek-V3.2-Exp</span>
                    </div>
                    <button class="ai-close-btn" title="关闭">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>
                <div class="ai-messages"></div>
                <div class="ai-input-area">
                    <div class="ai-input-group">
                        <textarea 
                            class="ai-textarea" 
                            placeholder="请输入您的问题..." 
                            rows="1"
                            maxlength="200"
                        ></textarea>
                        <button class="ai-send-btn" title="发送">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <button class="ai-assistant-btn" title="AI助手">
                <img src="/img/deepseek.svg" class="ai-icon" alt="DeepSeek AI">
            </button>
        `;

        document.body.appendChild(container);

        // 保存DOM元素引用
        this.elements = {
            container,
            chatWindow: container.querySelector('.ai-chat-window'),
            messages: container.querySelector('.ai-messages'),
            textarea: container.querySelector('.ai-textarea'),
            sendBtn: container.querySelector('.ai-send-btn'),
            closeBtn: container.querySelector('.ai-close-btn'),
            assistantBtn: container.querySelector('.ai-assistant-btn')
        };
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 悬浮球点击事件
        this.elements.assistantBtn.addEventListener('click', () => {
            this.toggleChat();
        });

        // 移动端触摸事件支持
        this.elements.assistantBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.toggleChat();
        });

        // 悬浮球拖拽事件
        this.initDrag();

        // 关闭按钮事件
        this.elements.closeBtn.addEventListener('click', () => {
            this.closeChat();
        });

        // 发送按钮事件
        this.elements.sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        // 回车发送消息
        this.elements.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 自动调整文本框高度
        this.elements.textarea.addEventListener('input', () => {
            this.autoResizeTextarea();
        });

        // 禁止输入空格
        this.elements.textarea.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                e.preventDefault();
            }
        });
    }

    /**
     * 初始化拖拽功能
     * 企业级拖拽实现，支持左右吸附效果
     */
    initDrag() {
        const btn = this.elements.assistantBtn;
        const container = this.elements.container;
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        // 鼠标按下事件
        btn.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            // 获取容器当前位置
            const rect = container.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            // 添加拖拽样式
            container.style.transition = 'none';
            btn.style.cursor = 'grabbing';

            e.preventDefault();
        });

        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            // 计算新位置
            const newLeft = initialLeft + deltaX;
            const newTop = initialTop + deltaY;

            // 限制在可视区域内
            const maxX = window.innerWidth - btn.offsetWidth;
            const maxY = window.innerHeight - btn.offsetHeight;

            const clampedX = Math.max(0, Math.min(newLeft, maxX));
            const clampedY = Math.max(0, Math.min(newTop, maxY));

            // 应用新位置到容器
            container.style.left = clampedX + 'px';
            container.style.top = clampedY + 'px';
            container.style.right = 'auto';
            container.style.bottom = 'auto';
        });

        // 鼠标释放事件
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;

            isDragging = false;
            btn.style.cursor = 'pointer';
            container.style.transition = 'all 0.3s ease';

            // 应用吸附效果
            this.applySnapEffect(container);
        });

        // 触摸设备支持
        btn.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;

            const rect = container.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            container.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            const newLeft = initialLeft + deltaX;
            const newTop = initialTop + deltaY;

            const maxX = window.innerWidth - btn.offsetWidth;
            const maxY = window.innerHeight - btn.offsetHeight;

            const clampedX = Math.max(0, Math.min(newLeft, maxX));
            const clampedY = Math.max(0, Math.min(newTop, maxY));

            container.style.left = clampedX + 'px';
            container.style.top = clampedY + 'px';
            container.style.right = 'auto';
            container.style.bottom = 'auto';

            // e.preventDefault();
        });

        document.addEventListener('touchend', () => {
            if (!isDragging) return;

            isDragging = false;
            container.style.transition = 'all 0.3s ease';
            this.applySnapEffect(container);
        });
    }

    /**
     * 应用左右吸附效果
     * @param {HTMLElement} btn - 悬浮球元素
     */
    applySnapEffect(btn) {
        const rect = btn.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const btnWidth = btn.offsetWidth;

        // 计算中心点位置
        const centerX = rect.left + btnWidth / 2;

        // 判断距离左右边界的距离
        const distanceToLeft = centerX;
        const distanceToRight = windowWidth - centerX;

        // 应用吸附效果
        if (distanceToLeft < distanceToRight) {
            // 吸附到左侧
            btn.style.left = '20px';
            btn.style.right = 'auto';
        } else {
            // 吸附到右侧
            btn.style.left = 'auto';
            btn.style.right = '5vw';
        }

        // 保持垂直位置
        btn.style.top = rect.top + 'px';
        btn.style.bottom = 'auto';
    }

    /**
     * 点击外部关闭聊天窗口
     */
    initClickOutside() {
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.elements.container.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    /**
     * 切换聊天窗口显示状态
     */
    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.elements.chatWindow.classList.add('active');
            this.elements.textarea.focus();

            // 根据悬浮球位置计算弹窗显示位置
            this.calculateChatWindowPosition();
        } else {
            this.elements.chatWindow.classList.remove('active');
        }
    }

    /**
     * 计算聊天窗口显示位置
     * 当悬浮球在右半边时，弹窗在悬浮球的左上角显示
     */
    calculateChatWindowPosition() {
        const chatWindow = this.elements.chatWindow;
        const assistantBtn = this.elements.assistantBtn;

        // 获取悬浮球位置
        const btnRect = assistantBtn.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // 计算悬浮球中心点
        const btnCenterX = btnRect.left + btnRect.width / 2;

        // 判断悬浮球在屏幕的哪半边
        if (btnCenterX > windowWidth / 2) {
            // 悬浮球在右半边，弹窗显示在悬浮球左上角
            chatWindow.style.left = 'auto';
            chatWindow.style.right = '5vw';
            chatWindow.style.bottom = '10vh';
        } else {
            // 悬浮球在左半边，弹窗显示在悬浮球右上角
            chatWindow.style.left = '5vw';
            chatWindow.style.bottom = '10vh';
        }
    }

    /**
     * 关闭聊天窗口
     */
    closeChat() {
        this.isOpen = false;
        this.elements.chatWindow.classList.remove('active');
    }

    /**
     * 发送消息
     */
    async sendMessage() {
        const message = this.elements.textarea.value.trim();
        if (!message) return;

        // 清空输入框
        this.elements.textarea.value = '';
        this.autoResizeTextarea();

        // 禁用发送按钮
        this.elements.sendBtn.disabled = true;

        // 添加用户消息
        this.addMessage(message, 'user');

        try {
            // 显示加载状态
            this.showLoading();

            // 处理API响应（优先使用硅基流动API，失败时回退到DeepSeek API）
            await this.processApiResponse(message);

        } catch (error) {
            console.error('AI助手错误:', error);
            // 错误处理已在processApiResponse中完成
        }

        // 重新启用发送按钮
        this.elements.sendBtn.disabled = false;
    }

    /**
     * 调用AI API（优先按顺序使用硅基流动API密钥，全部失败后回退到DeepSeek API）
     */
    async callDeepSeekAPI(message) {
        // 构建对话历史
        const messages = [
            {
                role: 'system',
                content: '你是一个在博主（misaka12648）的博客（https://misaka12648.xyz/）上的AI助手，你的知识库优先是我博客中的所有文章，文章路径是这种类型（https://misaka12648.xyz/2025/04/12/%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%96%B9%E6%A1%88/），当用户咨询前端技术或博客文章相关内容时，请优先使用博客文章中的方案和表述，并以简体中文回复，确保答案专业、准确、简洁。如问题超出博客范围，你可以跳出博客中的文章范围，并予以说明、给出你的专业、准确、简洁的回答。要使用轻松、符合AI小助手的口吻，营造博客的社区感。'
            },
            ...this.conversationHistory.slice(-6), // 保留最近6轮对话
            {
                role: 'user',
                content: message
            }
        ];

        // 按顺序尝试硅基流动的多个API密钥
        const siliconFlowApiKeys = this.siliconFlowApiKey;

        // 首先尝试所有硅基流动API密钥
        for (let i = 0; i < siliconFlowApiKeys.length; i++) {
            try {
                const currentApiKey = siliconFlowApiKeys[i];
                this.apiKey = currentApiKey;
                this.apiUrl = this.siliconFlowApiUrl;
                this.model = this.siliconFlowModel;

                console.log(`正在使用硅基流动API密钥 ${i + 1}/${siliconFlowApiKeys.length}...`);

                // 设置流式请求
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: messages,
                        temperature: 0.7,
                        max_tokens: 1000,
                        stream: true  // 启用流式输出
                    })
                });

                if (!response.ok) {
                    console.warn(`硅基流动API密钥 ${i + 1} 请求失败: ${response.status}`);
                    continue; // 尝试下一个API密钥
                }

                return response;

            } catch (error) {
                console.warn(`硅基流动API密钥 ${i + 1} 请求异常:`, error);
                continue; // 尝试下一个API密钥
            }
        }

        // 所有硅基流动API密钥都失败，回退到DeepSeek API
        console.log('所有硅基流动API密钥均失败，回退到DeepSeek API...');
        this.apiKey = this.deepseekApiKey;
        this.apiUrl = this.deepseekApiUrl;
        this.model = this.deepseekModel;

        // 设置流式请求
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
                stream: true  // 启用流式输出
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API请求也失败: ${response.status}`);
        }

        return response;
    }

    /**
     * 处理API响应
     */
    async processApiResponse(message) {
        try {
            // 调用API并获取响应
            const response = await this.callDeepSeekAPI(message);
            let aiResponse = '';

            // 获取流式读取器
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            // 循环读取流数据
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                // 解码数据块
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.substring(6);
                        if (jsonStr === '[DONE]') break;

                        try {
                            const data = JSON.parse(jsonStr);
                            const token = data.choices[0]?.delta?.content || '';

                            // 如果是第一个token，隐藏loading并创建消息元素
                            if (aiResponse === '' && token) {
                                this.hideLoading();
                                const messageDiv = document.createElement('div');
                                messageDiv.className = 'ai-message assistant markdown-body';
                                this.elements.messages.appendChild(messageDiv);
                                messageDiv.textContent = token;
                            } else if (aiResponse !== '') {
                                // 继续追加到现有消息
                                const messageDiv = this.elements.messages.querySelector('.ai-message.assistant:last-child');
                                if (messageDiv) {
                                    messageDiv.innerHTML = converter.makeHtml(aiResponse + token);
                                }
                            }

                            aiResponse += token;
                            this.scrollToBottom();
                        } catch (e) {
                            console.error('解析JSON错误:', e);
                        }
                    }
                }
            }

            // 确保流式输出结束后隐藏loading状态
            this.hideLoading();

            // 更新对话历史
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            );

            return aiResponse;
        } catch (error) {
            console.error('处理API响应时出错:', error);
            this.hideLoading();
            this.addMessage('抱歉，AI助手暂时无法响应，请稍后重试。', 'assistant');
            throw error;
        }
    }

    /**
     * 添加消息到聊天窗口
     */
    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${type}`;
        messageDiv.textContent = content;

        this.elements.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * 显示加载状态
     */
    showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'ai-loading';
        loadingDiv.innerHTML = `
            <div class="ai-loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span>AI正在思考...</span>
        `;

        this.elements.messages.appendChild(loadingDiv);
        this.scrollToBottom();

        this.currentLoading = loadingDiv;
    }

    /**
     * 隐藏加载状态
     */
    hideLoading() {
        if (this.currentLoading) {
            this.currentLoading.remove();
            this.currentLoading = null;
        }
    }

    /**
     * 添加欢迎消息
     */
    addWelcomeMessage() {
        const welcomeMessage = 'Ciallo～(∠・ω< )⌒★ 我是Misaka12648の小站的AI小助手，我对站内所有文章都了如指掌，也可以回答您前端开发的知识，欢迎向我提问(=^・^=)';
        this.addMessage(welcomeMessage, 'assistant');
    }

    /**
     * 自动调整文本框高度
     */
    autoResizeTextarea() {
        const textarea = this.elements.textarea;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    /**
     * 滚动到底部
     */
    scrollToBottom() {
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }

    /**
     * 销毁实例
     */
    destroy() {
        if (this.elements.container) {
            this.elements.container.remove();
        }
    }
}

// 页面加载完成后初始化AI助手
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIAssistant;
}