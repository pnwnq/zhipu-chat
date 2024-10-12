# 智谱对话项目功能设计文档

## 模块设计

1. 用户界面模块
2. 智谱 API 集成模块
3. 消息管理模块
4. 状态管理模块

## UI 设计

（保持现有的 UI 设计不变，后续可能需要添加加载动画和错误提示）

## 技术实现

### 智谱 API 集成

1. 创建 `api` 文件夹，添加 `zhipu.js` 文件：

```javascript:api/zhipu.js
import axios from 'axios';

const ZHIPU_API_ENDPOINT = 'https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_std/sse-invoke';
const API_KEY = process.env.ZHIPU_API_KEY;

export async function getZhipuResponse(messages) {
  try {
    const response = await axios.post(
      ZHIPU_API_ENDPOINT,
      {
        prompt: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        temperature: 0.7,
        top_p: 0.9,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].content;
  } catch (error) {
    console.error('Error calling Zhipu API:', error);
    throw error;
  }
}
```

2. 更新 `pages/index.js` 文件，集成智谱 API：

```javascript:pages/index.js
import { useState } from 'react'
import { getZhipuResponse } from '../api/zhipu'

export default function Home() {
  // ... 其他代码保持不变

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const assistantResponse = await getZhipuResponse(newMessages)
      setMessages([...newMessages, { role: 'assistant', content: assistantResponse }])
    } catch (error) {
      console.error('Error getting Zhipu response:', error)
      setMessages([...newMessages, { role: 'assistant', content: '抱歉，我遇到了一些问题。请稍后再试。' }])
    }
  }

  // ... 其他代码保持不变
}
```

3. 创建 `.env.local` 文件，添加智谱 API 密钥：

```
ZHIPU_API_KEY=your_api_key_here
```

## 测试用例

1. 测试基本对话功能
   - 输入: "你好"
   - 预期输出: 智谱 AI 的合适回复

2. 测试错误处理
   - 模拟 API 调用失败
   - 预期输出: 错误提示消息

3. 测试长对话
   - 进行多轮对话
   - 验证上下文理解和连贯性

4. 测试输入边界情况
   - 空输入
   - 超长输入
   - 特殊字符输入
