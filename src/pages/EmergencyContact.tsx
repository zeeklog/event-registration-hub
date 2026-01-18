import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, User, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { currentUser } from '@/data/mockData';
import { toast } from 'sonner';

const EmergencyContact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser.emergencyContact?.name || '');
  const [phone, setPhone] = useState(currentUser.emergencyContact?.phone || '');
  const [relationship, setRelationship] = useState('');
  const [isEditing, setIsEditing] = useState(!currentUser.emergencyContact);

  const handleSave = () => {
    if (!name || !phone) {
      toast.error('请填写完整的联系人信息');
      return;
    }
    
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\*/g, '').slice(0, 11))) {
      toast.error('请输入正确的手机号码');
      return;
    }

    toast.success('紧急联系人信息已保存');
    setIsEditing(false);
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
          <h1 className="text-lg font-semibold flex-1">紧急联系人</h1>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              编辑
            </Button>
          )}
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 说明卡片 */}
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">为什么需要设置紧急联系人？</h3>
                <p className="text-sm text-muted-foreground">
                  户外活动存在一定风险，设置紧急联系人可以在发生意外时及时通知您的家人或朋友。这是对您和家人负责的重要措施。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系人信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              联系人信息
            </CardTitle>
            <CardDescription>
              {isEditing ? '请填写您的紧急联系人信息' : '您的紧急联系人信息'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名 *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="请输入联系人姓名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">手机号码 *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="请输入联系人手机号码"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                  maxLength={11}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">与您的关系（可选）</Label>
              <Input
                id="relationship"
                placeholder="如：配偶、父母、子女、朋友等"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* 重要提示 */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              重要提示
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>紧急联系人应该是能够及时联系到的亲友</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>建议设置为您的直系亲属或配偶</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>请确保联系方式准确有效，并告知对方您已设置其为紧急联系人</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>仅在紧急情况下才会联系您的紧急联系人</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 保存按钮 */}
        {isEditing && (
          <div className="flex gap-3">
            {currentUser.emergencyContact && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setIsEditing(false);
                  setName(currentUser.emergencyContact?.name || '');
                  setPhone(currentUser.emergencyContact?.phone || '');
                }}
              >
                取消
              </Button>
            )}
            <Button 
              className="flex-1"
              onClick={handleSave}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              保存
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContact;
