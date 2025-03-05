"use client";

import { useTranslation } from "@/i18n";

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <div className="w-80 border-l border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col h-full p-4">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* 知识库区域 */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-sm font-semibold">{t('chat.knowledgeBase', '知识库')}</h2>
            <div className="border rounded-lg p-3 bg-card h-full">
              <p className="text-sm text-muted-foreground">{t('chat.noKnowledgeBase', '暂无相关知识库内容')}</p>
            </div>
          </div>

          {/* 快捷回复区域 */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-sm font-semibold">{t('chat.quickReplies', '快捷回复')}</h2>
            <div className="flex flex-col space-y-2 border rounded-lg p-3 bg-card h-full">
              <button
                className="text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => {}}
              >
                {t('chat.quickReply.greeting', '您好，请问有什么可以帮您？')}
              </button>
              <button
                className="text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => {}}
              >
                {t('chat.quickReply.thanks', '感谢您的反馈，我们会继续改进服务。')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}