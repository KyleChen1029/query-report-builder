
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { History, Clock, Search, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QueryRecord {
  id: string;
  query: string;
  timestamp: Date;
}

interface AppSidebarProps {
  queryHistory: QueryRecord[];
}

export function AppSidebar({ queryHistory }: AppSidebarProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-TW', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Sidebar className="border-r border-slate-200 bg-white/95 backdrop-blur-sm">
      <SidebarHeader className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">查詢記錄</h2>
              <p className="text-xs text-slate-500">歷史搜尋</p>
            </div>
          </div>
          <SidebarTrigger className="w-6 h-6 text-slate-500 hover:text-slate-700" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-slate-600 px-2 py-2 flex items-center gap-2">
            <History className="w-3 h-3" />
            最近查詢
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {queryHistory.length === 0 ? (
                <div className="px-2 py-8 text-center">
                  <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">尚無查詢記錄</p>
                  <p className="text-xs text-slate-400 mt-1">開始您的第一次搜尋</p>
                </div>
              ) : (
                queryHistory.map((record) => (
                  <SidebarMenuItem key={record.id}>
                    <SidebarMenuButton className="w-full p-0 h-auto hover:bg-slate-50">
                      <Card className="w-full p-3 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 bg-white/50">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-700 line-clamp-2 leading-relaxed">
                            {record.query}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            {formatTime(record.timestamp)}
                          </div>
                        </div>
                      </Card>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
