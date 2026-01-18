import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Gift, History, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { currentUser } from '@/data/mockData';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

const Points = () => {
  const navigate = useNavigate();

  const pointsHistory = [
    { id: '1', title: '参与"赛艇锦标赛"', points: +100, date: '2026-02-20', type: 'earn' },
    { id: '2', title: '活动评价奖励', points: +20, date: '2026-02-18', type: 'earn' },
    { id: '3', title: '抵扣报名费', points: -50, date: '2026-02-15', type: 'use' },
    { id: '4', title: '新人注册奖励', points: +200, date: '2026-02-01', type: 'earn' },
  ];

  const gifts = [
    { id: '1', name: '20元代金券', points: 500, image: '🎫' },
    { id: '2', name: '运动水壶', points: 1000, image: '🍶' },
    { id: '3', name: '骑行手套', points: 1500, image: '🧤' },
    { id: '4', name: '露营毯', points: 2000, image: '🏕️' },
  ];

  const nextLevel = 3000;
  const progress = (currentUser.points / nextLevel) * 100;

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-navy pb-20">
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
            <h1 className="text-lg font-bold text-white flex-1">积分中心</h1>
          </div>
        </header>

        {/* 积分主卡片 */}
        <div className="p-4">
          <Card className="bg-action-gradient border-0 shadow-2xl shadow-action/20 overflow-hidden rounded-lg">
            <CardContent className="p-6 relative">
              <div className="relative z-10 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Available Points</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-5xl font-black">{currentUser.points}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Zap className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="opacity-60">Level Progress</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-1000" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-bold opacity-60">
                    还需 {nextLevel - currentUser.points} 积分即可升级
                  </p>
                </div>
              </div>
              <Award className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white opacity-5 rotate-12" />
            </CardContent>
          </Card>
        </div>

        {/* 积分兑换 */}
        <div className="px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Gift className="w-4 h-4 text-eco" />
              优选兑换
            </h2>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-gray-500 hover:text-action">
              查看全部 <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gifts.map(gift => (
              <div 
                key={gift.id}
                className="bg-navy-light border border-white/5 rounded-md p-3 text-center active:scale-95 transition-all shadow-xl"
              >
                <div className="text-3xl mb-2 filter drop-shadow-md">{gift.image}</div>
                <p className="text-[10px] font-bold text-white truncate">{gift.name}</p>
                <p className="text-[10px] font-bold text-action mt-1">{gift.points}P</p>
              </div>
            ))}
          </div>
        </div>

        {/* 积分规则 */}
        <div className="px-4 py-2">
          <Card className="bg-white/[0.02] border border-white/5">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">赚取积分</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎯', label: '参与活动' },
                  { icon: '⭐', label: '发表评价' },
                  { icon: '👥', label: '邀请好友' },
                  { icon: '📅', label: '每日签到' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center text-sm">{item.icon}</span>
                    <span className="text-[10px] font-bold text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 积分明细 */}
        <div className="px-4 py-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-action" />
            积分明细
          </h2>
          <Card className="bg-navy-light border-white/5 divide-y divide-white/5 overflow-hidden">
            {pointsHistory.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 active:bg-white/5 transition-colors">
                <div>
                  <p className="text-xs font-bold text-white">{item.title}</p>
                  <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">{item.date}</p>
                </div>
                <span className={cn(
                  "text-sm font-black",
                  item.type === 'earn' ? 'text-eco' : 'text-red-500'
                )}>
                  {item.type === 'earn' ? '+' : ''}{item.points}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Points;
