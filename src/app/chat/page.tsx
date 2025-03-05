"use client";

import { useState, useEffect } from 'react';
import { MessageList, Message } from '@/components/ui/chat/message-list';
import { MessageInput } from '@/components/ui/chat/message-input';
import { Sidebar } from '@/components/ui/chat/sidebar';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from '@/i18n';
import { useChat } from 'ai/react';

export default function ChatPage() {
  const { t } = useTranslation();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { messages, setMessages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [{
      id: 'welcome',
      role: 'assistant',
      content: t('chat.welcomeMessage'),
    }],
  });

  useEffect(() => {
    const loadChatHistory = async () => {
      if (conversationId) {
        try {
          const response = await fetch(`/api/chat/history?conversationId=${conversationId}`);
          const data = await response.json();
          
          if (response.ok && data.messages) {
            setMessages(data.messages);
          }
        } catch (error) {
          console.error('加载聊天历史失败:', error);
        }
      }
    };

    loadChatHistory();
  }, [conversationId, setMessages]);


  const handleSendMessage = (content: string) => {
    handleSubmit(new Event('submit'), { data: { content, userId: 'test-user-id' } });
  };

  return (
    <div className="grid grid-cols-[1fr,400px,300px] h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{t('chat.title')}</h2>
        </div>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
      
      <div className="flex flex-col border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{t('knowledgeBase.title')}</h2>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <h3 className="font-medium">{t('knowledgeBase.faq.title')}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t('knowledgeBase.faq.description')}</p>
          </div>
          <div className="rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <h3 className="font-medium">{t('knowledgeBase.manual.title')}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t('knowledgeBase.manual.description')}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{t('quickReplies.title')}</h2>
        </div>
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-accent/50 transition-colors">
            {t('quickReplies.welcome')}
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-accent/50 transition-colors">
            {t('quickReplies.orderStatus')}
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-accent/50 transition-colors">
            {t('quickReplies.payment')}
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-accent/50 transition-colors">
            {t('quickReplies.shipping')}
          </button>
        </div>
      </div>
    </div>
  );
}