import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryNav } from '@/components/home/CategoryNav';
import { RecommendSection } from '@/components/home/RecommendSection';
import { MapPin, Flame, Clock } from 'lucide-react';
import { banners, activities, categoryScenes, categoryTypes, quickEntries } from '@/data/mockData';

const Index = () => {
  const nearbyActivities = [...activities].sort((a, b) => (a.distance || 999) - (b.distance || 999));
  const hotActivities = activities.filter(a => a.isHot || (a.rating && a.rating >= 4.8));
  const deadlineActivities = activities.filter(a => a.deadline);

  return (
    <Layout>
      {/* 轮播图 */}
      <HeroBanner banners={banners} />

      {/* 分类导航 */}
      <CategoryNav 
        scenes={categoryScenes}
        types={categoryTypes}
        quickEntries={quickEntries}
      />

      {/* 分割线 */}
      <div className="h-2 bg-navy-light border-y border-border" />

      {/* 附近活动 */}
      <RecommendSection 
        title="附近活动"
        icon={<MapPin className="w-5 h-5 text-action" />}
        activities={nearbyActivities}
        viewAllLink="/category?sort=distance"
      />

      {/* 分割线 */}
      <div className="h-2 bg-navy-light border-y border-border" />

      {/* 热门推荐 */}
      <RecommendSection 
        title="热门推荐"
        icon={<Flame className="w-5 h-5 text-red-500" />}
        activities={hotActivities}
        viewAllLink="/category?sort=hot"
      />

      {/* 分割线 */}
      <div className="h-2 bg-navy-light border-y border-border" />

      {/* 即将截止 */}
      {deadlineActivities.length > 0 && (
        <RecommendSection 
          title="即将截止"
          icon={<Clock className="w-5 h-5 text-eco" />}
          activities={deadlineActivities}
          viewAllLink="/category?sort=deadline"
        />
      )}
    </Layout>
  );
};

export default Index;
