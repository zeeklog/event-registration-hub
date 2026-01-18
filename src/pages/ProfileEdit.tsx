import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Phone, 
  Shield, 
  Users,
  ChevronRight,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { currentUser } from '@/data/mockData';
import { toast } from 'sonner';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [emergencyName, setEmergencyName] = useState(currentUser.emergencyContact?.name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser.emergencyContact?.phone || '');
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);

  const handleSave = () => {
    toast.success('个人信息已保存');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto pb-20">
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
          <h1 className="text-lg font-semibold flex-1">编辑资料</h1>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" />
            保存
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 头像 */}
        <Card>
          <CardContent className="p-4 flex items-center justify-center">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 基本信息 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              基本信息
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">昵称</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入昵称"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">手机号</Label>
                <Input 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="mt-1"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">手机号修改请联系客服</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 实名认证 */}
        <Card>
          <CardContent className="p-4">
            <button 
              className="w-full flex items-center gap-3"
              onClick={() => navigate('/profile/verify')}
            >
              <Shield className="w-5 h-5 text-primary" />
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">实名认证</p>
                <p className="text-sm text-muted-foreground">赛事报名、高风险活动必须实名</p>
              </div>
              {currentUser.isVerified ? (
                <Badge className="bg-success text-primary-foreground border-0">已认证</Badge>
              ) : (
                <Badge variant="outline">未认证</Badge>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* 紧急联系人 */}
        <Card>
          <CardContent className="p-4">
            <button 
              className="w-full flex items-center gap-3"
              onClick={() => setShowEmergencyDialog(true)}
            >
              <Users className="w-5 h-5 text-destructive" />
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">紧急联系人</p>
                <p className="text-sm text-muted-foreground">
                  {currentUser.emergencyContact?.name || '未设置'}
                  {currentUser.emergencyContact?.phone && ` - ${currentUser.emergencyContact.phone}`}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* 健康档案 */}
        <Card>
          <CardContent className="p-4">
            <button 
              className="w-full flex items-center gap-3"
              onClick={() => navigate('/profile/health')}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">💪</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">健康档案</p>
                <p className="text-sm text-muted-foreground">
                  上传体检报告或健康承诺书，参加专业赛事时可快速审核通过
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* 紧急联系人编辑弹窗 */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑紧急联系人</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="emergency-name">联系人姓名</Label>
              <Input 
                id="emergency-name"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="请输入联系人姓名"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="emergency-phone">联系人电话</Label>
              <Input 
                id="emergency-phone"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="请输入联系人电话"
                className="mt-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              ⚠️ 紧急联系人信息将用于户外活动安全保障，请确保填写准确
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmergencyDialog(false)}>
              取消
            </Button>
            <Button onClick={() => {
              toast.success('紧急联系人已更新');
              setShowEmergencyDialog(false);
            }}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileEdit;
