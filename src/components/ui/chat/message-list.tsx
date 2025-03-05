"use client";

import { useEffect, useRef } from 'react';
import { useTranslation } from '@/i18n';

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt?: Date;
};

type MessageListProps = {
  messages: Message[];
};

export function MessageList({ messages }: MessageListProps) {
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            <div className="text-sm">{message.content}</div>
            <div className="text-xs mt-1 opacity-70">
              {message.createdAt ? message.createdAt.toLocaleTimeString() : null}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}