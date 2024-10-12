# 代码变更日志

## [未发布]

### 新增
- 创建 `pages/api/zhipu.js` 文件，实现智谱 API 的服务器端调用
- 创建 `pages/api/test-api.js` 文件，实现 API 测试端点
- 在 `pages/index.js` 中添加 `getZhipuResponse` 函数，实现前端 API 调用
- 添加加载状态和错误处理机制

### 变更
- 更新 `next.config.js`，正确配置环境变量
- 修改 `README.md`，更新项目说明和操作步骤
- 更新 `.env.local` 文件，使用 `ZHIPUAI_API_KEY` 作为环境变量名

### 修复
- 修复环境变量名称不一致的问题（从 `ZHIPU_API_KEY` 改为 `ZHIPUAI_API_KEY`）

## [2024-10-10]
- 项目初始化
- 基本用户界面设计和实现
