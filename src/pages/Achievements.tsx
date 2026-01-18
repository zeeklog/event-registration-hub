import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, TrendingUp, Award, Target, Flame, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { orders } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Achievements = () => {
  const navigate = useNavigate();

  // 统计数据
  const stats = {
    rowingCount: orders.filter(o => o.activity.type === 'rowing' && o.status === 'completed').length,
    cyclingCount: orders.filter(o => o.activity.type === 'cycling' && o.status === 'completed').length,
    campingCount: orders.filter(o => o.activity.type === 'camping' && o.status === 'completed').length,
    totalActivities: orders.filter(o => o.status === 'completed').length,
    totalDistance: 125, // 模拟数据
    totalHours: 48, // 模拟数据
  };

  // 成就徽章
  const achievements = [
    {
      id: 1,
      name: '初来乍到',
      description: '完成首次活动',
      icon: Target,
      unlocked: stats.totalActivities >= 1,
      progress: Math.min(stats.totalActivities, 1),
      total: 1,
      color: 'text-blue-500',
    },
    {
      id: 2,
      name: '户外新手',
      description: '参与3次户外活动',
      icon: Flame,
      unlocked: stats.totalActivities >= 3,
      progress: Math.min(stats.totalActivities, 3),
      total: 3,
      color: 'text-green-500',
    },
    {
      id: 3,
      name: '运动达人',
      description: '参与10次户外活动',
      icon: TrendingUp,
      unlocked: stats.totalActivities >= 10,
      progress: Math.min(stats.totalActivities, 10),
      total: 10,
      color: 'text-orange-500',
    },
    {
      id: 4,
      name: '赛艇爱好者',
      description: '参与5次赛艇活动',
      icon: Award,
      unlocked: stats.rowingCount >= 5,
      progress: Math.min(stats.rowingCount, 5),
      total: 5,
      color: 'text-primary',
    },
    {
      id: 5,
      name: '骑行挑战者',
      description: '骑行总里程达100km',
      icon: Trophy,
      unlocked: stats.totalDistance >= 100,
      progress: Math.min(stats.totalDistance, 100),
      total: 100,
      color: 'text-cycling',
    },
    {
      id: 6,
      name: '露营达人',
      description: '完成5次露营活动',
      icon: Star,
      unlocked: stats.campingCount >= 5,
      progress: Math.min(stats.campingCount, 5),
      total: 5,
      color: 'text-secondary',
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto pb-6">
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
          <h1 className="text-lg font-semibold flex-1">我的成就</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 总览卡片 */}
        <Card className="bg-gradient-to-br from-primary to-secondary">
          <CardContent className="p-6">
            <div className="text-center text-primary-foreground">
              <Trophy className="w-12 h-12 mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-1">{unlockedCount}/{achievements.length}</h2>
              <p className="text-sm text-primary-foreground/80">已解锁成就</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary-foreground/20">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{stats.totalActivities}</p>
                <p className="text-xs text-primary-foreground/80 mt-1">参与活动</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{stats.totalDistance}km</p>
                <p className="text-xs text-primary-foreground/80 mt-1">运动里程</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{stats.totalHours}h</p>
                <p className="text-xs text-primary-foreground/80 mt-1">运动时长</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 运动数据 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              运动数据统计
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">赛艇活动</span>
                <span className="text-sm font-medium">{stats.rowingCount}次</span>
              </div>
              <Progress value={(stats.rowingCount / 10) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">骑行活动</span>
                <span className="text-sm font-medium">{stats.cyclingCount}次</span>
              </div>
              <Progress value={(stats.cyclingCount / 10) * 100} className="h-2 [&>div]:bg-cycling" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">露营活动</span>
                <span className="text-sm font-medium">{stats.campingCount}次</span>
              </div>
              <Progress value={(stats.campingCount / 10) * 100} className="h-2 [&>div]:bg-secondary" />
            </div>
          </CardContent>
        </Card>

        {/* 成就徽章 */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">成就徽章</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id}
                className={cn(
                  "relative overflow-hidden transition-all",
                  !achievement.unlocked && "opacity-50"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mb-3",
                      achievement.unlocked ? "bg-primary/10" : "bg-muted"
                    )}>
                      <achievement.icon className={cn(
                        "w-8 h-8",
                        achievement.unlocked ? achievement.color : "text-muted-foreground"
                      )} />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{achievement.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    {achievement.unlocked ? (
                      <Badge className="bg-success text-success-foreground text-xs">
                        已解锁
                      </Badge>
                    ) : (
                      <div className="w-full">
                        <Progress 
                          value={(achievement.progress / achievement.total) * 100} 
                          className="h-1.5 mb-1"
                        />
                        <p className="text-xs text-muted-foreground">
                          {achievement.progress}/{achievement.total}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 提示 */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              💡 参与更多活动，解锁专属成就徽章，展示您的运动风采！
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Achievements;
