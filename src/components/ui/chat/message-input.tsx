"use client";

import { useState, KeyboardEvent } from 'react';
import { useTranslation } from '@/i18n';

type MessageInputProps = {
  onSendMessage: (content: string) => void;
};

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4 flex gap-4 items-end">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={t('chat.inputPlaceholder')}
        className="flex-1 resize-none rounded-lg border p-3 h-[60px] focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {t('chat.sendButton')}
      </button>
    </div>
  );
}