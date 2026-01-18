import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActivityCard } from '@/components/activity/ActivityCard';
import { activities } from '@/data/mockData';
import { useState } from 'react';

const Favorites = () => {
  const navigate = useNavigate();
  // 模拟收藏数据 - 实际应从用户数据获取
  const [favorites] = useState(activities.slice(0, 3));

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
          <h1 className="text-lg font-semibold flex-1">我的收藏</h1>
        </div>
      </header>

      <div className="p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Heart className="w-12 h-12 mb-2 opacity-50" />
            <p>暂无收藏</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/category')}
            >
              去发现精彩活动
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favorites.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
