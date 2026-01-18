import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const HealthRecord = () => {
  const navigate = useNavigate();
  const [healthCommitment, setHealthCommitment] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);

  const handleFileUpload = () => {
    // 模拟文件上传
    const mockFile = `health-report-${Date.now()}.pdf`;
    setUploadedFiles(prev => [...prev, mockFile]);
    toast.success('文件上传成功');
  };

  const handleDeleteFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileName));
    setShowDeleteDialog(null);
    toast.success('文件已删除');
  };

  const handleSave = () => {
    if (!healthCommitment) {
      toast.error('请先确认健康承诺书');
      return;
    }
    toast.success('健康档案已保存');
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
          <h1 className="text-lg font-semibold flex-1">健康档案</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 说明卡片 */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">健康档案说明</h3>
                <p className="text-sm text-muted-foreground">
                  上传体检报告或填写健康承诺书，参加专业赛事时可快速审核通过。您的健康信息将被严格保密，仅用于活动安全保障。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 健康承诺书 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              健康承诺书
            </h3>
            
            <div className="p-4 bg-muted rounded-lg space-y-2 text-sm text-muted-foreground">
              <p>1. 本人确认身体健康，无心脏病、高血压、癫痫等不适宜参加户外运动的疾病。</p>
              <p>2. 本人了解并理解户外运动存在一定风险，自愿承担因个人身体原因导致的意外风险。</p>
              <p>3. 如隐瞒健康状况导致意外，责任由本人承担。</p>
              <p>4. 本人承诺在活动期间遵守安全规则，听从工作人员指挥。</p>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox 
                id="commitment" 
                checked={healthCommitment}
                onCheckedChange={(checked) => setHealthCommitment(!!checked)}
              />
              <Label htmlFor="commitment" className="flex-1 cursor-pointer">
                <span className="text-sm">我已阅读并同意以上健康承诺书</span>
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* 过敏史 */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-foreground">过敏史（可选）</h3>
            <div>
              <Label htmlFor="allergies" className="text-sm">请填写您的过敏史</Label>
              <Textarea
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="如：花粉过敏、海鲜过敏等"
                className="mt-1 min-h-20"
              />
              <p className="text-xs text-muted-foreground mt-1">
                此信息仅用于活动安全适配，不会泄露给第三方
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 运动禁忌 */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-foreground">运动禁忌（可选）</h3>
            <div>
              <Label htmlFor="medical-history" className="text-sm">请填写您的运动禁忌</Label>
              <Textarea
                id="medical-history"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="如：不能剧烈运动、不能长时间站立等"
                className="mt-1 min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* 体检报告上传 */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              体检报告（可选）
            </h3>
            <p className="text-sm text-muted-foreground">
              上传体检报告可加快专业赛事审核速度，支持PDF、JPG、PNG格式，单个文件不超过10MB
            </p>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleFileUpload}
            >
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </Button>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2 mt-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm truncate">{file}</span>
                      <Badge variant="secondary" className="text-xs">已上传</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowDeleteDialog(file)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 保存按钮 */}
        <Button className="w-full" onClick={handleSave}>
          保存健康档案
        </Button>
      </div>

      {/* 删除确认弹窗 */}
      <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            确定要删除文件 "{showDeleteDialog}" 吗？
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(null)}>
              取消
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => showDeleteDialog && handleDeleteFile(showDeleteDialog)}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthRecord;
