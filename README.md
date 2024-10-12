# 智谱对话项目

## 项目概述

智谱对话是一个基于 Next.js 开发的智能对话系统，集成了智谱 API，旨在提供用户友好的交互界面和智能、自然的对话体验。

## 当前项目进展

- 完成了基本的用户界面设计和实现
- 成功集成智谱 API，实现了消息的发送和接收功能
- 添加了加载状态和错误处理机制
- 更新了项目配置，正确处理环境变量
- 创建了测试 API 端点，用于验证 API 密钥和连接
- 项目已成功上传到 GitHub 仓库

## 最新讨论要点

1. 环境变量的正确命名和使用（ZHIPUAI_API_KEY）
2. GitHub 仓库的创建和项目上传方法（HTTPS vs SSH）
3. API 密钥的安全存储和使用
4. 项目文件结构的优化

## 下一步开发计划

1. 实现对话历史的本地存储功能
2. 优化错误处理和用户反馈机制
3. 添加更多的单元测试和集成测试
4. 实现对话上下文管理，提高对话的连贯性
5. 优化用户界面，添加更多交互效果（如打字机效果）
6. 考虑添加用户认证功能

## 项目操作步骤

1. 克隆项目仓库：
   ```
   git clone https://github.com/pnwnq/zhipu-chat.git
   ```

2. 安装依赖：
   ```
   cd zhipu-chat
   npm install
   ```

3. 创建 `.env.local` 文件，添加智谱 API 密钥：
   ```
   ZHIPUAI_API_KEY=your_api_key_here
   ```

4. 运行开发服务器：
   ```
   npm run dev
   ```

5. 在浏览器中访问 `http://localhost:3000` 查看项目

6. 测试 API 连接：访问 `http://localhost:3000/api/test-api`

## 新功能说明

### API 测试端点

- 用途：验证 API 密钥是否有效，测试与智谱 API 的连接
- 访问方法：GET 请求到 `/api/test-api`
- 返回值：
  - 成功：`{ message: "API 密钥有效且已激活", response: API响应内容 }`
  - 失败：`{ error: 'API 测试失败', details: 错误信息 }`

### 智谱 API 集成

- 文件位置：`pages/api/zhipu.js`
- 用途：处理与智谱 API 的通信，发送用户消息并获取 AI 回复
- 使用方法：POST 请求到 `/api/zhipu`，包含消息数组
- 参数：`{ messages: [{ role: 'user', content: '用户消息' }, ...] }`
- 返回值：`{ content: 'AI 回复内容' }`

## 项目仓库

https://github.com/pnwnq/zhipu-chat

## 贡献指南

欢迎所有团队成员为项目做出贡献。请遵循以下步骤：

1. 创建新的分支进行开发
2. 提交变更时，请使用清晰的提交信息
3. 创建 Pull Request 并等待审核

让我们一起努力，打造一个出色的智谱对话系统！
