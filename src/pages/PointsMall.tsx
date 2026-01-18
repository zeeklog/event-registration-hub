import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Zap, 
  ChevronRight, 
  Filter,
  ShoppingCart,
  Gift,
  Award,
  Star
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mockData';

const PointsMall = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'gear', name: '装备' },
    { id: 'lifestyle', name: '生活' },
    { id: 'limited', name: '限量' },
  ];

  const mallItems = [
    {
      id: '1',
      title: 'Pro 专业潜水面镜',
      points: 500,
      extraPrice: 29,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'gear',
      badge: '兑换'
    },
    {
      id: '2',
      title: '低碳环保技术T恤',
      points: 350,
      extraPrice: 15,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      category: 'lifestyle',
      badge: '兑换'
    },
    {
      id: '3',
      title: '海洋推进脚蹼',
      points: 800,
      extraPrice: 59,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'gear',
      badge: '兑换'
    },
    {
      id: '4',
      title: '深海纪念币',
      points: 200,
      extraPrice: 9,
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400',
      category: 'limited',
      badge: '限量'
    },
    {
      id: '5',
      title: '智能潜水运动手表',
      points: 2000,
      extraPrice: 299,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'gear',
      badge: '兑换'
    },
    {
      id: '6',
      title: '环保不锈钢保温瓶',
      points: 150,
      extraPrice: 10,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'lifestyle',
      badge: '兑换'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? mallItems 
    : mallItems.filter(item => item.category === activeTab);

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-background pb-20">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-full bg-muted text-foreground"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-foreground tracking-tight">积分商城</h1>
            </div>
            <div className="flex items-center gap-2 bg-action/10 px-3 py-1.5 rounded-full border border-action/20 shadow-lg shadow-action/10">
              <Zap className="w-4 h-4 text-action fill-action" />
              <span className="text-action text-sm font-black">{currentUser.points}P</span>
            </div>
          </div>
        </header>

        <main className="px-4">
          {/* 搜索框 */}
          <div className="py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索装备、服饰、纪念品..." 
                className="pl-11 h-12 bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-lg focus-visible:ring-action"
              />
            </div>
          </div>

          {/* 分类 Tab */}
          <div className="sticky top-[73px] z-40 bg-background -mx-4 px-4 py-2">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 border-b border-border">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    "pb-3 pt-2 whitespace-nowrap text-sm font-bold tracking-wide transition-all border-b-2",
                    activeTab === cat.id ? "text-action border-action" : "text-muted-foreground border-transparent"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* 明星单品 */}
          <div className="mt-6 mb-8">
            <Card
            onClick={() => navigate(`/product/1`)}
            className="relative overflow-hidden aspect-[16/9] border-0 rounded-lg shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" 
                alt="Featured" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <Badge className="bg-action text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm w-fit mb-2 border-0">
                  明星推荐
                </Badge>
                <h3 className="text-foreground text-2xl font-black mb-1 drop-shadow-lg">Titanium Pro 调节器</h3>
                <p className="text-muted-foreground text-sm font-bold">1,200 积分 + ¥129.00</p>
              </div>
            </Card>
          </div>

          {/* 瀑布流/网格布局 */}
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group active:scale-95 transition-all cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="bg-card rounded-lg overflow-hidden border border-border shadow-xl">
                  <div className="relative aspect-[3/4]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={cn(
                        "text-[10px] font-black px-2 py-1 rounded-sm border-0 uppercase shadow-lg",
                        item.badge === '限量' ? "bg-orange-500" : "bg-action"
                      )}>
                        {item.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-foreground line-clamp-2 mb-2 leading-tight h-8">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-action fill-action" />
                      <p className="text-action text-xs font-black">
                        {item.points} <span className="text-muted-foreground font-bold ml-1">或 ¥{item.extraPrice}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default PointsMall;
