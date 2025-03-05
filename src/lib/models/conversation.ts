import { z } from 'zod';

export const ConversationSchema = z.object({
  session_id: z.string().uuid(),
  user_id: z.string().uuid(),
  message_chain: z.array(z.object({
    id: z.string(),
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    created_at: z.date().optional(),
  })),
  sentiment: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type Conversation = z.infer<typeof ConversationSchema>;

export async function createConversation(userId: string): Promise<Conversation> {
  const conversation: Conversation = {
    session_id: crypto.randomUUID(),
    user_id: userId,
    message_chain: [],
    sentiment: [0, 0, 0, 0],
    created_at: new Date(),
    updated_at: new Date(),
  };
  return conversation;
}

export async function addMessageToConversation(
  conversation: Conversation,
  role: 'user' | 'assistant',
  content: string
): Promise<Conversation> {
  const message = {
    id: crypto.randomUUID(),
    role,
    content,
    created_at: new Date(),
  };
  
  conversation.message_chain.push(message);
  conversation.updated_at = new Date();
  
  return conversation;
}