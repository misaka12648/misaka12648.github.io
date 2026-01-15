

# 我的前端博客 (my-front-blog)

基于 Hexo 框架和 Kira 主题构建的个人技术博客。

## ✨ 特性

- **AI 助手**：集成 DeepSeek API，提供智能对话功能
- **优雅主题**：使用 Kira 主题，界面简洁美观
- **自动部署**：内置自动化部署脚本，支持一键部署和回滚
- **评论系统**：集成 Giscus 评论系统
- **文章管理**：支持文章、页面、友链等多种内容类型

## 📁 项目结构

```
my-front-blog/
├── myblog/                  # 主博客目录
│   ├── _config.yml         # Hexo 配置文件
│   ├── _config.kira.yml    # Kira 主题配置
│   ├── package.json        # 项目依赖
│   ├── scaffolds/          # 脚手架模板
│   │   ├── post.md        # 文章模板
│   │   ├── page.md        # 页面模板
│   │   └── draft.md       # 草稿模板
│   ├── source/            # 源文件
│   │   └── _posts/        # 文章目录
│   └── themes/            # 主题目录
├── scripts/               # 部署脚本
│   ├── deploy.js         # 自动化部署
│   └── rollback.js       # 版本回滚
└── source/               # 根目录源文件
    ├── about.md          # 关于页面
    ├── friends.md        # 友链页面
    └── css/              # 自定义样式
```

## 🚀 快速开始

### 环境要求

- Node.js >= 14.x
- Git
- npm 或 yarn

### 安装依赖

```bash
# 安装全局 Hexo
npm install -g hexo-cli

# 安装项目依赖
cd myblog
npm install
```

### ⚠️ 重要：主题布局修复

由于 `layout.ejs` 文件被封装在 `node_modules` 中，每次克隆项目后需要手动执行以下操作：

```bash
# 将自定义主题布局文件复制到 hexo-theme-kira 主题目录
cp themes/kira-custom/layout/layout.ejs node_modules/hexo-theme-kira/layout/layout.ejs
```

### 本地预览

```bash
cd myblog
hexo server
# 或使用简写
hexo s
```

博客将在 `http://localhost:4000` 启动。

## 📝 写作指南

### 创建新文章

```bash
hexo new "文章标题"
# 或创建草稿
hexo new draft "草稿标题"
```

### 文章模板

```markdown
---
title: 文章标题
tags:
  - 标签1
  - 标签2
date: YYYY-MM-DD
---

文章内容...
```

### 发布草稿

```bash
hexo publish draft "草稿标题"
```

## 🚀 部署

项目内置了自动化部署脚本，支持一键部署到服务器。

### 部署前配置

在项目根目录创建 `.env` 文件，配置服务器信息：

```env
SSH_HOST=你的服务器地址
SSH_USER=用户名
SSH_PASSWORD=密码
REMOTE_PATH=部署目录
```

### 执行部署

```bash
cd myblog
npm run deploy
# 或直接运行脚本
node scripts/deploy.js
```

部署流程：
1. 验证服务器配置
2. 构建静态文件
3. 清理旧版本
4. 备份当前版本
5. 上传新文件
6. 验证部署结果

### 回滚操作

如需回滚到上一个版本：

```bash
node scripts/rollback.js
```

## 🎨 自定义

### 修改主题配置

编辑 `myblog/_config.kira.yml` 文件：

```yaml
# 站点信息
site:
  title: 我的前端博客
  subtitle: 记录技术成长
  description: 前端开发 | 技术分享
  
# 主题样式
style:
  primary_color: '#1890ff'
```

### 自定义 CSS

在 `source/css/` 目录下添加自定义样式文件。

### AI 助手配置

AI 助手功能通过 `source/js/ai-assistant.js` 实现，配置 DeepSeek API 密钥即可启用。

## 📦 技术栈

- **Hexo** - 静态站点生成器
- **Kira Theme** - 博客主题
- **DeepSeek API** - AI 对话支持
- **Giscus** - GitHub 讨论集成评论系统
- **Node.js** - 运行时环境

## 📄 许可证

本项目基于 MIT 许可证开源。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系

- 作者：misaka12648
- Gitee：https://gitee.com/misaka12648