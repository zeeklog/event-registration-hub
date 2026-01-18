import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Info, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notifications } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Notification } from '@/types';
import { Layout } from '@/components/layout/Layout';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'system': return Bell;
      case 'safety': return Shield;
      case 'service': return Info;
      case 'customer': return MessageCircle;
      default: return Bell;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'system': return 'text-action';
      case 'safety': return 'text-red-500';
      case 'service': return 'text-eco';
      case 'customer': return 'text-points-sports';
      default: return 'text-action';
    }
  };

  const getTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'system': return '系统通知';
      case 'safety': return '安全预警';
      case 'service': return '服务提醒';
      case 'customer': return '客服对话';
      default: return '通知';
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notificationList 
    : notificationList.filter(n => n.type === activeTab);

  const markAsRead = (id: string) => {
    setNotificationList(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const unreadCount = notificationList.filter(n => !n.isRead).length;

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-navy">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-40 glass border-b border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/5"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-white flex-1">
              消息通知
              {unreadCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-sm h-4 inline-flex items-center">{unreadCount}</span>
              )}
            </h1>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-gray-500 hover:text-white" onClick={() => setNotificationList(prev => prev.map(n => ({...n, isRead: true})))}>
              <Check className="w-3 h-3 mr-1" />
              全部已读
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-12 bg-transparent p-0 border-b border-white/5 rounded-none">
              {['all', 'system', 'safety', 'service'].map(tab => (
                <TabsTrigger 
                  key={tab}
                  value={tab}
                  className="flex-1 h-full rounded-none bg-transparent text-[10px] font-bold text-gray-500 data-[state=active]:text-action data-[state=active]:border-b-2 data-[state=active]:border-action"
                >
                  {tab === 'all' ? '全部' : getTypeLabel(tab as any).slice(0, 2)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </header>

        <div className="px-4 py-6 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-600">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-10 h-10 opacity-10" />
              </div>
              <p className="text-sm font-bold">暂无相关通知</p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const Icon = getTypeIcon(notification.type);
              const colorClass = getTypeColor(notification.type);
              
              return (
                <Card 
                  key={notification.id}
                  className={cn(
                    "bg-navy-light border-white/5 transition-all active:scale-[0.98] cursor-pointer shadow-xl",
                    !notification.isRead && "border-action/20 bg-action/[0.02]"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className={cn("w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center shadow-lg", colorClass)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className={cn("text-sm font-bold truncate", notification.isRead ? "text-white" : "text-action")}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
                        </div>
                        <p className="text-xs font-medium text-gray-400 line-clamp-2 leading-relaxed">
                          {notification.content}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <Badge className="bg-white/5 text-gray-500 border-0 h-5 text-[8px] font-black uppercase tracking-wider">
                            {getTypeLabel(notification.type)}
                          </Badge>
                          <span className="text-[10px] font-bold text-gray-600 uppercase">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
