import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Upload, CheckCircle, Camera, AlertCircle, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { currentUser } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Verify = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(currentUser.isVerified ? 3 : 1);
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [useFaceVerify, setUseFaceVerify] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);

  const handleSubmit = () => {
    if (!name || !idNumber) {
      toast.error('请填写完整信息');
      return;
    }
    if (!frontImage || !backImage) {
      toast.error('请上传身份证照片');
      return;
    }
    
    setStep(3);
    toast.success('实名认证提交成功，预计1个工作日内完成审核');
  };

  const handleImageUpload = (side: 'front' | 'back') => {
    // 模拟上传
    const mockUrl = 'uploaded';
    if (side === 'front') {
      setFrontImage(mockUrl);
    } else {
      setBackImage(mockUrl);
    }
    toast.success('上传成功');
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
          <h1 className="text-lg font-semibold flex-1">实名认证</h1>
        </div>
      </header>

      {/* 步骤指示器 */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-center">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= s 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {i < 2 && (
                <div className={cn(
                  "w-16 h-1 mx-2",
                  step > s ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex gap-12 text-xs text-muted-foreground">
            <span>填写信息</span>
            <span>上传证件</span>
            <span>审核结果</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {currentUser.isVerified || step === 3 ? (
          <Card className="text-center py-10">
            <CardContent className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground">认证成功</h3>
              <p className="text-muted-foreground">您已完成实名认证，可参与所有活动</p>
              <Button onClick={() => navigate(-1)}>返回</Button>
            </CardContent>
          </Card>
        ) : step === 1 ? (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Shield className="w-5 h-5" />
                <span className="font-medium">填写实名信息</span>
              </div>
              
              <div>
                <Label htmlFor="real-name">真实姓名</Label>
                <Input 
                  id="real-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入身份证上的姓名"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="id-number">身份证号</Label>
                <Input 
                  id="id-number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="请输入18位身份证号"
                  className="mt-1"
                  maxLength={18}
                />
              </div>

              {/* 人脸核验选项 */}
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <UserCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      id="face-verify"
                      checked={useFaceVerify}
                      onChange={(e) => setUseFaceVerify(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="face-verify" className="text-sm font-medium cursor-pointer">
                      使用人脸核验（推荐，可加快审核速度）
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    人脸核验可提高认证安全性，专业赛事报名建议使用
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  根据相关法规，参与赛事及户外高风险活动需进行实名认证。您的信息将被加密保护，仅用于活动安全保障。
                </p>
              </div>

              <Button className="w-full" onClick={() => setStep(2)}>
                下一步
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Camera className="w-5 h-5" />
                <span className="font-medium">上传身份证照片</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">人像面</p>
                  <button 
                    className={cn(
                      "w-full aspect-[3/2] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors",
                      frontImage 
                        ? "border-success bg-success/5" 
                        : "border-muted hover:border-primary"
                    )}
                    onClick={() => handleImageUpload('front')}
                  >
                    {frontImage ? (
                      <CheckCircle className="w-8 h-8 text-success" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">点击上传</span>
                      </>
                    )}
                  </button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">国徽面</p>
                  <button 
                    className={cn(
                      "w-full aspect-[3/2] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors",
                      backImage 
                        ? "border-success bg-success/5" 
                        : "border-muted hover:border-primary"
                    )}
                    onClick={() => handleImageUpload('back')}
                  >
                    {backImage ? (
                      <CheckCircle className="w-8 h-8 text-success" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">点击上传</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• 请确保照片清晰、无遮挡</p>
                <p>• 仅支持JPG、PNG格式，大小不超过10MB</p>
              </div>

              {/* 人脸核验 */}
              {useFaceVerify && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm">人脸核验</span>
                  </div>
                  {!faceVerified ? (
                    <div className="space-y-3">
                      <div className="w-full aspect-square max-w-xs mx-auto bg-muted rounded-lg flex flex-col items-center justify-center gap-3">
                        <Camera className="w-12 h-12 text-muted-foreground opacity-50" />
                        <p className="text-sm text-muted-foreground">请将脸部对准摄像头</p>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          // 模拟人脸识别
                          setTimeout(() => {
                            setFaceVerified(true);
                            toast.success('人脸核验成功');
                          }, 1500);
                        }}
                      >
                        开始人脸核验
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        请确保光线充足，正对摄像头，保持面部清晰可见
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-success font-medium">人脸核验成功</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  上一步
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleSubmit}
                  disabled={useFaceVerify && !faceVerified}
                >
                  提交认证
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Verify;
