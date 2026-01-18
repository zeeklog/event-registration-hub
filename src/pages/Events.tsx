import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Users, Clock, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { orders, activities } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { colors, gradients, shadows } from '@/lib/design-system';
import { getStatusBadgeStyle, getTypeColorScheme } from '@/lib/apply-design-system';

const Events = () => {
  const navigate = useNavigate();

  // 筛选出赛事类型的订单
  const eventOrders = orders.filter(o => o.activity.scene === 'event');

  const upcomingEvents = eventOrders.filter(o => o.status === 'confirmed' || o.status === 'pending');
  const completedEvents = eventOrders.filter(o => o.status === 'completed');
  const reviewingEvents = eventOrders.filter(o => o.status === 'reviewing');

  const getStatusBadge = (status: string) => {
    const style = getStatusBadgeStyle(status);
    return (
      <Badge 
        className="border-0 font-bold"
        style={{
          background: style.background,
          color: style.color
        }}
      >
        {style.label}
      </Badge>
    );
  };

  const getTypeColor = (type: string) => {
    const colorScheme = getTypeColorScheme(type);
    return colorScheme.bg;
  };

  const EventCard = ({ order }: { order: typeof eventOrders[0] }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all"
      onClick={() => navigate(`/event/${order.activity.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <img 
            src={order.activity.image} 
            alt={order.activity.title}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-foreground leading-tight line-clamp-2">
                {order.activity.title}
              </h3>
              {getStatusBadge(order.status)}
            </div>
            
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{order.activity.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{order.activity.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>参赛人数：{order.participants}人</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className={cn("text-sm font-medium", getTypeColor(order.activity.type))}>
                {order.activity.type === 'rowing' ? '赛艇' : 
                 order.activity.type === 'cycling' ? '骑行' : '其他'}赛事
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto pb-6">
      {/* 顶部导航 - 使用竞技黄主题 */}
      <header 
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: colors.background.white,
          borderColor: `${colors.yellow.light}40`
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            style={{ color: colors.text.primary }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 
            className="text-lg font-semibold flex-1"
            style={{ color: colors.text.primary }}
          >
            我的赛事
          </h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 统计卡片 - 使用竞技黄系配色 */}
        <div className="grid grid-cols-3 gap-3">
          <Card style={{ borderColor: `${colors.yellow.light}40` }}>
            <CardContent className="p-4 text-center">
              <p 
                className="text-2xl font-bold"
                style={{ color: colors.warning.primary }}
              >
                {upcomingEvents.length}
              </p>
              <p 
                className="text-xs mt-1"
                style={{ color: colors.text.tertiary }}
              >
                待参与
              </p>
            </CardContent>
          </Card>
          <Card style={{ borderColor: `${colors.yellow.light}40` }}>
            <CardContent className="p-4 text-center">
              <p 
                className="text-2xl font-bold"
                style={{ color: colors.green.primary }}
              >
                {completedEvents.length}
              </p>
              <p 
                className="text-xs mt-1"
                style={{ color: colors.text.tertiary }}
              >
                已完成
              </p>
            </CardContent>
          </Card>
          <Card style={{ borderColor: `${colors.yellow.light}40` }}>
            <CardContent className="p-4 text-center">
              <p 
                className="text-2xl font-bold"
                style={{ color: colors.blue.primary }}
              >
                {reviewingEvents.length}
              </p>
              <p 
                className="text-xs mt-1"
                style={{ color: colors.text.tertiary }}
              >
                审核中
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 赛事列表 */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="upcoming">
              待参与 ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              已完成 ({completedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="reviewing">
              审核中 ({reviewingEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4 space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(order => (
                <EventCard key={order.id} order={order} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">暂无待参与的赛事</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/category?scene=event')}
                  >
                    去报名赛事
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {completedEvents.length > 0 ? (
              completedEvents.map(order => (
                <EventCard key={order.id} order={order} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">暂无完成的赛事记录</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviewing" className="mt-4 space-y-3">
            {reviewingEvents.length > 0 ? (
              reviewingEvents.map(order => (
                <EventCard key={order.id} order={order} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">暂无审核中的赛事</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* 提示 - 使用竞技黄主题 */}
        <Card 
          style={{
            borderColor: `${colors.yellow.primary}20`,
            backgroundColor: `${colors.yellow.primary}05`
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Trophy 
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: colors.yellow.primary }}
              />
              <div className="flex-1">
                <h4 
                  className="text-sm font-medium mb-1"
                  style={{ color: colors.text.primary }}
                >
                  赛事小贴士
                </h4>
                <ul 
                  className="text-xs space-y-1"
                  style={{ color: colors.text.tertiary }}
                >
                  <li>• 请提前30分钟到达赛事现场进行检录</li>
                  <li>• 携带身份证和报名确认码</li>
                  <li>• 完成赛事后可获得电子证书和勋章</li>
                  <li>• 获得名次可在"获奖记录"中查看</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;
