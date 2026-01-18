import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Zap, ShoppingBag, MapPin, Phone, User, Package } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const OrderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, paymentMethod } = location.state || {
    product: {
      id: '1',
      title: 'Pro 专业潜水面镜',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      points: 500,
      price: 50,
    },
    paymentMethod: 'points',
  };

  // 收件人信息表单
  const [recipientInfo, setRecipientInfo] = useState({
    name: '张三',
    phone: '13800138000',
    address: '北京市朝阳区某某街道123号',
  });

  // 快递单号（可选，订单创建后生成）
  const trackingNumber = `SF${Date.now().toString().slice(-10)}`;

  const handleSubmit = () => {
    // 创建订单，跳转到订单详情
    const orderId = `ORD${Date.now()}`;
    navigate(`/order/${orderId}`, {
      state: {
        order: {
          id: orderId,
          product,
          paymentMethod,
          address: recipientInfo,
          trackingNumber,
          status: 'pending',
          createdAt: new Date().toLocaleString('zh-CN'),
        },
      },
    });
  };

  return (
    <Layout showHeader={false} showNav={false}>
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
            <h1 className="text-xl font-bold text-foreground tracking-tight">确认订单</h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="px-4 py-6 space-y-6">
          {/* 商品信息 */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">商品信息</h3>
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-foreground font-bold mb-2">{product.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  {paymentMethod === 'points' ? (
                    <>
                      <Zap className="w-4 h-4 text-action fill-action" />
                      <span className="text-action font-black">{product.points} 积分</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-foreground" />
                      <span className="text-foreground font-black">¥{product.price}</span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">数量: 1</p>
              </div>
            </div>
          </div>

          {/* 收件人信息 */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">收件人信息</h3>
              <MapPin className="w-5 h-5 text-action" />
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                  收件人姓名
                </Label>
                <Input
                  id="name"
                  value={recipientInfo.name}
                  onChange={(e) => setRecipientInfo({ ...recipientInfo, name: e.target.value })}
                  className="bg-muted border-border"
                  placeholder="请输入收件人姓名"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm text-muted-foreground mb-2 block">
                  联系电话
                </Label>
                <Input
                  id="phone"
                  value={recipientInfo.phone}
                  onChange={(e) => setRecipientInfo({ ...recipientInfo, phone: e.target.value })}
                  className="bg-muted border-border"
                  placeholder="请输入联系电话"
                  type="tel"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-sm text-muted-foreground mb-2 block">
                  收货地址
                </Label>
                <Input
                  id="address"
                  value={recipientInfo.address}
                  onChange={(e) => setRecipientInfo({ ...recipientInfo, address: e.target.value })}
                  className="bg-muted border-border"
                  placeholder="请输入详细地址"
                />
              </div>
            </div>
          </div>

          {/* 快递单号 */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-action" />
                <h3 className="text-lg font-bold text-foreground">快递单号</h3>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-3 border border-border">
              <p className="text-foreground font-mono text-sm">{trackingNumber}</p>
              <p className="text-muted-foreground text-xs mt-1">订单创建后自动生成</p>
            </div>
          </div>

          {/* 订单信息 */}
          <div className="bg-card rounded-lg p-4 border border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">商品金额</span>
              <span className="text-foreground font-bold">
                {paymentMethod === 'points' ? `${product.points} 积分` : `¥${product.price}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">运费</span>
              <span className="text-foreground font-bold">免运费</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-foreground font-bold">实付</span>
              <span className="text-action text-lg font-black">
                {paymentMethod === 'points' ? `${product.points} 积分` : `¥${product.price}`}
              </span>
            </div>
          </div>
        </main>

        {/* 底部提交按钮 */}
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-card border-t border-border p-4 shadow-lg max-w-lg mx-auto">
          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-action text-white font-black text-lg rounded-lg hover:bg-action/90 shadow-lg"
          >
            提交订单
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderCreate;
