import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Info, 
  Zap, 
  ShieldCheck, 
  CreditCard,
  ChevronRight,
  Leaf
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mockData';

const ScanPage = () => {
  const navigate = useNavigate();

  return (
    <Layout showHeader={false} showNav={false}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)} 
                className="hover:bg-muted p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-black leading-tight tracking-tight">大堡礁深潜体验</h2>
                <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-2 uppercase tracking-wider">
                  <span>9月20-22日</span>
                  <span className="w-1 h-1 bg-border rounded-full"></span>
                  <span className="text-eco flex items-center gap-0.5">
                    <Leaf className="w-3 h-3 fill-eco" />
                    -5.2kg 碳排放
                  </span>
                </p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-32">
          {/* Event Banner Mini */}
          <div className="px-4 py-4">
            <div className="relative h-32 w-full rounded-lg overflow-hidden shadow-2xl border border-border">
              <img 
                alt="Scuba diving" 
                className="w-full h-full object-cover grayscale-[0.2]" 
                src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-4">
                <Badge className="bg-action text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm border-0 shadow-lg">
                  专业级别认证
                </Badge>
              </div>
            </div>
          </div>

          {/* Form Section: Personal Information */}
          <div className="space-y-4">
            <h3 className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] px-6 pt-4">个人信息</h3>
            <div className="px-4 space-y-3">
              {/* Full Name */}
              <div className="flex flex-col w-full">
                <label className="bg-muted border border-border rounded-md px-4 py-3 focus-within:border-action transition-colors group">
                  <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">姓名</p>
                  <input 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-foreground placeholder:text-muted-foreground text-sm font-bold" 
                    placeholder="输入您的法定姓名" 
                    type="text" 
                    defaultValue={currentUser.name}
                  />
                </label>
              </div>
              {/* Phone Number */}
              <div className="flex flex-col w-full">
                <label className="bg-muted border border-border rounded-md px-4 py-3 focus-within:border-action transition-colors group">
                  <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">手机号码</p>
                  <div className="flex items-center">
                    <span className="text-muted-foreground pr-3 border-r border-border mr-3 text-xs font-bold">+86</span>
                    <input 
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-foreground placeholder:text-muted-foreground text-sm font-bold" 
                      placeholder="输入手机号" 
                      type="tel" 
                      defaultValue={currentUser.phone.replace(/\*/g, '0')}
                    />
                  </div>
                </label>
              </div>
              {/* ID Number */}
              <div className="flex flex-col w-full">
                <label className="bg-muted border border-border rounded-md px-4 py-3 focus-within:border-action transition-colors group relative">
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">证件号码</p>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <input 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-foreground placeholder:text-muted-foreground text-sm font-bold uppercase" 
                    placeholder="仅用于保险和参赛资格审核" 
                    type="text" 
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Section: Emergency Contact */}
          <div className="space-y-4 mt-8">
            <h3 className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] px-6 pt-4">紧急联系人</h3>
            <div className="px-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="bg-muted border border-border rounded-md px-4 py-3 focus-within:border-action transition-colors group">
                  <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">联系人姓名</p>
                  <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-foreground text-sm font-bold" placeholder="姓名" type="text" />
                </label>
                <div className="bg-muted border border-border rounded-md px-4 py-3 focus-within:border-action transition-colors group">
                  <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">关系</p>
                  <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-foreground text-sm font-bold appearance-none outline-none">
                    <option className="bg-background">配偶</option>
                    <option className="bg-background">父母</option>
                    <option className="bg-background">朋友</option>
                    <option className="bg-background">其他</option>
                  </select>
                </div>
              </div>
              <label className="bg-muted border border-border rounded-md px-4 py-3 focus-within:border-action transition-colors group">
                <p className="text-muted-foreground text-[10px] font-bold uppercase mb-1">联系电话</p>
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-foreground text-sm font-bold" placeholder="输入联系电话" type="tel" />
              </label>
            </div>
          </div>

          {/* Reward Preview Card */}
          <div className="px-4 mt-8">
            <div className="bg-action/5 border border-action/10 rounded-md p-4 flex items-center justify-between shadow-xl shadow-action/5">
              <div className="flex items-center gap-4">
                <div className="bg-action text-white p-2 rounded-sm shadow-lg shadow-action/20">
                  <Zap className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">积分奖励</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">活动完成后获得 1,200 积分</p>
                </div>
              </div>
              <span className="text-action text-lg font-black tracking-tighter">+1200</span>
            </div>
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="px-6 mt-8 flex gap-3 items-start">
            <Checkbox 
              id="privacy" 
              className="mt-0.5 border-border data-[state=checked]:bg-action data-[state=checked]:border-action"
            />
            <label htmlFor="privacy" className="text-[10px] text-muted-foreground font-bold leading-relaxed cursor-pointer">
              我同意 <span className="text-action">《服务协议》</span> 并确认我的个人信息将用于本次赛事的保险投保及参赛资格登记。
            </label>
          </div>
        </main>

        {/* Bottom Action Bar (Sticky) */}
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-border pb-8 shadow-2xl z-50">
          <div className="p-4 flex items-center justify-between gap-6 max-w-[480px] mx-auto">
            <div className="flex flex-col">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">实付金额</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-action">¥</span>
                <span className="text-3xl font-black text-foreground">1,599</span>
              </div>
            </div>
            <Button className="flex-1 bg-action hover:bg-action/90 text-white font-black h-14 rounded-sm flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg shadow-action/30 border-0 uppercase tracking-widest text-xs">
              <CreditCard className="w-5 h-5" />
              <span>确认并支付</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScanPage;
