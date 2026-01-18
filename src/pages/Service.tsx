import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Send, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  time: string;
}

const quickQuestions = [
  '如何取消预约？',
  '活动需要携带什么装备？',
  '可以退款吗？',
  '如何修改预约信息？',
  '保险包含哪些内容？',
  '如何联系紧急服务？',
];

const Service = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '您好！我是户外运动小助手，很高兴为您服务。请问有什么可以帮您的吗？',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟机器人回复
    setTimeout(() => {
      let response = '感谢您的咨询，我们会尽快为您处理。如需紧急帮助，请拨打客服热线 400-888-8888。';
      
      if (content.includes('取消')) {
        response = '取消预约说明：\n1. 活动开始前24小时可全额退款\n2. 活动开始前12-24小时可退款50%\n3. 活动开始前12小时内不可退款\n\n请在"我的订单"中操作取消。';
      } else if (content.includes('装备')) {
        response = '装备建议：\n• 赛艇活动：运动服、防晒霜、换洗衣物\n• 骑行活动：头盔（必须）、骑行服、手套\n• 露营活动：舒适衣物、驱蚊液、手电筒\n\n大部分装备可在报名时选择租赁。';
      } else if (content.includes('退款')) {
        response = '退款将在3-5个工作日内原路返回到您的支付账户。如有疑问，请联系客服热线 400-888-8888。';
      } else if (content.includes('修改')) {
        response = '修改预约信息：\n1. 打开"我的订单"\n2. 找到需要修改的订单\n3. 点击"修改"按钮\n\n注意：部分信息（如日期）可能无法修改，请联系客服协助。';
      } else if (content.includes('保险')) {
        response = '活动保险说明：\n• 所有活动均包含人身意外险\n• 保额最高50万元\n• 包含医疗费用、住院津贴等\n\n详情可在活动详情页查看保险条款。';
      } else if (content.includes('紧急') || content.includes('联系')) {
        response = '紧急联系方式：\n• 急救电话：120\n• 客服热线：400-888-8888（24小时）\n• 活动现场工作人员\n\n您也可以在活动详情页使用"一键紧急联系"功能。';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto flex flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold flex-1">在线客服</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.location.href = 'tel:400-888-8888'}
          >
            <Phone className="w-4 h-4 mr-1" />
            电话咨询
          </Button>
        </div>
      </header>

      {/* 快捷问题 */}
      <div className="p-4 border-b border-border">
        <p className="text-sm text-muted-foreground mb-2">常见问题</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, i) => (
            <Button 
              key={i}
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => handleSend(q)}
            >
              {q}
            </Button>
          ))}
        </div>
      </div>

      {/* 聊天区域 */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : ''}`}>
                <div 
                  className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    msg.type === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-none' 
                      : 'bg-card text-card-foreground rounded-bl-none border border-border'
                  }`}
                >
                  {msg.content}
                </div>
                <p className={`text-xs text-muted-foreground mt-1 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* 输入区域 */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input 
            placeholder="请输入您的问题..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            className="flex-1"
          />
          <Button onClick={() => handleSend(inputValue)}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Service;
