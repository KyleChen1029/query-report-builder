
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { ChartContainer } from '@/components/ChartContainer';
import { Search, Loader2, Send } from 'lucide-react';

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

    // Bar chart - Monthly Sales Statistics
    charts.push({
      type: 'bar',
      title: '月度銷售額統計',
      data: [
        { name: '一月', value: 4000 },
        { name: '二月', value: 3000 },
        { name: '三月', value: 5000 },
        { name: '四月', value: 4500 },
        { name: '五月', value: 6000 },
        { name: '六月', value: 5500 },
      ]
    });

    // Pie chart - Product Category Distribution
    charts.push({
      type: 'pie',
      title: '產品類別分布',
      data: [
        { name: '電子產品', value: 35 },
        { name: '服裝配件', value: 25 },
        { name: '家居用品', value: 20 },
        { name: '運動器材', value: 15 },
        { name: '其他', value: 5 },
      ]
    });

    return charts;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar queryHistory={queryHistory} />
        <main className="flex-1 flex flex-col">
          {/* Fixed Header with Sidebar Toggle */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8" />
              <div className="flex-1 text-center">
                <h1 className="text-2xl font-bold text-slate-800">智能報表分析平台</h1>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Welcome Section */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-800">智能報表分析平台</h1>
                <p className="text-slate-600 text-lg">輸入您的需求，我們將為您生成美的數據視覺化報表</p>
              </div>

              {/* Query Form */}
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm max-w-4xl mx-auto">
                <CardHeader className="pb-4 text-center">
                  <CardTitle className="text-2xl text-slate-700">
                    報表查詢
                  </CardTitle>
                  <p className="text-slate-600 mt-2">請描述您需要的報表類型或分析需求</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="最新5年內分析報表"
                        className="h-14 text-lg px-6 border-slate-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button 
                        type="submit" 
                        disabled={isLoading || !query.trim()}
                        className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            分析中...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            生成報表
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Thinking State */}
              {isLoading && (
                <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50 max-w-4xl mx-auto">
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

              {/* Charts Section */}
              {chartData.length > 0 && !isLoading && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">分析結果</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {chartData.map((chart, index) => (
                      <div key={index} className="w-full">
                        <ChartContainer
                          type={chart.type}
                          data={chart.data}
                          title={chart.title}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {chartData.length === 0 && !isLoading && (
                <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm max-w-4xl mx-auto">
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
