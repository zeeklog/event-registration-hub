import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  MapPin, 
  Shield, 
  FileText, 
  Package,
  AlertTriangle,
  Calendar,
  Users,
  Phone,
  Award,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { activities, eventDetails, eventMaterials } from '@/data/mockData';
import EventMaterialsComponent from '@/components/event/EventMaterials';
import { EventMaterial } from '@/types';
import { cn } from '@/lib/utils';
import { Layout } from '@/components/layout/Layout';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materialsData, setMaterialsData] = useState(() => {
    const defaultData = eventMaterials.find(m => m.eventId === id) || {
      eventId: id || '',
      images: [],
      videos: [],
    };
    return defaultData;
  });

  const activity = activities.find(a => a.id === id);
  const eventDetail = eventDetails.find(e => e.activityId === id);

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <span className="text-4xl">😕</span>
          <p className="mt-2 text-muted-foreground">赛事不存在</p>
          <Button onClick={() => navigate('/')} className="mt-4">返回首页</Button>
        </div>
      </div>
    );
  }

  if (!eventDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <span className="text-4xl">📋</span>
          <p className="mt-2 text-muted-foreground">暂无赛事详情</p>
          <Button onClick={() => navigate(`/activity/${id}`)} className="mt-4">
            查看活动详情
          </Button>
        </div>
      </div>
    );
  }

  const handleUpload = (file: File, type: 'image' | 'video') => {
    const newMaterial: EventMaterial = {
      id: `material-${Date.now()}`,
      type,
      url: type === 'image' 
        ? URL.createObjectURL(file)
        : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: type === 'video' ? URL.createObjectURL(file) : undefined,
      uploadTime: new Date().toISOString(),
      uploader: '当前用户',
    };

    setMaterialsData(prev => ({
      ...prev,
      [type === 'image' ? 'images' : 'videos']: [
        ...(prev[type === 'image' ? 'images' : 'videos']),
        newMaterial,
      ],
    }));
  };

  const handleDelete = (materialId: string) => {
    setMaterialsData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === materialId ? { ...img, isPendingDelete: true } : img
      ),
      videos: prev.videos.map(vid => 
        vid.id === materialId ? { ...vid, isPendingDelete: true } : vid
      ),
    }));
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-background pb-24">
        {/* 顶部图片和导航 */}
        <div className="relative">
          <img 
            src={activity.image} 
            alt={activity.title}
            className="w-full aspect-[4/3] object-cover"
          />
          
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glass hover:bg-black/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <Badge className="bg-action text-white border-0 h-6 font-bold">
              赛事详情
            </Badge>
          </div>
        </div>

        {/* 赛事标题 */}
        <div className="px-4 py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-sm bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">{activity.title}</h1>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-action" />
                  {activity.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-eco" />
                  {activity.date}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="px-4 space-y-6">
          {/* 赛程安排 */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <Clock className="w-5 h-5 text-action" />
                赛程安排
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {eventDetail.schedule.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 border-b border-border last:border-0">
                  <div className="flex-shrink-0 w-20 text-xs font-bold text-action">
                    {item.time}
                  </div>
                  <div className="flex-1 text-sm text-muted-foreground font-medium">
                    {item.content}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 比赛规则 */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <FileText className="w-5 h-5 text-eco" />
                比赛规则
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {eventDetail.rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-eco flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground font-medium leading-relaxed">{rule}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 奖励体系 */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <Award className="w-5 h-5 text-gold" />
                奖励体系
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {eventDetail.rewards.map((reward, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-sm flex items-center justify-center",
                      index === 0 ? "bg-gold-gradient" : "bg-muted"
                    )}>
                      <Trophy className={cn(
                        "w-5 h-5 text-white",
                        index === 1 && "text-muted-foreground",
                        index === 2 && "text-orange-400"
                      )} />
                    </div>
                    <span className="font-bold text-foreground text-sm">{reward.rank}</span>
                  </div>
                  <span className="text-xs font-bold text-action">{reward.prize}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 素材组件 */}
          <EventMaterialsComponent
            eventId={id || ''}
            materials={materialsData.images}
            videos={materialsData.videos}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-border p-4 max-w-lg mx-auto z-50">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">报名费用</div>
              <div className="text-2xl font-bold text-action">¥{activity.price}</div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="h-10 px-4 font-bold"
              onClick={() => window.location.href = 'tel:400-123-4567'}
            >
              <Phone className="w-4 h-4 mr-2" />
              咨询
            </Button>
            <Button 
              className="h-10 px-8 font-bold"
              onClick={() => navigate(`/activity/${id}`)}
            >
              立即报名
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
