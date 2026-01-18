import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const Reviews = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // 模拟评价数据
  const reviews = [
    {
      id: '1',
      activityId: '1',
      activityTitle: '2026年度城市赛艇锦标赛',
      activityImage: '/src/assets/rowing-event.jpg',
      rating: 5,
      content: '非常棒的活动！教练专业，环境优美，体验感很好。下次还会参加！',
      images: [],
      tags: ['环境优美', '教练专业', '值得推荐'],
      date: '2026-02-20',
      status: 'published',
    },
    {
      id: '2',
      activityId: '3',
      activityTitle: '星空露营·亲子之旅',
      activityImage: '/src/assets/camping-site.jpg',
      rating: 4,
      content: '整体不错，适合带小朋友去。就是晚上有点冷，建议多带保暖衣物。',
      images: ['image1.jpg', 'image2.jpg'],
      tags: ['环境优美', '适合亲子'],
      date: '2026-02-18',
      status: 'published',
    },
  ];

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === activeTab);

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
          <h1 className="text-lg font-semibold flex-1">我的评价</h1>
        </div>

        {/* 状态筛选 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full h-auto p-0 bg-transparent justify-start overflow-x-auto border-b border-border">
            <TabsTrigger 
              value="all"
              className="flex-1 min-w-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              全部 ({reviews.length})
            </TabsTrigger>
            <TabsTrigger 
              value="published"
              className="flex-1 min-w-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              已发布 ({reviews.filter(r => r.status === 'published').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* 评价列表 */}
      <div className="p-4 space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Star className="w-12 h-12 mb-2 opacity-50" />
            <p>暂无评价</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/profile/orders?status=completed')}
            >
              去评价已完成的活动
            </Button>
          </div>
        ) : (
          filteredReviews.map(review => (
            <Card key={review.id}>
              <CardContent className="p-4">
                {/* 活动信息 */}
                <div 
                  className="flex gap-3 mb-3 cursor-pointer"
                  onClick={() => navigate(`/activity/${review.activityId}`)}
                >
                  <img 
                    src={review.activityImage} 
                    alt={review.activityTitle}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2">{review.activityTitle}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-3 h-3",
                            star <= review.rating
                              ? "fill-warning text-warning"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{review.rating}.0</span>
                    </div>
                  </div>
                </div>

                {/* 评价内容 */}
                <p className="text-sm text-foreground mb-2">{review.content}</p>

                {/* 评价标签 */}
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {review.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* 评价图片 */}
                {review.images && review.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {review.images.map((img, index) => (
                      <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground opacity-50" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 评价时间 */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                  {review.status === 'published' && (
                    <Badge variant="outline" className="text-xs">已发布</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
