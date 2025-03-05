import { OpenAI } from 'openai';
import { StreamingTextResponse } from 'ai';

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 构建增强上下文
async function buildAugmentedContext(messages: any[], fileContext: any) {
  // 基础系统提示词
  const systemMessage = {
    role: 'system',
    content: '你是一个专业的客服助手，负责回答用户的问题。请保持友好和专业的态度。'
  };

  // 如果有文件上下文，添加到消息中
  if (fileContext) {
    systemMessage.content += `\n相关文档上下文：${fileContext}`;
  }

  return [systemMessage, ...messages];
}

export async function POST(req: Request) {
  try {
    const { messages, fileContext } = await req.json();

    // 验证必要的环境变量
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500 }
      );
    }

    // 混合上下文处理
    const augmentedMessages = await buildAugmentedContext(
      messages,
      fileContext
    );

    // 创建AI流
    const stream = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: augmentedMessages,
      stream: true,
    });

    // 构建SSE响应
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500 }
    );
  }
}