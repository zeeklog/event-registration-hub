import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Send,
  User,
  Headphones,
  Info,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { mockTickets } from '@/data/mockData';
import { Ticket, TicketStatus, TicketReply } from '@/types';
import { toast } from 'sonner';

const TicketDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | undefined>(
    (mockTickets as Ticket[]).find(t => t.id === id)
  );
  const [replyText, setReplyText] = useState('');

  if (!ticket) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">未找到该工单</h2>
        <Button onClick={() => navigate('/service')}>返回工单列表</Button>
      </div>
    );
  }

  const getStatusInfo = (status: TicketStatus) => {
    switch (status) {
      case 'pending':
        return { label: '待处理', icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-500/10' };
      case 'processing':
        return { label: '处理中', icon: MessageSquare, color: 'text-action', bgColor: 'bg-action/10' };
      case 'resolved':
        return { label: '已解决', icon: CheckCircle2, color: 'text-eco', bgColor: 'bg-eco/10' };
      case 'closed':
        return { label: '已关闭', icon: AlertCircle, color: 'text-gray-400', bgColor: 'bg-gray-400/10' };
      default:
        return { label: '未知', icon: Info, color: 'text-gray-400', bgColor: 'bg-gray-400/10' };
    }
  };

  const statusInfo = getStatusInfo(ticket.status);
  const StatusIcon = statusInfo.icon;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: TicketReply = {
      id: `r${Date.now()}`,
      content: replyText,
      time: new Date().toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }).replace(/\//g, '-'),
      sender: 'user',
      senderName: '户外达人'
    };

    setTicket({
      ...ticket,
      replies: [...(ticket.replies || []), newReply]
    });
    setReplyText('');
    toast.success('回复已发送');
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto flex flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/service')}
            className="rounded-full bg-muted/50 text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-black uppercase tracking-widest text-foreground truncate">
              工单详情
            </h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              ID: {ticket.id}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* 工单基本信息 */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge className={cn("rounded-sm font-black text-[10px] uppercase tracking-widest border-0", statusInfo.bgColor, statusInfo.color)}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusInfo.label}
              </Badge>
              <span className="text-[10px] font-bold text-muted-foreground">
                创建于 {ticket.createTime}
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-black text-foreground leading-tight">
                {ticket.title}
              </h2>
              <div className="inline-block px-2 py-0.5 rounded-sm bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {ticket.category}
              </div>
            </div>

            <Card className="bg-muted/30 border-border">
              <CardContent className="p-4">
                <p className="text-sm font-medium leading-relaxed text-foreground/80 whitespace-pre-wrap">
                  {ticket.description}
                </p>
              </CardContent>
            </Card>
          </section>

          <Separator className="bg-border" />

          {/* 回复列表 */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              沟通记录
            </h3>
            
            <div className="space-y-6">
              {ticket.replies && ticket.replies.length > 0 ? (
                ticket.replies.map((reply) => (
                  <div key={reply.id} className={cn(
                    "flex gap-3",
                    reply.sender === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-sm flex items-center justify-center shrink-0 shadow-lg",
                      reply.sender === 'user' ? "bg-action text-white" : "bg-eco text-navy"
                    )}>
                      {reply.sender === 'user' ? <User className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                      "flex flex-col gap-1.5 max-w-[80%]",
                      reply.sender === 'user' ? "items-end" : "items-start"
                    )}>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                          {reply.senderName}
                        </span>
                        <span className="text-[9px] font-bold text-muted-foreground">
                          {reply.time}
                        </span>
                      </div>
                      <div className={cn(
                        "p-3 rounded-md text-sm font-medium leading-normal shadow-sm",
                        reply.sender === 'user' 
                          ? "bg-action text-white rounded-tr-none" 
                          : "bg-card border border-border text-foreground rounded-tl-none"
                      )}>
                        {reply.content}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    暂无沟通记录
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* 回复输入框 */}
      {ticket.status !== 'closed' && (
        <div className="p-4 border-t border-border glass">
          <form onSubmit={handleSendReply} className="flex gap-2">
            <Input 
              placeholder="输入您的回复..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="bg-muted/30 border-border focus-visible:ring-action rounded-sm font-bold text-sm h-12"
            />
            <Button 
              type="submit" 
              size="icon"
              className="h-12 w-12 bg-action hover:bg-action/90 text-white rounded-sm shrink-0"
              disabled={!replyText.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
