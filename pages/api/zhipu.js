import { ZhipuAI } from 'zhipuai';

const API_KEY = process.env.ZHIPUAI_API_KEY;

if (!API_KEY) {
  console.error('ZHIPU_API_KEY is not set in the environment variables');
}


const client = new ZhipuAI(API_KEY);

export default async function handler(req, res) {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key is not configured' });
  }

  if (req.method === 'POST') {
    try {
      const { messages } = req.body;
      
      // 添加系统消息
      const fullMessages = [
        {"role": "system", "content": "你是一个乐于解答各种问题的助手，你的任务是为用户提供专业、准确、有见地的建议。"},
        ...messages
      ];

      const response = await client.chat.completions.create({
        model: "glm-4-flash",
        messages: fullMessages,
      });

      return res.status(200).json({ content: response.choices[0].message.content });
    } catch (error) {
      console.error('Error calling Zhipu API:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
