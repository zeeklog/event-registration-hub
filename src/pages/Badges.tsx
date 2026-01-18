import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Badges = () => {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['all']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // 使用 Profile.tsx 中的假数据
  const badges = [
    { icon: '/badge/deepdivevip.png', label: '深潜VIP', color: 'text-muted-foreground', bg: 'bg-muted border-border opacity-40 grayscale' },
    { icon: '/badge/boating.png', label: '赛艇大师', color: 'text-action', bg: 'bg-action/10 border-action/20' },
    { icon: '/badge/marathon.png', label: '马拉松新星', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
    { icon: '/badge/jiantanxianfeng.png', label: '减碳达人', color: 'text-eco', bg: 'bg-eco/10 border-eco/20' },
  
    { icon: '/badge/deepdivevip.png', label: '深潜VIP', color: 'text-muted-foreground', bg: 'bg-muted border-border opacity-40 grayscale' },
    { icon: '/badge/boating.png', label: '赛艇大师', color: 'text-action', bg: 'bg-action/10 border-action/20' },
    { icon: '/badge/marathon.png', label: '马拉松新星', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
    { icon: '/badge/jiantanxianfeng.png', label: '减碳达人', color: 'text-eco', bg: 'bg-eco/10 border-eco/20' },
  
    { icon: '/badge/deepdivevip.png', label: '深潜VIP', color: 'text-muted-foreground', bg: 'bg-muted border-border opacity-40 grayscale' },
    { icon: '/badge/boating.png', label: '赛艇大师', color: 'text-action', bg: 'bg-action/10 border-action/20' },
    { icon: '/badge/marathon.png', label: '马拉松新星', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
    { icon: '/badge/jiantanxianfeng.png', label: '减碳达人', color: 'text-eco', bg: 'bg-eco/10 border-eco/20' },
  
    { icon: '/badge/deepdivevip.png', label: '深潜VIP', color: 'text-muted-foreground', bg: 'bg-muted border-border opacity-40 grayscale' },
    { icon: '/badge/boating.png', label: '赛艇大师', color: 'text-action', bg: 'bg-action/10 border-action/20' },
    { icon: '/badge/marathon.png', label: '马拉松新星', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
    { icon: '/badge/jiantanxianfeng.png', label: '减碳达人', color: 'text-eco', bg: 'bg-eco/10 border-eco/20' },
  
    { icon: '/badge/deepdivevip.png', label: '深潜VIP', color: 'text-muted-foreground', bg: 'bg-muted border-border opacity-40 grayscale' },
    { icon: '/badge/boating.png', label: '赛艇大师', color: 'text-action', bg: 'bg-action/10 border-action/20' },
    { icon: '/badge/marathon.png', label: '马拉松新星', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
    { icon: '/badge/jiantanxianfeng.png', label: '减碳达人', color: 'text-eco', bg: 'bg-eco/10 border-eco/20' },
  
  ];

  // 勋章分类数据
  const badgeCategories = [
    {
      id: 'all',
      name: '全部勋章',
      badges: badges,
    },
  ];

  return (
    <div className="min-h-screen bg-black max-w-lg mx-auto pb-6">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold flex-1 text-white">我的勋章</h1>
        </div>
      </header>

      <div className="space-y-0">
        {badgeCategories.map((category) => (
          <div key={category.id} className="border-b border-gray-800">
            {/* 分类标题 */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-900 transition-colors"
            >
              <span className="text-white font-medium">{category.name}</span>
              {expandedCategories.includes(category.id) ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* 勋章列表 */}
            {expandedCategories.includes(category.id) && (
              <div className="px-4 pb-4 grid grid-cols-3 gap-x-2 gap-y-6">
                {category.badges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* 勋章图标容器 - 80x80像素，透明背景 */}
                    <div className="w-20 h-20 flex items-center justify-center">
                      <img 
                        src={badge.icon} 
                        alt={badge.label} 
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    {/* 勋章标签 */}
                    <p className="text-[10px] text-gray-500 text-center leading-tight mt-1 px-1 font-medium">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
