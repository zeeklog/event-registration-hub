import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { activities, orders } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const activity = activities.find(a => a.id === id);
  const order = orders.find(o => o.activityId === id && o.status === 'completed');

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <span className="text-4xl">😕</span>
          <p className="mt-2 text-muted-foreground">活动不存在</p>
          <Button onClick={() => navigate('/')} className="mt-4">返回首页</Button>
        </div>
      </div>
    );
  }

  const reviewTags = [
    '环境优美', '服务周到', '设施完善', '性价比高', 
    '教练专业', '安全可靠', '值得推荐', '体验很好'
  ];

  const handleImageUpload = () => {
    // 模拟图片上传
    const mockImage = `review-image-${Date.now()}.jpg`;
    if (uploadedImages.length < 9) {
      setUploadedImages(prev => [...prev, mockImage]);
      toast.success('图片上传成功');
    } else {
      toast.error('最多只能上传9张图片');
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(prev => prev.filter(t => t !== tag));
    } else {
      if (tags.length < 3) {
        setTags(prev => [...prev, tag]);
      } else {
        toast.error('最多只能选择3个标签');
      }
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('请选择评分');
      return;
    }
    if (!content.trim()) {
      toast.error('请填写评价内容');
      return;
    }
    toast.success('评价提交成功，感谢您的反馈！');
    navigate(`/activity/${id}`);
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
          <h1 className="text-lg font-semibold flex-1">评价活动</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 活动信息 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground line-clamp-2">{activity.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.date} {activity.time}
                </p>
                {order && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    已完成
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 评分 */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-sm mb-3 block">总体评分</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors",
                      star <= (hoverRating || rating)
                        ? "fill-warning text-warning"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating === 5 ? '非常满意' : 
                   rating === 4 ? '满意' : 
                   rating === 3 ? '一般' : 
                   rating === 2 ? '不满意' : '非常不满意'}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 评价标签 */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-sm mb-3 block">评价标签（可选，最多3个）</Label>
            <div className="flex flex-wrap gap-2">
              {reviewTags.map(tag => (
                <Badge
                  key={tag}
                  variant={tags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 评价内容 */}
        <Card>
          <CardContent className="p-4">
            <Label htmlFor="review-content" className="text-sm mb-2 block">
              评价内容 <span className="text-muted-foreground">（必填）</span>
            </Label>
            <Textarea
              id="review-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享您的活动体验，帮助其他用户更好地了解这个活动..."
              className="min-h-32"
              maxLength={500}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                评价内容将公开显示，请文明用语
              </p>
              <span className="text-xs text-muted-foreground">
                {content.length}/500
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 图片上传 */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-sm mb-3 block">上传图片（可选，最多9张）</Label>
            <div className="grid grid-cols-3 gap-2">
              {uploadedImages.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD48L3N2Zz4=`}
                    alt={`上传图片 ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {uploadedImages.length < 9 && (
                <button
                  onClick={handleImageUpload}
                  className="aspect-square border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors"
                >
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">上传</span>
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <Button className="w-full" onClick={handleSubmit}>
          提交评价
        </Button>

        {/* 提示 */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">
              💡 评价成功后可获得20积分奖励，优质评价还有机会获得额外奖励！
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Review;
