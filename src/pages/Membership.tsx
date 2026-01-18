import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Award, Zap, Gift, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { currentUser } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Layout } from '@/components/layout/Layout';

const Membership = () => {
  const navigate = useNavigate();

  const membershipLevels = [
    {
      level: 'normal',
      name: '普通会员',
      icon: Award,
      color: 'bg-action',
      points: '0-999分',
      benefits: ['基础活动预约', '标准客服支持', '参与积分奖励'],
    },
    {
      level: 'silver',
      name: '白银会员',
      icon: Award,
      color: 'bg-gray-400',
      points: '1000-2999分',
      benefits: ['优先预约名额', '9折活动优惠', '免费器材租赁1次/月', '生日专属礼包'],
    },
    {
      level: 'gold',
      name: '黄金会员',
      icon: Crown,
      color: 'bg-gold-gradient',
      points: '3000-9999分',
      benefits: ['超级优先预约', '85折活动优惠', '免费器材租赁3次/月', '专属客服', '免费活动升级'],
    },
    {
      level: 'diamond',
      name: '钻石会员',
      icon: Crown,
      color: 'bg-membership',
      points: '10000分以上',
      benefits: ['最优先预约权', '8折活动优惠', '无限器材租赁', 'VIP专属客服', '免费参加指定活动', '专属勋章和称号'],
    },
  ];

  const currentLevelIndex = membershipLevels.findIndex(l => l.level === currentUser.level);
  const currentLevelInfo = membershipLevels[currentLevelIndex];

  const pointsToNextLevel = {
    normal: 1000 - currentUser.points,
    silver: 3000 - currentUser.points,
    gold: 10000 - currentUser.points,
    diamond: 0,
  };

  const nextLevelPoints = pointsToNextLevel[currentUser.level as keyof typeof pointsToNextLevel];

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-navy pb-10">
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
            <h1 className="text-lg font-bold text-white flex-1">等级中心</h1>
          </div>
        </header>

        <div className="space-y-6">
          {/* 当前状态卡片 */}
          <div className={cn("relative overflow-hidden p-8 shadow-2xl", currentLevelInfo.color)}>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-sm bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                  <currentLevelInfo.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-white tracking-tight">{currentLevelInfo.name}</h2>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Current Membership Status</p>
                </div>
              </div>

              <div className="bg-navy/40 backdrop-blur-md rounded-md p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white/60 uppercase">Points Balance</span>
                  <span className="text-2xl font-black text-white">{currentUser.points}</span>
                </div>
                {currentUser.level !== 'diamond' && (
                  <>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        style={{ width: `${(currentUser.points / 10000) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-white/60 mt-3 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      再获得 {nextLevelPoints} 积分升级到 {membershipLevels[currentLevelIndex + 1].name}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {/* 装饰背景 */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 rounded-full bg-black/5" />
          </div>

          {/* 当前权益 */}
          <div className="px-4">
            <Card className="bg-navy-light border-white/5">
              <CardHeader className="pb-4 border-b border-white/5">
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <Gift className="w-4 h-4 text-action" />
                  当前等级权益
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-1 gap-3">
                {currentLevelInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-sm border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-eco flex-shrink-0" />
                    <span className="text-xs font-bold text-gray-300">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 所有会员等级 */}
          <div className="px-4 space-y-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] px-1">Membership Tiers</h3>
            <div className="space-y-3">
              {membershipLevels.map((level, index) => (
                <Card 
                  key={level.level}
                  className={cn(
                    "bg-navy-light border-white/5 transition-all overflow-hidden shadow-xl",
                    level.level === currentUser.level && "border-action/50 bg-action/5"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 shadow-lg",
                        level.color
                      )}>
                        <level.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white">{level.name}</h4>
                          {level.level === currentUser.level && (
                            <Badge className="bg-action text-white text-[8px] h-4 border-0 font-black">ACTIVE</Badge>
                          )}
                          {index > currentLevelIndex && (
                            <Badge className="bg-white/10 text-gray-500 text-[8px] h-4 border-0 font-black">LOCKED</Badge>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 mb-3">{level.points}</p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {level.benefits.slice(0, 3).map((benefit, i) => (
                            <p key={i} className="text-[10px] font-medium text-gray-400 flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-white/20" />
                              {benefit}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Membership;
