import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Info, 
  TrendingUp, 
  QrCode, 
  ChevronRight,
  Waves,
  Palette,
  Calendar,
  Leaf,
  Zap
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { currentUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const PointsCenter: React.FC = () => {
  const navigate = useNavigate();

  const activityLogs = [
    {
      id: '1',
      title: 'Morning Surf Session',
      subtitle: 'Coastal Region • Today',
      points: '+150',
      icon: Waves,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: '2',
      title: 'Beach Cleanup Drive',
      subtitle: 'Environment • Yesterday',
      points: '+300',
      icon: Leaf,
      iconColor: 'text-eco',
      bgColor: 'bg-eco/20'
    },
    {
      id: '3',
      title: 'Outdoor Photo Expo',
      subtitle: 'Arts & Culture • 2 days ago',
      points: '+50',
      icon: Palette,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/20'
    },
    {
      id: '4',
      title: 'Summit Registration',
      subtitle: 'Peak Challenge • Oct 24',
      points: '+200',
      icon: Calendar,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/20'
    }
  ];

  const leaders = [
    { name: 'Alex', rank: '#1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', borderColor: 'border-primary' },
    { name: 'Sam', rank: '#2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam', borderColor: 'border-slate-400' },
    { name: 'Jordan', rank: '#3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', borderColor: 'border-orange-700' },
    { name: 'Taylor', rank: '#4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor', borderColor: 'border-transparent' },
  ];

  return (
    <Layout showHeader={false}>
      <div className="relative flex h-full min-h-screen w-full flex-col bg-background pb-24">
        {/* TopAppBar */}
        <div className="sticky top-0 z-50 flex items-center glass p-4 justify-between border-b border-border">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full h-10 w-10 bg-muted text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-foreground text-lg font-bold leading-tight tracking-tight flex-1 text-center">积分与奖励</h2>
          <div className="flex w-10 items-center justify-end">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground">
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Charts / Dashboard Section */}
        <div className="flex flex-col gap-6 px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Ring Chart Simulation */}
            <div className="relative flex items-center justify-center size-56">
              <div 
                className="size-full rounded-full flex items-center justify-center p-6"
                style={{
                  background: 'conic-gradient(hsl(var(--primary)) 0% 45%, #a855f7 45% 65%, #f59e0b 65% 85%, #10b981 85% 100%)'
                }}
              >
                <div className="bg-background size-full rounded-full flex flex-col items-center justify-center shadow-inner border border-border/50">
                  <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">Total</p>
                  <p className="text-foreground tracking-tighter text-4xl font-black leading-tight mt-1">{currentUser.points.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="text-eco w-3 h-3" />
                    <p className="text-eco text-xs font-bold">+12%</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {[
                { label: '运动', value: '5,600', color: 'bg-primary' },
                { label: '艺术', value: '2,490', color: 'bg-purple-500' },
                { label: '活动', value: '2,490', color: 'bg-orange-500' },
                { label: '环保', value: '1,870', color: 'bg-eco' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-muted/50 p-3 rounded-md border border-border">
                  <div className={`size-2.5 rounded-full ${item.color}`}></div>
                  <div className="flex flex-col">
                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-none mb-1">{item.label}</p>
                    <p className="text-sm font-black text-foreground leading-none">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scan to Earn Button */}
        <div className="px-4 py-3">
          <Button className="w-full h-14 bg-action hover:bg-action/90 text-white rounded-md shadow-lg shadow-action/20 flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest active:scale-95 transition-all">
            <QrCode className="w-6 h-6" />
            <span>扫码赚积分</span>
          </Button>
        </div>

        {/* SectionHeader: Community Leaders */}
        <div className="flex items-center justify-between px-5 pb-2 pt-6">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">社区领袖</h3>
          <span className="text-action text-[10px] font-black uppercase tracking-widest cursor-pointer">查看全部</span>
        </div>

        {/* Leaders Carousel */}
        <div className="flex w-full overflow-x-auto no-scrollbar px-4 py-3">
          <div className="flex flex-row items-start justify-start gap-6">
            {leaders.map((leader, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 w-20 shrink-0">
                <div className="relative">
                  <div className={`size-16 rounded-full border-2 ${leader.borderColor} p-0.5 overflow-hidden`}>
                    <img src={leader.avatar} alt={leader.name} className="w-full h-full object-cover rounded-full bg-muted" />
                  </div>
                  {leader.rank !== '#4' && (
                    <div className={`absolute -bottom-1 -right-1 ${
                      leader.rank === '#1' ? 'bg-yellow-500' : leader.rank === '#2' ? 'bg-slate-400' : 'bg-orange-700'
                    } text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-background shadow-lg`}>
                      {leader.rank}
                    </div>
                  )}
                </div>
                <p className="text-foreground text-[10px] font-black uppercase tracking-widest truncate w-full text-center">{leader.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SectionHeader: Recent Activity */}
        <div className="px-5 pb-2 pt-6">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">积分明细</h3>
        </div>

        {/* Activity Logs List */}
        <div className="flex flex-col gap-2 px-4 pb-12">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-md border border-border active:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`size-10 rounded-sm ${log.bgColor} flex items-center justify-center ${log.iconColor}`}>
                  <log.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">{log.title}</p>
                  <p className="text-muted-foreground text-[10px] font-medium mt-1">{log.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-action fill-action" />
                <p className="text-action font-black text-sm">{log.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PointsCenter;
