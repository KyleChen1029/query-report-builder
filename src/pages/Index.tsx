
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { ChartContainer } from '@/components/ChartContainer';
import { Search, Loader2, SidebarOpen } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

interface QueryRecord {
  id: string;
  query: string;
  timestamp: Date;
}

interface ChartData {
  type: 'bar' | 'pie' | 'line';
  data: any[];
  title: string;
}

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [queryHistory, setQueryHistory] = useState<QueryRecord[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Add to query history
    const newRecord: QueryRecord = {
      id: Date.now().toString(),
      query: query,
      timestamp: new Date()
    };
    setQueryHistory(prev => [newRecord, ...prev]);

    // Simulate API call with thinking time
    setTimeout(() => {
      // Generate mock chart data based on query
      const mockData = generateMockChartData(query);
      setChartData(mockData);
      setIsLoading(false);
    }, 2000);
  };

  const generateMockChartData = (searchQuery: string): ChartData[] => {
    const charts: ChartData[] = [];

    // Bar chart
    charts.push({
      type: 'bar',
      title: `${searchQuery} - 月份統計`,
      data: [
        { name: '一月', value: Math.floor(Math.random() * 400) + 100 },
        { name: '二月', value: Math.floor(Math.random() * 400) + 100 },
        { name: '三月', value: Math.floor(Math.random() * 400) + 100 },
        { name: '四月', value: Math.floor(Math.random() * 400) + 100 },
        { name: '五月', value: Math.floor(Math.random() * 400) + 100 },
        { name: '六月', value: Math.floor(Math.random() * 400) + 100 },
      ]
    });

    // Pie chart
    charts.push({
      type: 'pie',
      title: `${searchQuery} - 類別分布`,
      data: [
        { name: '類別A', value: Math.floor(Math.random() * 200) + 50 },
        { name: '類別B', value: Math.floor(Math.random() * 200) + 50 },
        { name: '類別C', value: Math.floor(Math.random() * 200) + 50 },
        { name: '類別D', value: Math.floor(Math.random() * 200) + 50 },
      ]
    });

    // Line chart
    charts.push({
      type: 'line',
      title: `${searchQuery} - 趋勢分析`,
      data: [
        { name: '第1週', value: Math.floor(Math.random() * 300) + 100 },
        { name: '第2週', value: Math.floor(Math.random() * 300) + 100 },
        { name: '第3週', value: Math.floor(Math.random() * 300) + 100 },
        { name: '第4週', value: Math.floor(Math.random() * 300) + 100 },
        { name: '第5週', value: Math.floor(Math.random() * 300) + 100 },
        { name: '第6週', value: Math.floor(Math.random() * 300) + 100 },
      ]
    });

    return charts;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar queryHistory={queryHistory} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">數據分析儀表板</h1>
                <p className="text-slate-600 mt-1">輸入查詢條件來生成智能報表</p>
              </div>
            </div>

            {/* Query Form */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  查詢分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="輸入您的查詢條件，例如：銷售數據、用戶增長、產品分析..."
                    className="flex-1 h-12 text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !query.trim()}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        分析中...
                      </>
                    ) : (
                      '生成報表'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Thinking State */}
            {isLoading && (
              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <div className="w-8 h-8 border-4 border-transparent border-t-blue-400 rounded-full animate-spin absolute top-2 left-2"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-slate-700 mb-2">AI 正在分析您的數據...</h3>
                      <p className="text-slate-500">請稍候，我們正在為您生成最佳的報表視覺化</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Charts */}
            {chartData.length > 0 && !isLoading && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-slate-800">分析結果</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {chartData.map((chart, index) => (
                    <ChartContainer
                      key={index}
                      type={chart.type}
                      data={chart.data}
                      title={chart.title}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {chartData.length === 0 && !isLoading && (
              <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="py-20">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                      <Search className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-600">開始您的數據分析之旅</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      在上方輸入框中輸入您想要分析的內容，我們將為您生成專業的數據報表和視覺化圖表
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
