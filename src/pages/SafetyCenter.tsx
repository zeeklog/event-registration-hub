import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  MapPin,
  Bell,
  FileText,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { currentUser } from '@/data/mockData';
import { toast } from 'sonner';

const SafetyCenter = () => {
  const navigate = useNavigate();
  
  // 隐私设置
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);
  
  // 通知设置
  const [eventNotification, setEventNotification] = useState(true);
  const [orderNotification, setOrderNotification] = useState(true);
  const [marketingNotification, setMarketingNotification] = useState(false);

  const loginDevices = [
    {
      id: 1,
      device: 'iPhone 14 Pro',
      location: '浙江省杭州市',
      time: '当前设备',
      current: true,
    },
    {
      id: 2,
      device: 'Chrome 浏览器',
      location: '浙江省杭州市',
      time: '2天前',
      current: false,
    },
  ];

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
          <h1 className="text-lg font-semibold flex-1">安全中心</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 安全评分 */}
        <Card className="bg-gradient-to-br from-primary to-secondary">
          <CardContent className="p-6">
            <div className="text-center text-primary-foreground">
              <Shield className="w-12 h-12 mx-auto mb-3" />
              <h2 className="text-3xl font-bold mb-1">85</h2>
              <p className="text-sm text-primary-foreground/80">安全评分</p>
              <p className="text-xs text-primary-foreground/60 mt-2">
                {currentUser.isVerified ? '已实名认证' : '未实名认证'} · 
                {currentUser.emergencyContact ? ' 已设置紧急联系人' : ' 未设置紧急联系人'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 账号安全 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              账号安全
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
              onClick={() => toast.info('密码修改功能开发中')}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">修改密码</p>
                  <p className="text-xs text-muted-foreground">定期更换密码更安全</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button
              className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
              onClick={() => navigate('/profile/verify')}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">实名认证</p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser.isVerified ? '已认证' : '未认证'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* 隐私设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              隐私设置
            </CardTitle>
            <CardDescription>
              控制您的信息可见性
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">
                    位置信息授权
                  </Label>
                  <p className="text-xs text-muted-foreground">用于推荐附近活动</p>
                </div>
              </div>
              <Switch
                id="location"
                checked={locationEnabled}
                onCheckedChange={setLocationEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    手机号可见
                  </Label>
                  <p className="text-xs text-muted-foreground">其他用户可见您的手机号</p>
                </div>
              </div>
              <Switch
                id="phone"
                checked={phoneVisible}
                onCheckedChange={setPhoneVisible}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="activity" className="text-sm font-medium">
                    活动记录可见
                  </Label>
                  <p className="text-xs text-muted-foreground">其他用户可见您的参与记录</p>
                </div>
              </div>
              <Switch
                id="activity"
                checked={activityVisible}
                onCheckedChange={setActivityVisible}
              />
            </div>
          </CardContent>
        </Card>

        {/* 通知设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              通知设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="event-notif" className="text-sm font-medium">
                  活动通知
                </Label>
                <p className="text-xs text-muted-foreground">活动开始前提醒</p>
              </div>
              <Switch
                id="event-notif"
                checked={eventNotification}
                onCheckedChange={setEventNotification}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="order-notif" className="text-sm font-medium">
                  订单通知
                </Label>
                <p className="text-xs text-muted-foreground">订单状态变更提醒</p>
              </div>
              <Switch
                id="order-notif"
                checked={orderNotification}
                onCheckedChange={setOrderNotification}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-notif" className="text-sm font-medium">
                  营销通知
                </Label>
                <p className="text-xs text-muted-foreground">优惠活动推送</p>
              </div>
              <Switch
                id="marketing-notif"
                checked={marketingNotification}
                onCheckedChange={setMarketingNotification}
              />
            </div>
          </CardContent>
        </Card>

        {/* 登录设备 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              登录设备管理
            </CardTitle>
            <CardDescription>
              查看和管理您的登录设备
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loginDevices.map((device, index) => (
              <div key={device.id}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{device.device}</p>
                      {device.current && (
                        <Badge className="bg-success text-success-foreground text-xs">
                          当前
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {device.location} · {device.time}
                    </p>
                  </div>
                  {!device.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => toast.info('设备已移除')}
                    >
                      移除
                    </Button>
                  )}
                </div>
                {index < loginDevices.length - 1 && (
                  <div className="border-b border-border" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 数据管理 */}
        <Card className="border-warning/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-warning" />
              数据管理
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => toast.info('数据导出功能开发中')}
            >
              导出我的数据
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => toast.warning('注销账号将删除所有数据，请谨慎操作')}
            >
              注销账号
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyCenter;
