import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createConversationInDB(userId: string) {
  return prisma.conversation.create({
    data: {
      userId,
      sentiment: [0, 0, 0, 0],
    },
  });
}

export async function addMessageToDB(conversationId: string, role: string, content: string) {
  return prisma.message.create({
    data: {
      role,
      content,
      conversationId,
    },
  });
}

export async function getConversationWithMessages(conversationId: string) {
  return prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messageChain: true,
    },
  });
}

export default prisma;