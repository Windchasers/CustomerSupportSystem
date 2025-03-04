"use client";

import { useTranslation } from "@/i18n";

export default function ChatPage() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <main className="flex h-screen">
      {/* 左侧对话区域 */}
      <div className="flex w-[60%] flex-col border-r">
        <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
          <h1 className="text-lg font-semibold">{t('chat.title')}</h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
            className="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    {t('chat.welcomeMessage')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t p-4">
            <form className="flex space-x-2">
              <input
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder={t('chat.inputPlaceholder')}
                type="text"
              />
              <button
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                type="submit"
              >
                {t('chat.sendButton')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 中间知识库参考区 */}
      <div className="flex w-[20%] flex-col border-r">
        <header className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">{t('knowledgeBase.title')}</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">{t('knowledgeBase.faq.title')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('knowledgeBase.faq.title')}</li>
                <li>• {t('knowledgeBase.manual.title')}</li>
                <li>• {t('knowledgeBase.manual.description')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧快捷回复区 */}
      <div className="flex w-[20%] flex-col">
        <header className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">{t('quickReplies.title')}</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <button className="w-full rounded-md border p-2 text-left text-sm hover:bg-muted">
              {t('quickReplies.welcome')}
            </button>
            <button className="w-full rounded-md border p-2 text-left text-sm hover:bg-muted">
              {t('quickReplies.orderStatus')}
            </button>
            <button className="w-full rounded-md border p-2 text-left text-sm hover:bg-muted">
              {t('quickReplies.payment')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}