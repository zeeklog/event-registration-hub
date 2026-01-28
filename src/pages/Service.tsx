import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Camera,
  Send,
  History,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { mockTickets } from '@/data/mockData';
import { Ticket, TicketStatus } from '@/types';
import { toast } from 'sonner';

const Service = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets as Ticket[]);
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });

  const getStatusInfo = (status: TicketStatus) => {
    switch (status) {
      case 'pending':
        return { 
          label: '待处理', 
          icon: Clock, 
          color: 'text-orange-500', 
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/20'
        };
      case 'processing':
        return { 
          label: '处理中', 
          icon: MessageSquare, 
          color: 'text-action', 
          bgColor: 'bg-action/10',
          borderColor: 'border-action/20'
        };
      case 'resolved':
        return { 
          label: '已解决', 
          icon: CheckCircle2, 
          color: 'text-eco', 
          bgColor: 'bg-eco/10',
          borderColor: 'border-eco/20'
        };
      case 'closed':
        return { 
          label: '已关闭', 
          icon: AlertCircle, 
          color: 'text-gray-400', 
          bgColor: 'bg-gray-400/10',
          borderColor: 'border-gray-400/20'
        };
      default:
        return { 
          label: '未知', 
          icon: Info, 
          color: 'text-gray-400', 
          bgColor: 'bg-gray-400/10',
          borderColor: 'border-gray-400/20'
        };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('请填写完整信息');
      return;
    }

    const newTicket: Ticket = {
      id: `TK00${tickets.length + 1}`,
      title: formData.title,
      category: formData.category || '通用问题',
      description: formData.description,
      status: 'pending',
      createTime: new Date().toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }).replace(/\//g, '-'),
    };

    setTickets([newTicket, ...tickets]);
    setFormData({ title: '', category: '', description: '' });
    setActiveTab('list');
    toast.success('工单提交成功，我们会尽快处理');
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto flex flex-col pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-muted/50 text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-black uppercase tracking-widest text-foreground flex-1">服务工单</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-md">
            <TabsTrigger value="list" className="rounded-sm font-bold text-xs uppercase tracking-widest data-[state=active]:bg-action data-[state=active]:text-white transition-all">
              <History className="w-4 h-4 mr-2" />
              我的工单
            </TabsTrigger>
            <TabsTrigger value="create" className="rounded-sm font-bold text-xs uppercase tracking-widest data-[state=active]:bg-action data-[state=active]:text-white transition-all">
              <Plus className="w-4 h-4 mr-2" />
              提报工单
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-0 space-y-4">
            {tickets.length > 0 ? (
              <div className="space-y-4">
                {tickets.map((ticket) => {
                  const statusInfo = getStatusInfo(ticket.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <Card 
                      key={ticket.id} 
                      onClick={() => navigate(`/service/ticket/${ticket.id}`)}
                      className="overflow-hidden border border-border bg-card shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer group"
                    >
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <div className={cn("p-1.5 rounded-sm", statusInfo.bgColor, statusInfo.color)}>
                                <StatusIcon className="w-4 h-4" />
                              </div>
                              <span className={cn("text-[10px] font-black uppercase tracking-widest", statusInfo.color)}>
                                {statusInfo.label}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              {ticket.id}
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-foreground mb-2 group-hover:text-action transition-colors leading-tight">
                            {ticket.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 font-medium leading-relaxed">
                            {ticket.description}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <span className="text-[10px] font-bold text-muted-foreground">
                              {ticket.createTime}
                            </span>
                            <div className="flex items-center gap-1 text-action">
                              <span className="text-[10px] font-black uppercase tracking-widest">查看详情</span>
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-sm font-black text-foreground mb-1">暂无工单</h3>
                <p className="text-xs text-muted-foreground">如果您遇到任何问题，欢迎提交工单反馈</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-6 border-action text-action hover:bg-action/10"
                  onClick={() => setActiveTab('create')}
                >
                  去提交第一个工单
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="mt-0">
            <Card className="border border-border bg-card shadow-2xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                      工单标题
                    </label>
                    <Input 
                      placeholder="简单描述您的问题"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-muted/30 border-border focus-visible:ring-action rounded-sm font-bold text-sm h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                      问题分类
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['预约变更', '费用退还', '积分问题', '器材损坏', '赛事咨询', '其他'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({...formData, category: cat})}
                          className={cn(
                            "px-3 py-2 text-xs font-bold rounded-sm border transition-all text-center",
                            formData.category === cat 
                              ? "bg-action border-action text-white shadow-lg shadow-action/30" 
                              : "bg-muted/30 border-border text-muted-foreground hover:border-action/50"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                      详细描述
                    </label>
                    <Textarea 
                      placeholder="请详细描述您遇到的问题，以便我们更好地为您提供服务..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="bg-muted/30 border-border focus-visible:ring-action rounded-sm font-medium text-sm min-h-[150px] leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                      上传图片 (可选)
                    </label>
                    <div className="flex gap-2">
                      <div className="w-20 h-20 rounded-sm border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/20 cursor-pointer hover:border-action/50 transition-colors">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                        <span className="text-[8px] font-black text-muted-foreground mt-1 uppercase">添加照片</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-action hover:bg-action/90 text-white rounded-sm shadow-xl shadow-action/20 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-8 active:scale-95 transition-all"
                  >
                    <Send className="w-5 h-5" />
                    提交工单
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 p-4 bg-action/5 rounded-sm border border-action/10 flex gap-3">
              <Info className="w-5 h-5 text-action shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-black text-action uppercase tracking-widest">温馨提示</p>
                <p className="text-[10px] text-muted-foreground font-medium leading-normal">
                  工单提交后，我们的客服人员将在 24 小时内与您联系并处理。如需紧急帮助，请拨打 24 小时热线：400-888-8888。
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Service;
