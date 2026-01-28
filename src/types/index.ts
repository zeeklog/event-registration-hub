// 活动类型
export type ActivityType = 'rowing' | 'cycling' | 'camping';

// 活动场景
export type ActivityScene = 'event' | 'experience' | 'rental' | 'reservation';

// 活动难度
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';

// 订单状态
export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'reviewing';

// 活动数据接口
export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  scene: ActivityScene;
  difficulty?: DifficultyLevel;
  image: string;
  price: number;
  originalPrice?: number;
  location: string;
  distance?: number;
  date: string;
  time?: string;
  capacity: number;
  enrolled: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
  description?: string;
  deadline?: string;
  isHot?: boolean;
  isNew?: boolean;
}

// 轮播图数据
export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
  type: 'event' | 'promotion' | 'safety';
}

// 用户信息
export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
  level: 'normal' | 'silver' | 'gold' | 'diamond';
  points: number;
  emergencyContact?: {
    name: string;
    phone: string;
  };
}

// 订单信息
export interface Order {
  id: string;
  activityId: string;
  activity: Activity;
  status: OrderStatus;
  createTime: string;
  price: number;
  participants: number;
  verificationCode?: string;
  insurance?: boolean;
}

// 优惠券
export interface Coupon {
  id: string;
  name: string;
  discount: number;
  minPurchase: number;
  expiryDate: string;
  type: 'newUser' | 'discount' | 'fullReduction';
  isUsed: boolean;
}

// 通知消息
export interface Notification {
  id: string;
  type: 'system' | 'service' | 'safety' | 'customer';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
}

// 健康档案
export interface HealthRecord {
  id: string;
  userId: string;
  hasAllergy: boolean;
  allergyDescription?: string;
  hasMedicalHistory: boolean;
  medicalHistory?: string;
  exerciseRestrictions?: string;
  healthCertificate?: {
    url: string;
    uploadTime: string;
    expiryDate?: string;
  };
  lastUpdateTime: string;
}

// 赛事详情
export interface EventDetail {
  id: string;
  activityId: string;
  schedule: {
    time: string;
    content: string;
  }[];
  rules: string[];
  rewards: {
    rank: string;
    prize: string;
  }[];
  requirements: {
    age?: { min: number; max: number };
    qualification?: string;
    healthRequirements?: string[];
  };
  safetyMeasures: {
    insurance: string;
    emergencyContact: string;
    firstAidPoints: string[];
    coachQualification: string;
  };
  equipmentRequirements: {
    required: string[];
    recommended: string[];
    provided: string[];
  };
  checkInInfo: {
    location: string;
    time: string;
    materials: string[];
  };
}

// 承诺书类型
export interface Agreement {
  id: string;
  type: 'safety' | 'health';
  title: string;
  content: string[];
  mandatory: boolean;
}

// 赛事素材类型
export type MaterialType = 'image' | 'video';

export interface EventMaterial {
  id: string;
  type: MaterialType;
  url: string;
  thumbnail?: string; // 视频缩略图
  uploadTime: string;
  uploader?: string;
  isPendingDelete?: boolean; // 是否已申请删除
}

// 赛事素材集合
export interface EventMaterials {
  eventId: string;
  images: EventMaterial[];
  videos: EventMaterial[];
}

// 工单状态
export type TicketStatus = 'pending' | 'processing' | 'resolved' | 'closed';

// 工单信息
export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TicketStatus;
  createTime: string;
  updateTime?: string;
  images?: string[];
  replies?: TicketReply[];
}

// 工单回复
export interface TicketReply {
  id: string;
  content: string;
  time: string;
  sender: 'user' | 'support';
  senderName: string;
  avatar?: string;
}
