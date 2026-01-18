import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck, MapPin, Phone, User, Zap, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // 假数据 - 订单详情
  const order = location.state?.order || {
    id: id || 'ORD001',
    product: {
      title: 'Pro 专业潜水面镜',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      points: 500,
      price: 50,
    },
    paymentMethod: 'points',
    status: 'pending',
    address: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区某某街道123号',
    },
    createdAt: '2026-01-15 10:30:00',
    paidAt: null,
    shippedAt: null,
    completedAt: null,
    trackingNumber: null,
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        label: '待支付',
        icon: Clock,
        color: 'bg-orange-500',
        textColor: 'text-orange-500',
        description: '订单已创建，请尽快支付',
      },
      paid: {
        label: '已支付',
        icon: CheckCircle,
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
        description: '订单已支付，等待发货',
      },
      shipped: {
        label: '已发货',
        icon: Truck,
        color: 'bg-purple-500',
        textColor: 'text-purple-500',
        description: '商品已发货，请注意查收',
      },
      completed: {
        label: '已完成',
        icon: CheckCircle,
        color: 'bg-green-500',
        textColor: 'text-green-500',
        description: '订单已完成，感谢您的购买',
      },
      cancelled: {
        label: '已取消',
        icon: XCircle,
        color: 'bg-gray-500',
        textColor: 'text-gray-500',
        description: '订单已取消',
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

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
            <h1 className="text-xl font-bold text-foreground tracking-tight">订单详情</h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="px-4 py-6 space-y-4">
          {/* 订单状态 */}
          <div className="bg-card rounded-lg p-6 border border-border text-center">
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", statusConfig.color, "bg-opacity-10")}>
                <StatusIcon className={cn("w-8 h-8", statusConfig.textColor)} />
              </div>
              <Badge className={cn("text-sm font-bold px-4 py-1", statusConfig.color, "text-white border-0")}>
                {statusConfig.label}
              </Badge>
              <p className="text-muted-foreground text-sm">{statusConfig.description}</p>
            </div>
            {order.trackingNumber && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">物流单号</p>
                <p className="text-foreground font-bold">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* 商品信息 */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">商品信息</h3>
            <div className="flex gap-4">
              <img
                src={order.product.image}
                alt={order.product.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-foreground font-bold mb-2">{order.product.title}</h4>
                <div className="flex items-center gap-2">
                  {order.paymentMethod === 'points' ? (
                    <>
                      <Zap className="w-4 h-4 text-action fill-action" />
                      <span className="text-action font-black">{order.product.points} 积分</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-foreground" />
                      <span className="text-foreground font-black">¥{order.product.price}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 收货地址 */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">收货地址</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-action mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-bold">{order.address.name}</span>
                  <Phone className="w-4 h-4 text-muted-foreground ml-2" />
                  <span className="text-muted-foreground text-sm">{order.address.phone}</span>
                </div>
                <p className="text-muted-foreground text-sm">{order.address.address}</p>
              </div>
            </div>
          </div>

          {/* 订单信息 */}
          <div className="bg-card rounded-lg p-4 border border-border space-y-3">
            <h3 className="text-lg font-bold text-foreground mb-4">订单信息</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">订单号</span>
              <span className="text-foreground font-bold">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">创建时间</span>
              <span className="text-foreground">{order.createdAt}</span>
            </div>
            {order.paidAt && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">支付时间</span>
                <span className="text-foreground">{order.paidAt}</span>
              </div>
            )}
            {order.shippedAt && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">发货时间</span>
                <span className="text-foreground">{order.shippedAt}</span>
              </div>
            )}
            {order.completedAt && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">完成时间</span>
                <span className="text-foreground">{order.completedAt}</span>
              </div>
            )}
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-foreground font-bold">实付金额</span>
              <span className="text-action text-lg font-black">
                {order.paymentMethod === 'points' 
                  ? `${order.product.points} 积分` 
                  : `¥${order.product.price}`
                }
              </span>
            </div>
          </div>

          {/* 操作按钮 */}
          {order.status === 'pending' && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-border"
                onClick={() => navigate('/order/list')}
              >
                取消订单
              </Button>
              <Button
                className="flex-1 bg-action text-white"
                onClick={() => {
                  // 模拟支付成功，更新订单状态
                  navigate(`/order/${order.id}`, {
                    state: {
                      order: {
                        ...order,
                        status: 'paid',
                        paidAt: new Date().toLocaleString('zh-CN'),
                      },
                    },
                    replace: true,
                  });
                }}
              >
                立即支付
              </Button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default OrderDetail;
