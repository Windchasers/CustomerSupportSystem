"use client";

import { Metadata } from "next";
import { useTranslation } from "@/i18n";

export const metadata: Metadata = {
  title: "管理后台 - 客服支持系统",
  description: "客服支持系统管理后台",
};

export default function AdminPage() {
  const { t } = useTranslation();
  
  return (
    <main className="flex h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
        <h1 className="text-lg font-semibold">{t('admin.title')}</h1>
        <nav className="flex items-center space-x-4">
          <button className="text-sm text-muted-foreground hover:text-foreground">
            {t('admin.nav.statistics')}
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            {t('admin.nav.userManagement')}
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            {t('admin.nav.settings')}
          </button>
        </nav>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground">{t('admin.stats.totalUsers')}</div>
            <div className="mt-2 text-2xl font-bold">1,234</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground">{t('admin.stats.todayChats')}</div>
            <div className="mt-2 text-2xl font-bold">256</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground">{t('admin.stats.responseTime')}</div>
            <div className="mt-2 text-2xl font-bold">30s</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground">{t('admin.stats.satisfaction')}</div>
            <div className="mt-2 text-2xl font-bold">98%</div>
          </div>
        </div>
        <div className="rounded-lg border">
          <div className="p-4">
            <h2 className="text-lg font-semibold">{t('admin.recentChats.title')}</h2>
          </div>
          <div className="border-t">
            <div className="divide-y">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">{t('admin.recentChats.user', { id: i })}</div>
                    <div className="text-sm text-muted-foreground">2024-01-{10 + i} 14:30</div>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    {t('admin.recentChats.viewDetails')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}