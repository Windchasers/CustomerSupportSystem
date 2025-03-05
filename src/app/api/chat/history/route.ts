import { NextResponse } from 'next/server';
import { getConversationWithMessages } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json(
        { error: '会话ID是必需的' },
        { status: 400 }
      );
    }

    const conversation = await getConversationWithMessages(conversationId);

    if (!conversation) {
      return NextResponse.json(
        { error: '未找到会话' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      messages: conversation.messageChain,
      sentiment: conversation.sentiment
    });
  } catch (error) {
    console.error('获取会话历史失败:', error);
    return NextResponse.json(
      { error: '获取会话历史失败' },
      { status: 500 }
    );
  }
}