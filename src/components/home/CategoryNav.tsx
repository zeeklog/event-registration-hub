import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { colors } from '@/lib/design-system';

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

interface CategoryNavProps {
  scenes: CategoryItem[];
  types: CategoryItem[];
  quickEntries: { id: string; name: string; icon: string; link: string }[];
}

export const CategoryNav = ({ scenes, types, quickEntries }: CategoryNavProps) => {
  const navigate = useNavigate();

  // 动态获取图标组件
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon || Icons.HelpCircle;
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* 场景分类 */}
      <div className="grid grid-cols-4 gap-4">
        {scenes.map((scene) => {
          const Icon = getIcon(scene.icon);
          return (
            <button
              key={scene.id}
              onClick={() => navigate(`/category?scene=${scene.id}`)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-md bg-navy-light border border-white/5 flex items-center justify-center shadow-lg group-active:scale-95 transition-all duration-200">
                <Icon className="w-6 h-6 text-action" />
              </div>
              <span className="text-xs font-medium text-gray-300">
                {scene.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 品类分类 */}
      <div className="grid grid-cols-3 gap-3">
        {types.map((type) => {
          const Icon = getIcon(type.icon);
          // 根据类型使用不同的颜色
          const typeColors = {
            rowing: { bg: 'bg-action', text: 'text-white' },
            cycling: { bg: 'bg-points-sports', text: 'text-white' },
            camping: { bg: 'bg-eco', text: 'text-navy' }
          };
          const colorScheme = typeColors[type.color as keyof typeof typeColors] || 
                            { bg: 'bg-navy-light', text: 'text-white' };
          
          return (
            <button
              key={type.id}
              onClick={() => navigate(`/category?type=${type.id}`)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md shadow-lg transition-all duration-200 active:scale-95 ${colorScheme.bg}`}
            >
              <Icon className={`w-5 h-5 ${colorScheme.text}`} />
              <span className={`text-sm font-bold ${colorScheme.text}`}>
                {type.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 快捷入口 */}
      <div className="flex justify-center gap-10 pt-2">
        {quickEntries.map((entry) => {
          const Icon = getIcon(entry.icon);
          return (
            <button
              key={entry.id}
              onClick={() => entry.link.startsWith('tel:') ? window.location.href = entry.link : navigate(entry.link)}
              className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-action transition-colors duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center group-active:bg-white/10 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{entry.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
