import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Shield, 
  AlertTriangle,
  ChevronRight,
  Phone,
  Map,
  Package,
  FileText,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { activities, agreements, eventDetails, mockActivityReviews } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSafetyDialog, setShowSafetyDialog] = useState(false);
  const [safetyAgreed, setSafetyAgreed] = useState(false);
  const [showHealthDialog, setShowHealthDialog] = useState(false);
  const [healthAgreed, setHealthAgreed] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [participants, setParticipants] = useState(1);
  
  // 专项状态
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedBoat, setSelectedBoat] = useState<string>('');
  const [needSafetyTraining, setNeedSafetyTraining] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedBikeType, setSelectedBikeType] = useState<string>('');
  const [rentalDuration, setRentalDuration] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [insuranceAmount, setInsuranceAmount] = useState('standard');
  const [selectedCampsite, setSelectedCampsite] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);

  const activity = activities.find(a => a.id === id);
  const details = eventDetails.find(d => d.activityId === id);
  const reviews = mockActivityReviews.filter(r => r.activityId === id);

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy">
        <div className="text-center">
          <span className="text-4xl">😕</span>
          <p className="mt-2 text-gray-400">活动不存在</p>
          <Button onClick={() => navigate('/')} className="mt-4">返回首页</Button>
        </div>
      </div>
    );
  }

  const spotsLeft = activity.capacity - activity.enrolled;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rowing': return 'bg-action';
      case 'cycling': return 'bg-points-sports';
      case 'camping': return 'bg-eco text-navy';
      default: return 'bg-action';
    }
  };

  // 专项选项数据
  const getRowingOptions = () => {
    if (activity.type !== 'rowing') return null;
    return {
      timeSlots: [
        { id: 'morning', label: '上午 10:00-12:00', available: true },
        { id: 'afternoon', label: '下午 14:00-16:00', available: true },
        { id: 'evening', label: '傍晚 17:00-19:00', available: false },
      ],
      boats: [
        { id: 'single', label: '单人艇', capacity: 1, price: 0 },
        { id: 'double', label: '双人艇', capacity: 2, price: 50 },
        { id: 'quad', label: '四人艇', capacity: 4, price: 100 },
      ],
      equipment: [
        { id: 'lifejacket', label: '救生衣', price: 20 },
        { id: 'shoes', label: '防滑鞋', price: 15 },
        { id: 'paddle', label: '备用桨', price: 10 },
      ],
    };
  };

  const getCyclingOptions = () => {
    if (activity.type !== 'cycling') return null;
    return {
      bikeTypes: [
        { id: 'road', label: '公路车', price: 0 },
        { id: 'mountain', label: '山地车', price: 20 },
        { id: 'folding', label: '折叠车', price: -10 },
      ],
      durations: [
        { id: 'hour', label: '按小时', price: 0 },
        { id: 'day', label: '按天', price: 0 },
        { id: 'week', label: '按周', price: -50 },
      ],
      pickupLocations: [
        { id: 'base', label: '基地自提' },
        { id: 'delivery', label: '配送到家（+30元）' },
      ],
      equipment: [
        { id: 'helmet', label: '头盔', price: 0, required: true },
        { id: 'lock', label: '车锁', price: 10 },
        { id: 'light', label: '车灯', price: 15 },
        { id: 'clothing', label: '骑行服', price: 30 },
      ],
      insuranceOptions: [
        { id: 'standard', label: '标准保险（已包含）', amount: 0 },
        { id: 'premium', label: '高级保险（+50元）', amount: 50 },
      ],
    };
  };

  const getCampingOptions = () => {
    if (activity.type !== 'camping') return null;
    return {
      campsites: [
        { id: 'tent', label: '帐篷位', capacity: 4, price: 0 },
        { id: 'rv', label: '房车营位', capacity: 6, price: 200 },
        { id: 'cabin', label: '木屋', capacity: 4, price: 400 },
      ],
      services: [
        { id: 'food', label: '烧烤套餐（2-4人）', price: 199 },
        { id: 'equipment', label: '露营装备租赁', price: 150 },
        { id: 'activity', label: '亲子活动', price: 99 },
      ],
    };
  };

  const calculateTotalPrice = () => {
    let basePrice = activity.price * participants;
    let extraPrice = 0;
    
    if (activity.type === 'rowing') {
      const rowingOpts = getRowingOptions();
      const selectedBoatData = rowingOpts?.boats.find(b => b.id === selectedBoat);
      if (selectedBoatData) extraPrice += selectedBoatData.price;
      selectedEquipment.forEach(eqId => {
        const eq = rowingOpts?.equipment.find(e => e.id === eqId);
        if (eq) extraPrice += eq.price;
      });
    } else if (activity.type === 'cycling') {
      const cyclingOpts = getCyclingOptions();
      const selectedBikeData = cyclingOpts?.bikeTypes.find(b => b.id === selectedBikeType);
      if (selectedBikeData) extraPrice += selectedBikeData.price;
      if (pickupLocation === 'delivery') extraPrice += 30;
      selectedEquipment.forEach(eqId => {
        const eq = cyclingOpts?.equipment.find(e => e.id === eqId);
        if (eq && !eq.required) extraPrice += eq.price;
      });
      if (insuranceAmount === 'premium') extraPrice += 50;
    } else if (activity.type === 'camping') {
      const campingOpts = getCampingOptions();
      const selectedSiteData = campingOpts?.campsites.find(s => s.id === selectedCampsite);
      if (selectedSiteData) extraPrice += selectedSiteData.price;
      selectedServices.forEach(serviceId => {
        const service = campingOpts?.services.find(s => s.id === serviceId);
        if (service) extraPrice += service.price;
      });
    }
    
    return basePrice + extraPrice;
  };
  
  const totalPrice = calculateTotalPrice();

  const handleBook = () => {
    if (activity.type === 'rowing' && activity.scene === 'experience' && (!selectedTimeSlot || !selectedBoat)) {
        toast.error('请选择时段和器材类型');
        return;
      }
    if (activity.type === 'cycling' && activity.scene === 'rental' && (!selectedBikeType || !rentalDuration || !pickupLocation)) {
        toast.error('请完成器材和租赁信息选择');
        return;
      }
    if (activity.type === 'camping' && (!selectedCampsite || !checkInDate || !checkOutDate)) {
        toast.error('请选择营位和入住/离店时间');
        return;
      }
    if (!safetyAgreed) {
      setShowSafetyDialog(true);
      return;
    }
    if (!healthAgreed) {
      setShowHealthDialog(true);
      return;
    }
    setShowBookingDialog(true);
  };

  const confirmBooking = () => {
    toast.success('预约成功！');
    setShowBookingDialog(false);
    navigate('/profile/orders');
  };

  const toggleService = (id: string) => {
    if (activity.type === 'camping') {
      setSelectedServices(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setSelectedEquipment(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground">
      {/* 顶部图片 */}
      <div className="relative">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full aspect-[4/3] object-cover"
        />
        
        {/* 顶部导航 */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="glass hover:bg-black/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glass hover:bg-black/20"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("w-5 h-5", isFavorite ? "fill-red-500 text-red-500" : "text-white")} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="glass hover:bg-black/20"
              onClick={() => toast.info('分享功能即将上线')}
            >
              <Share2 className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>

        {/* 类型标签 */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge className={cn("text-xs font-bold border-0 h-6", getTypeColor(activity.type))}>
            {activity.type === 'rowing' ? '赛艇' : activity.type === 'cycling' ? '骑行' : '露营'}
          </Badge>
          {activity.isHot && <Badge className="bg-red-500 text-white border-0 h-6 font-bold">热门</Badge>}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-4 py-6 space-y-6">
        {/* 标题和价格 */}
        <div>
          <h1 className="text-2xl font-bold text-foreground leading-tight">{activity.title}</h1>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-3xl font-bold text-action">¥{activity.price}</span>
            <span className="text-sm text-muted-foreground font-medium">/人起</span>
            {activity.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">¥{activity.originalPrice}</span>
            )}
          </div>
        </div>

        {/* 基本信息卡片 */}
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium">
              <MapPin className="w-5 h-5 text-action" />
              <span className="flex-1 text-foreground">{activity.location}</span>
              {activity.distance && (
                <span className="text-action">{activity.distance}km</span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <Clock className="w-5 h-5 text-eco" />
              <span className="text-foreground">{activity.date} {activity.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">已报名 {activity.enrolled}/{activity.capacity} 人</span>
              <span className={cn("ml-auto font-bold", spotsLeft < 10 ? "text-red-500" : "text-eco")}>
                剩 {spotsLeft} 位
              </span>
            </div>
            {activity.rating && (
              <div className="flex items-center gap-3 text-sm font-medium border-t border-border pt-4">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="text-foreground font-bold">{activity.rating}</span>
                {activity.reviews && <span className="text-muted-foreground">({activity.reviews}条评价)</span>}
                <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* 专项预订选项 */}
        {(activity.type === 'rowing' || activity.type === 'cycling' || activity.type === 'camping') && (
          <Card className="bg-card border-border overflow-hidden">
            <div className="px-4 py-4 border-b border-border flex items-center gap-2">
              <Package className="w-5 h-5 text-action" />
              <h3 className="font-bold text-foreground text-base">预订配置</h3>
            </div>
            <CardContent className="p-4 space-y-6">
              {/* 赛艇专项 */}
              {activity.type === 'rowing' && (
                <>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-muted-foreground">选择时段</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {getRowingOptions()?.timeSlots.map(slot => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          disabled={!slot.available}
                          className={cn(
                            "p-3 rounded-md border text-left transition-all",
                            selectedTimeSlot === slot.id
                              ? "border-action bg-action/10"
                              : "border-border bg-muted hover:border-action",
                            !slot.available && "opacity-40 cursor-not-allowed grayscale"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-foreground">{slot.label}</span>
                            {!slot.available && <Badge variant="outline" className="text-[10px] h-5 border-border text-muted-foreground">已满额</Badge>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-muted-foreground">器材规格</Label>
                    <RadioGroup value={selectedBoat} onValueChange={setSelectedBoat} className="grid grid-cols-1 gap-2">
                      {getRowingOptions()?.boats.map(boat => (
                        <div key={boat.id} className={cn(
                          "flex items-center space-x-3 p-3 rounded-md border transition-all cursor-pointer",
                          selectedBoat === boat.id ? "border-action bg-action/10" : "border-border bg-muted"
                        )} onClick={() => setSelectedBoat(boat.id)}>
                          <RadioGroupItem value={boat.id} id={boat.id} className="border-border text-action" />
                          <Label htmlFor={boat.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-foreground">{boat.label} <span className="text-[10px] text-muted-foreground ml-1">({boat.capacity}人)</span></span>
                              {boat.price > 0 && <span className="text-xs font-bold text-action">+¥{boat.price}</span>}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              )}

              {/* 骑行专项 */}
              {activity.type === 'cycling' && (
                <>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-muted-foreground">车辆型号</Label>
                    <RadioGroup value={selectedBikeType} onValueChange={setSelectedBikeType} className="grid grid-cols-2 gap-2">
                      {getCyclingOptions()?.bikeTypes.map(bike => (
                        <div key={bike.id} className={cn(
                          "flex items-center space-x-3 p-3 rounded-md border transition-all cursor-pointer",
                          selectedBikeType === bike.id ? "border-action bg-action/10" : "border-border bg-muted"
                        )} onClick={() => setSelectedBikeType(bike.id)}>
                          <RadioGroupItem value={bike.id} id={bike.id} className="border-border text-action" />
                          <Label htmlFor={bike.id} className="text-xs font-bold text-foreground flex-1 cursor-pointer">
                            {bike.label}
                            {bike.price !== 0 && <span className="block text-[10px] text-action">{bike.price > 0 ? `+¥${bike.price}` : `-¥${Math.abs(bike.price)}`}</span>}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              )}

              {/* 露营专项 */}
              {activity.type === 'camping' && (
                <>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-muted-foreground">入住配置</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-[10px] text-muted-foreground block mb-1">入住日期</Label>
                        <Input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="bg-muted border-border text-foreground text-xs h-9" />
                      </div>
                      <div>
                        <Label className="text-[10px] text-muted-foreground block mb-1">离店日期</Label>
                        <Input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="bg-muted border-border text-foreground text-xs h-9" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* 详情选项卡 */}
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="w-full bg-muted border border-border h-12 p-1 rounded-md">
            <TabsTrigger value="intro" className="flex-1 text-xs font-bold data-[state=active]:bg-action data-[state=active]:text-white">详情</TabsTrigger>
            <TabsTrigger value="notice" className="flex-1 text-xs font-bold data-[state=active]:bg-action data-[state=active]:text-white">须知</TabsTrigger>
            <TabsTrigger value="equipment" className="flex-1 text-xs font-bold data-[state=active]:bg-action data-[state=active]:text-white">装备</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1 text-xs font-bold data-[state=active]:bg-action data-[state=active]:text-white">评价</TabsTrigger>
          </TabsList>
          <TabsContent value="intro" className="mt-6 animate-in fade-in duration-300 space-y-8">
            <div className="space-y-4">
              <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <FileText className="w-4 h-4 text-action" />
                活动介绍
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium whitespace-pre-wrap">
                {activity.description || '暂无详细介绍'}
              </p>
            </div>

            {details?.schedule && (
              <div className="space-y-4">
                <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-eco" />
                  活动流程
                </h4>
                <div className="space-y-4 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                  {details.schedule.map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-eco z-10" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-eco uppercase tracking-widest">{item.time}</span>
                        <span className="text-sm font-bold text-foreground">{item.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <Shield className="w-4 h-4 text-action" />
                活动亮点
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {activity.tags?.map(tag => (
                  <div key={tag} className="flex items-center gap-2 p-3 bg-muted/50 rounded-sm border border-border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-eco" />
                    <span className="text-[11px] text-foreground font-black uppercase tracking-wider">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notice" className="mt-6 animate-in fade-in duration-300 space-y-8">
            {details?.requirements && (
              <div className="space-y-4">
                <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  准入要求
                </h4>
                <Card className="bg-muted/30 border-border">
                  <CardContent className="p-4 space-y-3">
                    {details.requirements.age && (
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-muted-foreground">年龄限制</span>
                        <span className="text-foreground">{details.requirements.age.min}-{details.requirements.age.max}岁</span>
                      </div>
                    )}
                    {details.requirements.qualification && (
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-muted-foreground">资格证书</span>
                        <span className="text-foreground">{details.requirements.qualification}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">健康要求</p>
                      <ul className="space-y-1.5">
                        {details.requirements.healthRequirements?.map((req, i) => (
                          <li key={i} className="text-xs font-medium text-foreground/80 flex gap-2">
                            <span className="text-action">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {details?.safetyMeasures && (
              <div className="space-y-4">
                <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-eco" />
                  安全保障
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-muted/30 rounded-sm border border-border flex items-start gap-3">
                    <div className="p-2 rounded-sm bg-eco/10 text-eco">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-foreground uppercase tracking-wider">保险覆盖</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-1">{details.safetyMeasures.insurance}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-sm border border-border flex items-start gap-3">
                    <div className="p-2 rounded-sm bg-action/10 text-action">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-foreground uppercase tracking-wider">专业人员</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-1">{details.safetyMeasures.coachQualification}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="equipment" className="mt-6 animate-in fade-in duration-300 space-y-8">
            {details?.equipmentRequirements && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                    <Package className="w-4 h-4 text-action" />
                    强制携带
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {details.equipmentRequirements.required.map(item => (
                      <Badge key={item} variant="outline" className="border-red-500/50 text-red-500 bg-red-500/5 rounded-sm px-3 py-1 text-xs font-bold">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-eco" />
                    建议携带
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {details.equipmentRequirements.recommended.map(item => (
                      <Badge key={item} variant="outline" className="border-eco/50 text-eco bg-eco/5 rounded-sm px-3 py-1 text-xs font-bold">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    官方提供
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {details.equipmentRequirements.provided.map(item => (
                      <Badge key={item} variant="outline" className="border-muted-foreground/50 text-muted-foreground rounded-sm px-3 py-1 text-xs font-bold">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 animate-in fade-in duration-300 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="text-xl font-black text-foreground">{activity.rating}</span>
                <span className="text-xs text-muted-foreground font-bold">({activity.reviews}条评价)</span>
              </div>
              <Button variant="ghost" size="sm" className="text-action font-black text-[10px] uppercase tracking-widest" onClick={() => navigate(`/activity/${id}/review`)}>
                我要评价
              </Button>
            </div>

            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="space-y-3 pb-6 border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-border p-0.5 overflow-hidden">
                        <img src={review.avatar} alt={review.userName} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-foreground leading-none">{review.userName}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-2.5 h-2.5", i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground")} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                    {review.content}
                  </p>
                  {review.images && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                      {review.images.map((img, i) => (
                        <div key={i} className="w-24 h-24 rounded-sm border border-border overflow-hidden shrink-0">
                          <img src={img} alt="review" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {review.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 紧急联系卡片 */}
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-foreground">一键应急联系</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:bg-red-500/10 font-bold text-xs" onClick={() => window.location.href = 'tel:110'}>
              立即呼叫 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 底部预约栏 - 玻璃拟态 */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-border p-4 max-w-lg mx-auto z-50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <button onClick={() => setParticipants(Math.max(1, participants - 1))} className="w-7 h-7 rounded-sm bg-muted flex items-center justify-center text-foreground border border-border hover:bg-accent">-</button>
              <span className="w-6 text-center text-foreground font-bold text-base">{participants}</span>
              <button onClick={() => setParticipants(Math.min(spotsLeft, participants + 1))} className="w-7 h-7 rounded-sm bg-action flex items-center justify-center text-white shadow-lg shadow-action/20 hover:bg-action/90">+</button>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[10px] text-muted-foreground font-bold">总计</span>
              <span className="text-xl font-bold text-action">¥{totalPrice}</span>
            </div>
          </div>
          <Button 
            className="h-12 px-10 rounded-sm font-bold text-base"
            disabled={spotsLeft === 0}
            onClick={handleBook}
          >
            {spotsLeft === 0 ? '名额已满' : '确认报名'}
          </Button>
        </div>
      </div>

      {/* 安全承诺书弹窗 */}
      <Dialog open={showSafetyDialog} onOpenChange={setShowSafetyDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5 text-action" />
              运动安全协议
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground max-h-[50vh] overflow-y-auto space-y-4 font-medium py-4">
            {agreements.find(a => a.type === 'safety')?.content.map((item, index) => (
              <p key={index} className="leading-relaxed">{item}</p>
            ))}
          </div>
          <div className="flex items-start gap-3 p-4 bg-action/5 rounded-md border border-action/20 mt-4">
            <Checkbox id="safety" checked={safetyAgreed} onCheckedChange={(c) => setSafetyAgreed(!!c)} className="border-border data-[state=checked]:bg-action mt-1" />
            <label htmlFor="safety" className="text-xs font-bold text-muted-foreground leading-normal cursor-pointer">
              我已仔细阅读并同意上述所有条款，本人承诺遵守安全规则。
            </label>
          </div>
          <DialogFooter className="flex gap-3 pt-6">
            <Button variant="outline" className="flex-1" onClick={() => setShowSafetyDialog(false)}>拒绝</Button>
            <Button className="flex-1" disabled={!safetyAgreed} onClick={() => { setShowSafetyDialog(false); setShowHealthDialog(true); }}>同意并继续</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 健康承诺书弹窗 */}
      <Dialog open={showHealthDialog} onOpenChange={setShowHealthDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-red-500" />
              健康告知书
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground max-h-[50vh] overflow-y-auto space-y-4 font-medium py-4">
            {agreements.find(a => a.type === 'health')?.content.map((item, index) => (
              <p key={index} className="leading-relaxed">{item}</p>
            ))}
          </div>
          <div className="flex items-start gap-3 p-4 bg-red-500/5 rounded-md border border-red-500/20 mt-4">
            <Checkbox id="health" checked={healthAgreed} onCheckedChange={(c) => setHealthAgreed(!!c)} className="border-border data-[state=checked]:bg-red-500 mt-1" />
            <label htmlFor="health" className="text-xs font-bold text-muted-foreground leading-normal cursor-pointer">
              我承诺本人身体状况符合活动要求，无重大病史或健康风险。
            </label>
          </div>
          <DialogFooter className="flex gap-3 pt-6">
            <Button variant="outline" className="flex-1" onClick={() => setShowHealthDialog(false)}>暂不同意</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600 border-0" disabled={!healthAgreed} onClick={() => { setShowHealthDialog(false); setShowBookingDialog(true); }}>本人确认</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 预约确认弹窗 */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="bg-card border-border text-foreground max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">核对预约信息</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-muted-foreground">项目</span>
              <span className="text-foreground text-right ml-4">{activity.title}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-muted-foreground">人数</span>
              <span className="text-foreground">{participants}人</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-muted-foreground">费用总计</span>
              <span className="text-xl text-action">¥{totalPrice}</span>
            </div>
          </div>
          <DialogFooter className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowBookingDialog(false)}>返回修改</Button>
            <Button className="flex-1" onClick={confirmBooking}>立即支付</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityDetail;
