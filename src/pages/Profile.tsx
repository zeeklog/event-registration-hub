import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  User, 
  ShieldCheck, 
  FileText, 
  Ticket, 
  Award, 
  Heart,
  Settings,
  HelpCircle,
  Star,
  Phone,
  Activity,
  Calendar,
  History,
  TrendingUp,
  Shield,
  Crown,
  Trophy,
  Sparkles,
  Target,
  Flame,
  Zap,
  Gift,
  Bell,
  Check,
  Droplets,
  Waves,
  MessageCircle,
  ClipboardList
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mockData';

const Profile = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    pendingOrders: 3,
    completedOrders: 28,
    achievementCount: 12,
    validCoupons: 5
  });

  const getLevelConfig = (level: string) => {
    const configs = {
      diamond: {
        name: '钻石会员',
        icon: Sparkles,
        color: 'from-action via-blue-600 to-indigo-800',
        textColor: 'text-white'
      },
      gold: {
        name: '精英选手',
        icon: Crown,
        color: 'bg-gold-gradient',
        textColor: 'text-white'
      },
      silver: {
        name: '进阶达人',
        icon: Award,
        color: 'bg-gray-400',
        textColor: 'text-white'
      },
      normal: {
        name: '普通成员',
        icon: Trophy,
        color: 'bg-action',
        textColor: 'text-white'
      }
    };
    return (configs as any)[level] || configs.normal;
  };

  const levelConfig = getLevelConfig(currentUser.level);
  const LevelIcon = levelConfig.icon;

  const menuSections = [
    {
      title: '我的活动',
      items: [
        { icon: ClipboardList, label: '我的预约', path: '/profile/orders', badge: stats.pendingOrders, color: 'bg-blue-500/10 text-blue-500' },
        { icon: Calendar, label: '活动日历', path: '/calendar', color: 'bg-eco/10 text-eco' },
        { icon: Heart, label: '我的收藏', path: '/profile/favorites', color: 'bg-red-500/10 text-red-500' },
        { icon: History, label: '参与记录', path: '/profile/history', color: 'bg-purple-500/10 text-purple-500' },
      ]
    },
    {
      title: '账户安全',
      items: [
        { icon: User, label: '个人信息', path: '/profile/edit', color: 'bg-gray-500/10 text-gray-400' },
        { icon: ShieldCheck, label: '实名认证', path: '/profile/verify', verified: currentUser.isVerified, color: 'bg-eco/10 text-eco' },
        { icon: Phone, label: '紧急联系', path: '/profile/emergency', color: 'bg-red-500/10 text-red-500' },
        { icon: Activity, label: '健康档案', path: '/profile/health', color: 'bg-action/10 text-action' },
      ]
    },
    {
      title: '更多服务',
      items: [
        { icon: Shield, label: '运动保险', path: '/profile/insurance', color: 'bg-blue-500/10 text-blue-500' },
        { icon: MessageCircle, label: '服务工单', path: '/service', color: 'bg-eco/10 text-eco' },
        { icon: Star, label: '我的评价', path: '/profile/reviews', color: 'bg-gold-gradient text-white' },
        { icon: Settings, label: '系统设置', path: '/profile/settings', color: 'bg-gray-500/10 text-gray-400' },
      ]
    }
  ];

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-navy pb-24">
        {/* 顶部导航栏 */}
        <nav className="sticky top-0 z-50 flex items-center glass p-4 justify-between border-b border-border">
          <button className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
            <Settings className="w-5 h-5" onClick={() => navigate('/profile/settings')} />
          </button>
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground flex-1 text-center">个人中心</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="relative flex items-center justify-center h-10 w-10 text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            </button>
          </div>
        </nav>

        <main className="max-w-md mx-auto pt-4">
          {/* 个人头像信息 */}
          <div className="flex px-6 py-4 items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-action p-0.5 shadow-2xl">
                <img 
                  src={currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Baby'} 
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover bg-navy-light"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-action text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-lg border border-navy">PRO</div>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-black text-foreground leading-none">{currentUser.name}</p>
              <p className="text-muted-foreground text-xs font-bold flex items-center gap-1.5 mt-2">
                <Flame className="w-3.5 h-3.5 text-eco fill-eco" />
                减碳英雄: 已减少 24.5kg CO2
              </p>
            </div>
          </div>

          {/* 会员权益卡片 */}
          <div className="px-4 mb-8 mt-2">
            <div className={cn("relative overflow-hidden bg-gradient-to-br rounded-lg p-6 shadow-2xl", levelConfig.color)}>
              <div className="absolute top-[-10px] right-[-10px] opacity-10 rotate-12">
                <Droplets className="w-32 h-32 text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">高级会员卡</p>
                    <p className="text-white text-3xl font-black italic tracking-tighter">{levelConfig.name}</p>
                  </div>
                  <Waves className="text-white/30 w-10 h-10" />
                </div>
                <div className="flex items-end justify-between">
                  <div 
                    onClick={() => navigate('/profile/points')}
                    className="cursor-pointer active:opacity-80 transition-all"
                  >
                    <p className="text-white/60 text-[10px] font-bold uppercase mb-1">总奖励积分</p>
                    <p className="text-white text-2xl font-black tracking-tight">{currentUser.points}积分</p>
                  </div>
                  <button 
                    onClick={() => navigate('/profile/coupons')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-sm text-[10px] font-black flex items-center gap-2 transition-all uppercase tracking-widest border border-white/10"
                  >
                    {stats.validCoupons} 张优惠券
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 勋章墙 Achievement Wall */}
          <section className="mb-8">
            <div className="flex items-center justify-between px-5 mb-4">
              <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">成就墙</h3>
              <button onClick={() => navigate('/profile/badges')} className="text-action text-[10px] font-black uppercase tracking-widest">查看全部</button>
            </div>
            <div className="grid grid-cols-4 gap-3 px-4">
              {[
                { icon: '/badge/deepdivevip.png', label: '深潜VIP', color: 'text-muted-foreground', bg: 'bg-muted border-border opacity-40 grayscale' },
                { icon: '/badge/boating.png', label: '赛艇大师', color: 'text-action', bg: 'bg-action/10 border-action/20' },
                { icon: '/badge/marathon.png', label: '马拉松新星', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
                { icon: '/badge/jiantanxianfeng.png', label: '减碳达人', color: 'text-eco', bg: 'bg-eco/10 border-eco/20' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2.5">
                  {(
                    <div className="aspect-square w-full rounded-md overflow-hidden">
                      <img src={item.icon} alt={item.label} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-muted-foreground text-center truncate w-full uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 点亮进度 Lighting Progress */}
          <section className="px-4 mb-10">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 px-1">活动点亮进度</h3>
            <div className="bg-navy-light p-6 rounded-lg border border-border shadow-xl">
              <div className="relative flex justify-between items-center">
                {/* Progress Lines */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-muted rounded-full"></div>
                <div className="absolute top-4 left-0 w-2/3 h-0.5 bg-action rounded-full shadow-[0_0_12px_rgba(37,137,245,0.6)]"></div>
                
                {/* Steps */}
                {[
                  { icon: Check, label: '已登记', active: true },
                  { icon: Activity, label: '参与中', active: true },
                  { icon: Zap, label: '待入账', active: false },
                ].map((step, i) => (
                  <div key={i} className="relative flex flex-col items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all border-2",
                      step.active 
                        ? "bg-action border-action text-white shadow-lg shadow-action/30" 
                        : "bg-navy-lighter border-border text-muted-foreground"
                    )}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest",
                      step.active ? "text-action" : "text-muted-foreground"
                    )}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 功能列表 Functional List */}
          <div className="px-4 space-y-8 pb-10">
            {menuSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-1">{section.title}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {section.items.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => navigate(item.path)}
                      className="flex items-center justify-between p-4 bg-navy-light border border-border rounded-md cursor-pointer active:scale-[0.98] transition-all hover:bg-accent/50 shadow-lg group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center shadow-inner", item.color)}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-foreground transition-colors">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.badge !== undefined && item.badge > 0 && (
                          <Badge className="bg-red-500 text-white border-0 h-5 px-1.5 font-black text-[10px] rounded-sm">{item.badge}</Badge>
                        )}
                        {item.verified && (
                          <Badge className="bg-eco text-navy border-0 h-5 px-1.5 font-black text-[10px] rounded-sm">已认证</Badge>
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-action transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
