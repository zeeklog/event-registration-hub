import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle2, Info, Plus, Clock, FileText, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Insurance = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // 保险套餐
  const insurancePlans = [
    {
      id: 'basic',
      name: '基础运动保险',
      price: 9.9,
      period: '单次活动',
      coverage: 300000,
      features: [
        '意外身故/伤残：30万元',
        '意外医疗：2万元',
        '骨折津贴：200元/天',
        '24小时生效',
      ],
      suitable: '适合体验类、休闲类活动',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'standard',
      name: '标准运动保险',
      price: 29.9,
      period: '单次活动',
      coverage: 500000,
      features: [
        '意外身故/伤残：50万元',
        '意外医疗：5万元',
        '住院津贴：200元/天',
        '骨折津贴：300元/天',
        '救援服务：含直升机救援',
        '即时生效',
      ],
      suitable: '适合专业赛事、高强度活动',
      color: 'from-orange-400 to-orange-600',
      recommended: true,
    },
    {
      id: 'premium',
      name: '全年运动保险',
      price: 299,
      period: '365天',
      coverage: 1000000,
      features: [
        '意外身故/伤残：100万元',
        '意外医疗：10万元',
        '住院津贴：300元/天',
        '骨折津贴：500元/天',
        '全年无限次使用',
        '含紧急医疗运送',
        '专属理赔通道',
      ],
      suitable: '适合高频参与户外活动用户',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  // 已购保险
  const myInsurances = [
    {
      id: 1,
      planName: '标准运动保险',
      orderNo: 'INS20260315001',
      coverage: 500000,
      status: 'active',
      validFrom: '2026-03-15',
      validTo: '2026-03-15',
      activity: '2026年度城市赛艇锦标赛',
    },
  ];

  const handleBuy = (planId: string) => {
    setSelectedPlan(planId);
    toast.success('跳转到支付页面...');
  };

  const handleClaim = () => {
    toast.info('理赔申请功能开发中');
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
          <h1 className="text-lg font-semibold flex-1">运动保险</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 保险说明 */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1 text-sm">
                  为什么需要购买运动保险？
                </h3>
                <p className="text-xs text-muted-foreground">
                  户外运动存在一定风险，购买保险可以在意外发生时获得经济保障。专业赛事强制要求购买保险，体验类活动建议购买。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 我的保险 */}
        {myInsurances.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">我的保险</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleClaim}
              >
                申请理赔
              </Button>
            </div>

            {myInsurances.map(insurance => (
              <Card key={insurance.id} className="border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {insurance.planName}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          保单号：{insurance.orderNo}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      生效中
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">保障金额</span>
                      <span className="font-medium">¥{insurance.coverage.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">生效日期</span>
                      <span>{insurance.validFrom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">关联活动</span>
                      <span className="text-primary truncate max-w-[200px]">
                        {insurance.activity}
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => toast.info('查看保单详情')}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    查看保单详情
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 保险套餐 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">购买保险</h3>

          {insurancePlans.map(plan => (
            <Card 
              key={plan.id}
              className={cn(
                "relative overflow-hidden transition-all",
                plan.recommended && "border-2 border-primary"
              )}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-primary text-primary-foreground rounded-none rounded-bl-lg">
                    推荐
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    `bg-gradient-to-br ${plan.color}`
                  )}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base mb-1">{plan.name}</CardTitle>
                    <CardDescription className="text-xs">{plan.suitable}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* 价格 */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">¥{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>

                {/* 保障金额 */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">最高保障金额</p>
                  <p className="text-lg font-bold text-foreground">
                    ¥{plan.coverage.toLocaleString()}
                  </p>
                </div>

                <Separator />

                {/* 保障内容 */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">保障内容</p>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 购买按钮 */}
                <Button 
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => handleBuy(plan.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  立即购买
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 理赔指南 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              理赔指南
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <h4 className="font-medium text-foreground">理赔流程：</h4>
              <ol className="space-y-1 text-muted-foreground text-xs list-decimal list-inside">
                <li>意外发生后48小时内报案</li>
                <li>准备理赔材料（医疗发票、诊断证明等）</li>
                <li>在APP内提交理赔申请</li>
                <li>保险公司审核（3-5个工作日）</li>
                <li>审核通过后理赔款打入账户</li>
              </ol>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">需要帮助？</p>
                <p className="text-xs text-muted-foreground">联系保险客服</p>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => window.location.href = 'tel:95511'}
              >
                <Phone className="w-3 h-3 mr-1" />
                95511
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 常见问题 */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle className="text-sm">常见问题</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Q: 保险什么时候生效？
              </h4>
              <p className="text-xs text-muted-foreground">
                A: 基础和标准保险购买后即时或24小时内生效，全年保险次日00:00生效。
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Q: 可以退保吗？
              </h4>
              <p className="text-xs text-muted-foreground">
                A: 保险生效前可全额退款，生效后不可退保。活动取消时保险自动失效并退款。
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Q: 保险覆盖哪些运动？
              </h4>
              <p className="text-xs text-muted-foreground">
                A: 覆盖平台内所有户外运动项目，包括但不限于赛艇、骑行、徒步、露营等。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insurance;
