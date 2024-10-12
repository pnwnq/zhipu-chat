import { ZhipuAI } from 'zhipuai';

console.log('ZHIPUAI_API_KEY:', process.env.ZHIPUAI_API_KEY);

const client = new ZhipuAI(process.env.ZHIPUAI_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!process.env.ZHIPUAI_API_KEY) {
        throw new Error('API key is not set');
      }
      // 尝试一个简单的 API 调用
      const response = await client.chat.completions.create({
        model: "glm-4",
        messages: [{ role: "user", content: "Hello" }],
      });
      res.status(200).json({ message: "API 密钥有效且已激活", response: response });
    } catch (error) {
      console.error('Error testing Zhipu API:', error);
      res.status(500).json({ error: 'API 测试失败', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
