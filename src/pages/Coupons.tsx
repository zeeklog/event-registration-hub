import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { coupons } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Coupons = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('valid');

  const validCoupons = coupons.filter(c => !c.isUsed);
  const usedCoupons = coupons.filter(c => c.isUsed);

  const displayCoupons = activeTab === 'valid' ? validCoupons : usedCoupons;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'newUser': return '新人专享';
      case 'discount': return '折扣券';
      case 'fullReduction': return '满减券';
      default: return '优惠券';
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto">
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
          <h1 className="text-lg font-semibold flex-1">我的优惠券</h1>
        </div>

        {/* 状态筛选 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full h-auto p-0 bg-transparent border-b border-border">
            <TabsTrigger 
              value="valid"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              可用 ({validCoupons.length})
            </TabsTrigger>
            <TabsTrigger 
              value="used"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              已使用 ({usedCoupons.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* 优惠券列表 */}
      <div className="p-4 space-y-3">
        {displayCoupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Ticket className="w-12 h-12 mb-2 opacity-50" />
            <p>{activeTab === 'valid' ? '暂无可用优惠券' : '暂无已使用优惠券'}</p>
          </div>
        ) : (
          displayCoupons.map(coupon => (
            <Card 
              key={coupon.id}
              className={cn(
                "overflow-hidden relative",
                coupon.isUsed && "opacity-60"
              )}
            >
              <CardContent className="p-0">
                <div className="flex">
                  {/* 左侧金额 */}
                  <div className={cn(
                    "w-28 flex flex-col items-center justify-center py-4",
                    coupon.isUsed 
                      ? "bg-muted text-muted-foreground" 
                      : "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground"
                  )}>
                    <div className="flex items-baseline">
                      <span className="text-lg">¥</span>
                      <span className="text-3xl font-bold">{coupon.discount}</span>
                    </div>
                    <span className="text-xs mt-1 opacity-80">满{coupon.minPurchase}可用</span>
                  </div>

                  {/* 右侧信息 */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{coupon.name}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded mt-1 inline-block">
                          {getTypeLabel(coupon.type)}
                        </span>
                      </div>
                      {!coupon.isUsed && (
                        <Button size="sm" onClick={() => navigate('/category')}>
                          去使用
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>有效期至 {coupon.expiryDate}</span>
                    </div>
                  </div>
                </div>

                {/* 装饰性锯齿边 */}
                <div className="absolute left-28 top-0 bottom-0 flex flex-col justify-around -ml-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-background" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Coupons;
