import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Zap, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mockData';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'points' | 'cash'>('points');

  // 假数据 - 根据 id 获取商品详情
  const product = {
    id: id || '1',
    title: 'Pro 专业潜水面镜',
    points: 500,
    price: 50,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
    ],
    detailImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    ],
    description: '专业级潜水面镜，采用防雾技术，视野开阔，适合各种潜水环境。',
    badge: '兑换',
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleBuy = () => {
    // 跳转到下单页面，传递商品信息和支付方式
    navigate('/order/create', {
      state: {
        product: {
          id: product.id,
          title: product.title,
          image: product.images[0],
          points: product.points,
          price: product.price,
        },
        paymentMethod: selectedPaymentMethod,
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
            <h1 className="text-xl font-bold text-foreground tracking-tight">商品详情</h1>
            <div className="w-10" />
          </div>
        </header>

        <main>
          {/* 轮播图 */}
          <div className="relative w-full aspect-square bg-muted">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
            
            {/* 图片指示器 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === currentImageIndex ? "w-6 bg-action" : "w-1.5 bg-white/50"
                  )}
                />
              ))}
            </div>

            {/* 左右切换按钮 */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* 角标 */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-action text-white text-[10px] font-black px-2 py-1 rounded-sm border-0 uppercase shadow-lg">
                {product.badge}
              </Badge>
            </div>
          </div>

          {/* 商品信息 */}
          <div className="px-4 py-6 bg-card border-b border-border">
            <h2 className="text-2xl font-black text-foreground mb-4">{product.title}</h2>
            <p className="text-muted-foreground text-sm mb-6">{product.description}</p>

            {/* 价格和积分 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-action fill-action" />
                <span className="text-action text-xl font-black">{product.points} 积分</span>
              </div>
              <div className="text-muted-foreground text-sm">或</div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-foreground" />
                <span className="text-foreground text-xl font-black">¥{product.price}</span>
              </div>
            </div>
          </div>

          {/* 购买方式选择 */}
          <div className="px-4 py-6 bg-card border-b border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">选择购买方式</h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedPaymentMethod('points')}
                className={cn(
                  "w-full p-4 rounded-lg border-2 transition-all text-left",
                  selectedPaymentMethod === 'points'
                    ? "border-action bg-action/10"
                    : "border-border bg-muted"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-action fill-action" />
                    <div>
                      <div className="text-foreground font-bold">积分支付</div>
                      <div className="text-muted-foreground text-sm">使用 {product.points} 积分</div>
                    </div>
                  </div>
                  <div className="text-action font-black">{product.points}P</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedPaymentMethod('cash')}
                className={cn(
                  "w-full p-4 rounded-lg border-2 transition-all text-left",
                  selectedPaymentMethod === 'cash'
                    ? "border-action bg-action/10"
                    : "border-border bg-muted"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-foreground" />
                    <div>
                      <div className="text-foreground font-bold">现金支付</div>
                      <div className="text-muted-foreground text-sm">支付 ¥{product.price}</div>
                    </div>
                  </div>
                  <div className="text-foreground font-black">¥{product.price}</div>
                </div>
              </button>
            </div>
          </div>

          {/* 商品详情图 */}
          <div className="px-4 py-6">
            <h3 className="text-lg font-bold text-foreground mb-4">商品详情</h3>
            <div className="space-y-4">
              {product.detailImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} 详情 ${index + 1}`}
                  className="w-full rounded-lg"
                />
              ))}
            </div>
          </div>
        </main>

        {/* 底部购买按钮 */}
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-card border-t border-border p-4 shadow-lg max-w-lg mx-auto">
          <Button
            onClick={handleBuy}
            className="w-full h-12 bg-action text-white font-black text-lg rounded-lg hover:bg-action/90 shadow-lg"
          >
            {selectedPaymentMethod === 'points' 
              ? `立即购买 - ${product.points} 积分`
              : `立即购买 - ¥${product.price}`
            }
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
