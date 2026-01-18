import { useState } from 'react';
import { 
  SlidersHorizontal, 
  ArrowUpDown,
  MapPin,
  Star,
  Users,
  Mountain,
  Home,
  Droplets,
  Grid3x3,
  Award,
  Activity,
  Bike,
  Waves,
  Dumbbell,
  Target,
  Trophy,
  Heart,
  ChevronRight
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ActivityCard } from '@/components/activity/ActivityCard';

const Category = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedScene, setSelectedScene] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);

  const categoryTypes = [
    { id: 'all', name: '全部', icon: Grid3x3 },
    { id: 'running', name: '跑步', icon: Activity },
    { id: 'cycling', name: '骑行', icon: Bike },
    { id: 'swimming', name: '游泳', icon: Waves },
    { id: 'fitness', name: '健身', icon: Dumbbell },
    { id: 'yoga', name: '瑜伽', icon: Target },
    { id: 'basketball', name: '篮球', icon: Trophy },
    { id: 'football', name: '足球', icon: Award },
  ];

  const categoryScenes = [
    { id: 'all', name: '全部', icon: Grid3x3 },
    { id: 'outdoor', name: '户外', icon: Mountain },
    { id: 'indoor', name: '室内', icon: Home },
    { id: 'water', name: '水上', icon: Droplets },
    { id: 'event', name: '赛事', icon: Trophy },
  ];

  const difficulties = [
    { id: 'beginner', label: '入门', color: 'bg-eco text-navy' },
    { id: 'intermediate', label: '进阶', color: 'bg-action text-white' },
    { id: 'advanced', label: '高级', color: 'bg-orange-500 text-white' },
    { id: 'professional', label: '专业', color: 'bg-purple-500 text-white' },
  ];

  const activitiesData = [
    {
      id: "1",
      title: '城市马拉松挑战赛',
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      enrolled: 128,
      capacity: 200,
      location: '奥林匹克公园',
      distance: 2.3,
      difficulty: 'intermediate',
      tags: ['赛事', '户外'],
      type: 'running',
      date: '2026-05-20',
      time: '08:00'
    },
    {
      id: "2",
      title: '瑜伽冥想工作坊',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      price: 158,
      rating: 4.9,
      enrolled: 45,
      capacity: 50,
      location: '静心瑜伽馆',
      distance: 1.5,
      difficulty: 'beginner',
      tags: ['室内', '放松'],
      type: 'yoga',
      date: '2026-05-21',
      time: '10:00'
    },
    {
      id: "3",
      title: '山地自行车越野',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400',
      price: 388,
      originalPrice: 488,
      rating: 4.7,
      enrolled: 68,
      capacity: 80,
      location: '香山森林公园',
      distance: 8.2,
      difficulty: 'advanced',
      tags: ['户外', '挑战'],
      type: 'cycling',
      date: '2026-05-22',
      time: '09:00'
    },
    {
      id: "4",
      title: '游泳技能提升班',
      image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400',
      price: 599,
      rating: 4.6,
      enrolled: 32,
      capacity: 40,
      location: '国家游泳中心',
      distance: 3.8,
      difficulty: 'intermediate',
      tags: ['水上', '培训'],
      type: 'swimming',
      date: '2026-05-23',
      time: '14:00'
    }
  ];

  const toggleDifficulty = (id: string) => {
    setDifficultyFilter(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <Layout showHeader={false}>
      {/* 顶部固定筛选区域 */}
      <div className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-white">活动分类</h1>
        </div>

        {/* 类型筛选 */}
        <div className="px-4 pb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categoryTypes.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedType === type.id
                      ? 'bg-action text-white shadow-lg shadow-action/20'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 场景标签 */}
        <div className="px-4 pb-4 overflow-x-auto border-t border-white/5 pt-4">
          <div className="flex gap-2">
            {categoryScenes.map(scene => {
              const Icon = scene.icon;
              return (
                <button
                  key={scene.id}
                  onClick={() => setSelectedScene(scene.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-bold whitespace-nowrap transition-all ${
                    selectedScene === scene.id
                      ? 'bg-eco text-navy'
                      : 'bg-navy-lighter border border-white/5 text-gray-400 hover:border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{scene.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 排序和筛选栏 */}
        <div className="flex items-center gap-3 px-4 py-3 bg-navy-light/50 border-t border-white/5">
          <Button 
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 h-8 px-3 bg-white/5 border border-white/5 rounded-sm text-xs font-bold text-white"
            onClick={() => setSortBy(sortBy === 'default' ? 'price-asc' : 'default')}
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-action" />
            <span>排序</span>
          </Button>

          <Button 
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 h-8 px-3 bg-white/5 border border-white/5 rounded-sm text-xs font-bold text-white"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-eco" />
            <span>筛选</span>
          </Button>

          <div className="flex-1"></div>

          <span className="text-[10px] text-gray-400 font-bold">
            {activitiesData.length} 个项目
          </span>
        </div>
      </div>

      {/* 筛选面板 */}
      {showFilters && (
        <div className="bg-navy-light border-b border-white/5 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-6">
            {/* 价格区间 */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">价格区间</h4>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full accent-action"
                />
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-action">¥{priceRange[0]}</span>
                  <span className="text-gray-500">至</span>
                  <span className="text-action">¥{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* 难度筛选 */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">难度等级</h4>
              <div className="grid grid-cols-4 gap-2">
                {difficulties.map(d => (
                  <button
                    key={d.id}
                    onClick={() => toggleDifficulty(d.id)}
                    className={`py-2 rounded-sm text-[10px] font-bold transition-all ${
                      difficultyFilter.includes(d.id)
                        ? `${d.color} shadow-lg shadow-black/20`
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 h-10 text-xs font-bold"
                onClick={() => {
                  setPriceRange([0, 1500]);
                  setDifficultyFilter([]);
                }}
              >
                重置
              </Button>
              <Button 
                className="flex-1 h-10 text-xs font-bold"
                onClick={() => setShowFilters(false)}
              >
                确定
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 活动列表 */}
      <div className="px-4 py-6 grid grid-cols-2 gap-4">
        {activitiesData.map((activity) => (
          <ActivityCard key={activity.id} activity={activity as any} />
        ))}
      </div>

      {/* 空状态 */}
      {activitiesData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Target className="w-10 h-10 text-gray-600" />
          </div>
          <p className="text-gray-500 text-sm font-bold">暂无符合条件的活动</p>
        </div>
      )}
    </Layout>
  );
};

export default Category;
