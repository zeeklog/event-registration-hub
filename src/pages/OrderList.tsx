import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const OrderList = () => {
  const navigate = useNavigate();

  // 假数据 - 订单列表
  const orders = [
    {
      id: 'ORD001',
      product: {
        title: 'Pro 专业潜水面镜',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        points: 500,
        price: 50,
      },
      paymentMethod: 'points',
      status: 'pending',
      createdAt: '2026-01-15 10:30:00',
    },
    {
      id: 'ORD002',
      product: {
        title: '低碳环保技术T恤',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        points: 350,
        price: 15,
      },
      paymentMethod: 'cash',
      status: 'paid',
      createdAt: '2026-01-14 15:20:00',
    },
    {
      id: 'ORD003',
      product: {
        title: '海洋推进脚蹼',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        points: 800,
        price: 59,
      },
      paymentMethod: 'points',
      status: 'shipped',
      createdAt: '2026-01-13 09:15:00',
    },
    {
      id: 'ORD004',
      product: {
        title: '深海纪念币',
        image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400',
        points: 200,
        price: 9,
      },
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: '2026-01-10 14:45:00',
    },
    {
      id: 'ORD005',
      product: {
        title: '智能潜水运动手表',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        points: 2000,
        price: 299,
      },
      paymentMethod: 'points',
      status: 'cancelled',
      createdAt: '2026-01-08 11:20:00',
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        label: '待支付',
        icon: Clock,
        color: 'bg-orange-500',
        textColor: 'text-orange-500',
      },
      paid: {
        label: '已支付',
        icon: CheckCircle,
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
      },
      shipped: {
        label: '已发货',
        icon: Truck,
        color: 'bg-purple-500',
        textColor: 'text-purple-500',
      },
      completed: {
        label: '已完成',
        icon: CheckCircle,
        color: 'bg-green-500',
        textColor: 'text-green-500',
      },
      cancelled: {
        label: '已取消',
        icon: XCircle,
        color: 'bg-gray-500',
        textColor: 'text-gray-500',
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-background pb-24">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="flex items-center justify-between px-4 py-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-10 w-10 rounded-full bg-muted text-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground tracking-tight">我的订单</h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="px-4 py-6 space-y-4">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Package className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">暂无订单</p>
            </div>
          ) : (
            orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order.id}
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="bg-card rounded-lg p-4 border border-border active:scale-[0.98] transition-all cursor-pointer"
                >
                  {/* 订单头部 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StatusIcon className={cn("w-4 h-4", statusConfig.textColor)} />
                      <span className="text-sm font-bold text-foreground">订单号: {order.id}</span>
                    </div>
                    <Badge className={cn("text-xs font-bold", statusConfig.color, "text-white border-0")}>
                      {statusConfig.label}
                    </Badge>
                  </div>

                  {/* 商品信息 */}
                  <div className="flex gap-4 mb-3">
                    <img
                      src={order.product.image}
                      alt={order.product.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-foreground font-bold mb-2 line-clamp-2">
                        {order.product.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        {order.paymentMethod === 'points' ? (
                          <span className="text-action font-black">{order.product.points} 积分</span>
                        ) : (
                          <span className="text-foreground font-black">¥{order.product.price}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 订单时间 */}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{order.createdAt}</span>
                    <span className="text-action">查看详情 →</span>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>
    </Layout>
  );
};

export default OrderList;
