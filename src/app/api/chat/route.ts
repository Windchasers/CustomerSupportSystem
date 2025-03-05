import { OpenAI } from 'openai';
import { StreamingTextResponse } from 'ai';
import { createConversationInDB, addMessageToDB } from '@/lib/db';

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
    const { messages, fileContext, userId } = await req.json();
    
    // 创建或获取会话
    let conversationId = messages[0]?.conversationId;
    if (!conversationId) {
      const conversation = await createConversationInDB(userId);
      conversationId = conversation.id;
    }

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

    // 保存用户消息到数据库
    const userMessage = messages[messages.length - 1];
    await addMessageToDB(conversationId, userMessage.role, userMessage.content);

    // 构建SSE响应
    const response = new StreamingTextResponse(stream);

    // 保存助手回复到数据库
    stream.on('data', async (chunk) => {
      const text = chunk.toString();
      if (text.startsWith('data: ')) {
        const content = text.slice(6);
        if (content !== '[DONE]') {
          await addMessageToDB(conversationId, 'assistant', content);
        }
      }
    });

    return response;
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500 }
    );
  }
}