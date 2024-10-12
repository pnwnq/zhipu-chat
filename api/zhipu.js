import { ZhipuAI } from 'zhipuai';

const API_KEY = process.env.ZHIPUAI_API_KEY;
const client = new ZhipuAI(API_KEY);

export async function getZhipuResponse(messages) {
  try {
    const response = await client.chat.asyncCompletions.create({
      model: "glm-4",
      messages: messages,
    });

    let taskId = response.id;
    let taskStatus = '';
    let getCnt = 0;

    while (taskStatus !== 'SUCCESS' && taskStatus !== 'FAILED' && getCnt <= 40) {
      const resultResponse = await client.chat.asyncCompletions.retrieveCompletionResult(taskId);
      taskStatus = resultResponse.task_status;

      if (taskStatus === 'SUCCESS') {
        return resultResponse.choices[0].message.content;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      getCnt++;
    }

    throw new Error('API request timeout or failed');
  } catch (error) {
    console.error('Error calling Zhipu API:', error);
    throw error;
  }
}
