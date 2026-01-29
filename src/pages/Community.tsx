import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Plus, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Tag as TagIcon,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import { mockCommunityPosts, mockCommunityActivities } from '@/data/mockData';
import { CommunityPost, CommunityActivity } from '@/types';
import { toast } from '@/components/ui/use-toast';

const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [activities] = useState<CommunityActivity[]>(mockCommunityActivities);
  const [isPosting, setIsPosting] = useState(false);
  
  // 发帖表单状态
  const [newPost, setNewPost] = useState({
    content: '',
    tags: [] as string[],
    images: [] as string[],
    video: ''
  });

  const availableTags = ['减碳', '深潜第二节松山湖马拉松', '小铁三', '赛艇日常', '备赛打卡', '周末运动'];

  const renderPostCard = (post: CommunityPost) => (
    <Card key={post.id} className="overflow-hidden border-none shadow-sm bg-card/50 backdrop-blur-sm">
      <CardHeader className="p-4 pb-2 space-y-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.userAvatar} />
              <AvatarFallback>{post.userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold">{post.userName}</p>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm mb-3 whitespace-pre-wrap">{post.content}</p>
        
        {post.images && post.images.length > 0 && (
          <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt="post" 
                className="rounded-lg object-cover w-full h-48" 
              />
            ))}
          </div>
        )}

        {post.video && (
          <div className="relative rounded-lg overflow-hidden bg-black mb-3 aspect-video">
            <video src={post.video} className="w-full h-full" controls />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-1">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs text-action font-medium">#{tag}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-border/50 flex justify-around">
        <Button variant="ghost" size="sm" className={`gap-2 ${post.isLiked ? 'text-red-500' : ''}`}>
          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments}</span>
        </Button>
      </CardFooter>
    </Card>
  );

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast({
        title: "请输入内容",
        variant: "destructive",
      });
      return;
    }

    const post: CommunityPost = {
      id: `post${posts.length + 1}`,
      userId: 'user1',
      userName: '户外达人',
      userAvatar: undefined,
      content: newPost.content,
      images: newPost.images.length > 0 ? newPost.images : undefined,
      video: newPost.video || undefined,
      tags: newPost.tags,
      likes: 0,
      comments: 0,
      time: '刚刚',
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', tags: [], images: [], video: '' });
    setIsPosting(false);
    toast({
      title: "发布成功",
      description: "您的帖子已发布到社区",
    });
  };

  const toggleTag = (tag: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // 模拟上传图片
  const simulateUploadImage = () => {
    const imageUrl = "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80";
    setNewPost(prev => ({
      ...prev,
      images: [...prev.images, imageUrl]
    }));
    toast({ title: "图片已添加（模拟）" });
  };

  // 模拟上传视频
  const simulateUploadVideo = () => {
    const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    setNewPost(prev => ({
      ...prev,
      video: videoUrl
    }));
    toast({ title: "视频已添加（模拟）" });
  };

  return (
    <Layout showHeader={false}>
      <div className="pb-20">
        <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">社区</h1>
          <Dialog open={isPosting} onOpenChange={setIsPosting}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full gap-1">
                <Plus className="w-4 h-4" />
                <span>发布</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>发布动态</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea 
                  placeholder="分享你的运动生活..." 
                  className="min-h-[120px] resize-none"
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <TagIcon className="w-4 h-4" />
                    <span>选择标签</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={newPost.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={simulateUploadImage}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>图片</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={simulateUploadVideo}
                    disabled={!!newPost.video}
                  >
                    <VideoIcon className="w-4 h-4" />
                    <span>视频</span>
                  </Button>
                </div>

                {newPost.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {newPost.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {newPost.video && (
                  <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black">
                    <video src={newPost.video} className="w-full h-full" controls />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleCreatePost} className="w-full">发布</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b h-12 bg-transparent p-0">
            <TabsTrigger 
              value="posts" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-action data-[state=active]:bg-transparent data-[state=active]:shadow-none h-full"
            >
              社区动态
            </TabsTrigger>
            {/* <TabsTrigger 
              value="activities" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-action data-[state=active]:bg-transparent data-[state=active]:shadow-none h-full"
            >
              赛艇活动
            </TabsTrigger> */}
            <TabsTrigger 
              value="my-posts" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-action data-[state=active]:bg-transparent data-[state=active]:shadow-none h-full"
            >
              我的发布
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="p-4 space-y-4">
            {posts.map(renderPostCard)}
          </TabsContent>

          <TabsContent value="my-posts" className="p-4 space-y-4">
            {posts.filter(p => p.userId === 'user1').length > 0 ? (
              posts.filter(p => p.userId === 'user1').map(renderPostCard)
            ) : (
              <div className="py-20 text-center text-muted-foreground">
                <p>暂无发布动态</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-action"
                  onClick={() => setIsPosting(true)}
                >
                  去发布第一条动态
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activities" className="p-4 space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <div className="relative aspect-[16/9]">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover" 
                  />
                  <Badge 
                    className="absolute top-3 right-3" 
                    variant={activity.status === 'ongoing' ? 'default' : activity.status === 'upcoming' ? 'secondary' : 'outline'}
                  >
                    {activity.status === 'ongoing' ? '进行中' : activity.status === 'upcoming' ? '招募中' : '已结束'}
                  </Badge>
                </div>
                <CardHeader className="p-4">
                  <h3 className="font-bold text-lg">{activity.title}</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>已报名 {activity.participants} 人</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" variant={activity.status === 'ended' ? 'secondary' : 'default'}>
                    {activity.status === 'ended' ? '查看详情' : '立即报名'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
