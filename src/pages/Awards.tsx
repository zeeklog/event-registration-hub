import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Star, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { colors, gradients, shadows } from '@/lib/design-system';
import { getRankBadgeStyle } from '@/lib/apply-design-system';

const Awards = () => {
  const navigate = useNavigate();

  // 获奖记录数据
  const awards = [
    {
      id: 1,
      eventName: '2026年度城市赛艇锦标赛',
      rank: 1,
      rankText: '冠军',
      prize: '奖金5000元 + 冠军奖杯',
      date: '2026-03-15',
      certificate: true,
      type: 'rowing',
      color: 'from-yellow-400 to-orange-500',
      icon: Trophy,
    },
    {
      id: 2,
      eventName: '环湖山地自行车挑战赛',
      rank: 3,
      rankText: '季军',
      prize: '奖金2000元 + 奖杯',
      date: '2026-03-22',
      certificate: true,
      type: 'cycling',
      color: 'from-orange-400 to-orange-600',
      icon: Award,
    },
    {
      id: 3,
      eventName: '春季赛艇友谊赛',
      rank: 5,
      rankText: '优秀奖',
      prize: '奖金500元 + 证书',
      date: '2026-02-10',
      certificate: true,
      type: 'rowing',
      color: 'from-blue-400 to-blue-600',
      icon: Medal,
    },
  ];

  const stats = {
    totalAwards: awards.length,
    goldMedals: awards.filter(a => a.rank === 1).length,
    silverMedals: awards.filter(a => a.rank === 2).length,
    bronzeMedals: awards.filter(a => a.rank === 3).length,
  };

  const getRankBadge = (rank: number) => {
    const style = getRankBadgeStyle(rank);
    return (
      <Badge 
        className="border-0 font-bold"
        style={{
          background: style.background,
          color: style.color,
          boxShadow: style.boxShadow
        }}
      >
        {style.label}
      </Badge>
    );
  };

  const handleDownload = (awardId: number) => {
    toast.success('证书下载中...');
  };

  const handleShare = (awardId: number) => {
    toast.info('分享功能开发中');
  };

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
          <h1 className="text-lg font-semibold flex-1">获奖记录</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 荣誉统计 */}
        <Card className="bg-gradient-to-br from-primary to-secondary">
          <CardContent className="p-6">
            <div className="text-center text-primary-foreground mb-4">
              <Trophy className="w-12 h-12 mx-auto mb-2" />
              <h2 className="text-2xl font-bold">{stats.totalAwards}</h2>
              <p className="text-sm text-primary-foreground/80">总获奖次数</p>
            </div>
            <Separator className="bg-primary-foreground/20 mb-4" />
            <div className="grid grid-cols-3 gap-4 text-center text-primary-foreground">
              <div>
                <p className="text-2xl font-bold">🥇</p>
                <p className="text-sm mt-1">{stats.goldMedals}次</p>
              </div>
              <div>
                <p className="text-2xl font-bold">🥈</p>
                <p className="text-sm mt-1">{stats.silverMedals}次</p>
              </div>
              <div>
                <p className="text-2xl font-bold">🥉</p>
                <p className="text-sm mt-1">{stats.bronzeMedals}次</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 获奖列表 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">获奖历史</h3>
          
          {awards.map((award, index) => (
            <Card key={award.id} className="relative overflow-hidden">
              {/* 排名装饰 */}
              {award.rank <= 3 && (
                <div className={cn(
                  "absolute top-0 right-0 w-24 h-24 opacity-10",
                  `bg-gradient-to-bl ${award.color}`
                )} />
              )}
              
              <CardContent className="p-4 relative">
                <div className="flex gap-3">
                  {/* 奖杯图标 */}
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0",
                    `bg-gradient-to-br ${award.color} shadow-lg`
                  )}>
                    <award.icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* 赛事名称和排名 */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-foreground leading-tight">
                        {award.eventName}
                      </h4>
                      {getRankBadge(award.rank)}
                    </div>

                    {/* 奖励详情 */}
                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <p>🎁 {award.prize}</p>
                      <p>📅 {award.date}</p>
                    </div>

                    {/* 操作按钮 */}
                    {award.certificate && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload(award.id)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          下载证书
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare(award.id)}
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空状态提示 */}
        {awards.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-medium text-foreground mb-2">暂无获奖记录</h3>
              <p className="text-sm text-muted-foreground mb-4">
                参加更多赛事，展现您的实力
              </p>
              <Button onClick={() => navigate('/category?scene=event')}>
                去报名赛事
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 提示卡片 */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">
                  荣誉说明
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 所有证书均为官方认证，可下载打印</li>
                  <li>• 获奖记录将永久保存在您的账户中</li>
                  <li>• 可将获奖记录分享到社交平台</li>
                  <li>• 累计获奖次数可解锁专属勋章</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Awards;
