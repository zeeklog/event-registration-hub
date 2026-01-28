import { Activity, Banner, Order, Coupon, Notification, User, HealthRecord, EventDetail, Agreement, EventMaterials } from '@/types';
import rowingEvent from '@/assets/rowing-event.jpg';
import cyclingEvent from '@/assets/cycling-event.jpg';
import campingSite from '@/assets/camping-site.jpg';
import heroBanner from '@/assets/hero-banner.jpg';

export const banners: Banner[] = [
  {
    id: '1',
    image: heroBanner,
    title: '2026年度赛艇锦标赛',
    subtitle: '专业赛事·荣誉之战',
    type: 'event',
    link: '/activity/1',
  },
  {
    id: '2',
    image: campingSite,
    title: '限时新人礼包',
    subtitle: '首次预约立减50元',
    type: 'promotion',
  },
  {
    id: '3',
    image: cyclingEvent,
    title: '户外安全提示',
    subtitle: '户外活动需实名认证',
    type: 'safety',
  },
];

export const activities: Activity[] = [
  {
    id: '1',
    title: '2026年度城市赛艇锦标赛',
    type: 'rowing',
    scene: 'event',
    difficulty: 'professional',
    image: rowingEvent,
    price: 299,
    originalPrice: 399,
    location: '杭州西湖水上运动中心',
    distance: 3.2,
    date: '2026-03-15',
    time: '09:00',
    capacity: 100,
    enrolled: 78,
    rating: 4.9,
    reviews: 156,
    tags: ['专业赛事', '奖金丰厚'],
    description: '专业级赛艇竞速赛，面向具有赛艇资质证书的选手',
    deadline: '2026-03-10',
    isHot: true,
  },
  {
    id: '2',
    title: '环湖山地自行车挑战赛',
    type: 'cycling',
    scene: 'event',
    difficulty: 'advanced',
    image: cyclingEvent,
    price: 199,
    originalPrice: 249,
    location: '千岛湖骑行基地',
    distance: 15.5,
    date: '2026-03-22',
    time: '07:30',
    capacity: 200,
    enrolled: 145,
    rating: 4.8,
    reviews: 89,
    tags: ['山地越野', '风景优美'],
    description: '50公里环湖骑行，沿途风光无限',
    deadline: '2026-03-18',
    isHot: true,
  },
  {
    id: '3',
    title: '星空露营·亲子之旅',
    type: 'camping',
    scene: 'reservation',
    difficulty: 'beginner',
    image: campingSite,
    price: 499,
    originalPrice: 599,
    location: '安吉山野营地',
    distance: 45,
    date: '2026-03-16',
    capacity: 30,
    enrolled: 22,
    rating: 4.9,
    reviews: 234,
    tags: ['亲子活动', '观星体验'],
    description: '专业领队带队，含帐篷设备，适合家庭出行',
    isNew: true,
  },
  {
    id: '4',
    title: '赛艇初级体验课程',
    type: 'rowing',
    scene: 'experience',
    difficulty: 'beginner',
    image: rowingEvent,
    price: 168,
    location: '钱塘江水上运动中心',
    distance: 5.8,
    date: '每周六日',
    time: '10:00-12:00',
    capacity: 20,
    enrolled: 8,
    rating: 4.7,
    reviews: 56,
    tags: ['零基础', '教练指导'],
    description: '专业教练1对4指导，含安全培训和装备',
  },
  {
    id: '5',
    title: '公路自行车日租',
    type: 'cycling',
    scene: 'rental',
    difficulty: 'beginner',
    image: cyclingEvent,
    price: 88,
    location: '城市骑行驿站',
    distance: 1.2,
    date: '全年可租',
    capacity: 50,
    enrolled: 0,
    rating: 4.6,
    reviews: 128,
    tags: ['自由骑行', '多车型可选'],
    description: '高品质公路车，含头盔和锁，支持自提或配送',
  },
  {
    id: '6',
    title: '豪华木屋露营体验',
    type: 'camping',
    scene: 'reservation',
    difficulty: 'beginner',
    image: campingSite,
    price: 899,
    originalPrice: 1099,
    location: '莫干山度假营地',
    distance: 68,
    date: '周末可预约',
    capacity: 10,
    enrolled: 6,
    rating: 4.95,
    reviews: 312,
    tags: ['精品木屋', '含早餐'],
    description: '独立木屋，配套卫浴，含烧烤晚餐和早餐',
    isHot: true,
  },
];

export const currentUser: User = {
  id: 'user1',
  name: '户外达人',
  phone: '138****8888',
  avatar: undefined,
  isVerified: true,
  level: 'gold',
  points: 2580,
  emergencyContact: {
    name: '紧急联系人',
    phone: '139****9999',
  },
};

export const orders: Order[] = [
  {
    id: 'ORD001',
    activityId: '1',
    activity: activities[0],
    status: 'confirmed',
    createTime: '2026-02-20 14:30',
    price: 299,
    participants: 1,
    verificationCode: 'VER123456',
    insurance: true,
  },
  {
    id: 'ORD002',
    activityId: '3',
    activity: activities[2],
    status: 'pending',
    createTime: '2026-02-22 10:15',
    price: 998,
    participants: 2,
    verificationCode: 'VER789012',
    insurance: true,
  },
];

export const coupons: Coupon[] = [
  {
    id: 'cp1',
    name: '新人专享券',
    discount: 50,
    minPurchase: 200,
    expiryDate: '2026-04-01',
    type: 'newUser',
    isUsed: false,
  },
  {
    id: 'cp2',
    name: '赛事报名满减券',
    discount: 30,
    minPurchase: 300,
    expiryDate: '2026-03-31',
    type: 'fullReduction',
    isUsed: false,
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'system',
    title: '报名成功提醒',
    content: '您已成功报名"2026年度城市赛艇锦标赛"，请于活动当天提前30分钟到达现场。',
    time: '2026-02-20 14:35',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'safety',
    title: '天气预警提醒',
    content: '您预约的3月15日活动当天可能有小雨，请关注天气变化并做好防雨准备。',
    time: '2026-02-21 09:00',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'service',
    title: '积分到账通知',
    content: '恭喜您获得100积分奖励！当前积分余额：2580',
    time: '2026-02-19 16:20',
    isRead: true,
  },
];

export const categoryScenes = [
  { id: 'event', name: '赛事报名', icon: 'Trophy' },
  { id: 'experience', name: '体验预约', icon: 'Target' },
  { id: 'reservation', name: '露营预订', icon: 'Tent' },
  { id: 'rental', name: '器材租赁', icon: 'Package' },
];

export const categoryTypes = [
  { id: 'rowing', name: '赛艇', icon: 'Waves', color: 'rowing' },
  { id: 'cycling', name: '自行车', icon: 'Bike', color: 'cycling' },
  { id: 'camping', name: '露营基地', icon: 'Trees', color: 'camping' },
];

export const quickEntries = [
  { id: 'scan', name: '扫码登记', icon: 'QrCode', link: '/scan' },
  { id: 'orders', name: '我的预约', icon: 'ClipboardList', link: '/profile/orders' },
  { id: 'calendar', name: '活动日历', icon: 'Calendar', link: '/calendar' },
  { id: 'emergency', name: '紧急联系', icon: 'Phone', link: 'tel:120' },
];

// 健康档案
export const healthRecords: HealthRecord[] = [
  {
    id: 'hr1',
    userId: 'user1',
    hasAllergy: false,
    hasMedicalHistory: false,
    exerciseRestrictions: '',
    lastUpdateTime: '2026-02-15 10:30',
  },
];

// 赛事详情数据
export const eventDetails: EventDetail[] = [
  {
    id: 'ed1',
    activityId: '1',
    schedule: [
      { time: '08:00-08:30', content: '签到及装备检查' },
      { time: '08:30-09:00', content: '赛前安全培训及热身' },
      { time: '09:00-09:15', content: '开幕式及参赛选手介绍' },
      { time: '09:15-11:30', content: '预赛（分组进行）' },
      { time: '11:30-13:00', content: '午餐休息' },
      { time: '13:00-15:00', content: '半决赛' },
      { time: '15:00-15:30', content: '决赛' },
      { time: '15:30-16:00', content: '颁奖典礼' },
    ],
    rules: [
      '所有参赛选手必须持有有效的赛艇运动员资格证书',
      '比赛采用2000米标准赛道，单人艇竞速赛制',
      '每组6名选手，取前3名晋级',
      '出发前必须通过装备安全检查',
      '比赛过程中必须全程穿戴救生衣',
      '违反规则将被取消比赛资格',
      '遇到紧急情况需立即举手示意，工作人员将及时救援',
    ],
    rewards: [
      { rank: '冠军', prize: '奖金5000元 + 冠军奖杯 + 证书' },
      { rank: '亚军', prize: '奖金3000元 + 奖杯 + 证书' },
      { rank: '季军', prize: '奖金2000元 + 奖杯 + 证书' },
      { rank: '4-8名', prize: '奖金500元 + 证书' },
      { rank: '参与奖', prize: '纪念品 + 电子证书' },
    ],
    requirements: {
      age: { min: 18, max: 55 },
      qualification: '持有赛艇运动员资格证书（初级及以上）',
      healthRequirements: [
        '身体健康，无心脏病、高血压等不适宜剧烈运动的疾病',
        '具备基本游泳能力',
        '赛前3个月内体检报告（可选上传）',
      ],
    },
    safetyMeasures: {
      insurance: '所有参赛选手自动购买运动意外险（保额50万元）',
      emergencyContact: '24小时应急热线：400-888-9999',
      firstAidPoints: ['起点救援点', '1000米救援点', '终点救援点'],
      coachQualification: '所有教练持有国家二级及以上教练员资格证',
    },
    equipmentRequirements: {
      required: ['救生衣', '运动鞋', '运动服'],
      recommended: ['防晒霜', '太阳镜', '防水包', '替换衣物', '能量补给'],
      provided: ['赛艇', '船桨', '计时芯片', '号码布'],
    },
    checkInInfo: {
      location: '杭州西湖水上运动中心主楼一层',
      time: '比赛当天 08:00-08:30',
      materials: ['身份证原件', '资格证书原件', '报名确认短信'],
    },
  },
  {
    id: 'ed2',
    activityId: '2',
    schedule: [
      { time: '07:00-07:30', content: '签到及装备检查' },
      { time: '07:30-07:45', content: '赛前安全说明会' },
      { time: '07:45-08:00', content: '热身及准备' },
      { time: '08:00', content: '统一发车' },
      { time: '08:00-11:00', content: '50公里环湖骑行（设3个补给点）' },
      { time: '11:00-12:00', content: '陆续抵达终点' },
      { time: '12:00-13:00', content: '午餐及颁奖' },
    ],
    rules: [
      '参赛选手需年满16周岁，具备一定骑行经验',
      '必须佩戴头盔，否则不允许参赛',
      '统一发车，不允许提前出发',
      '必须按照指定路线行进，不得抄近道',
      '遵守交通规则，注意行车安全',
      '遇到意外情况立即联系组委会',
    ],
    rewards: [
      { rank: '男子组前三名', prize: '奖金3000/2000/1000元 + 奖杯 + 证书' },
      { rank: '女子组前三名', prize: '奖金3000/2000/1000元 + 奖杯 + 证书' },
      { rank: '完赛选手', prize: '完赛奖牌 + 电子证书 + 纪念T恤' },
    ],
    requirements: {
      age: { min: 16, max: 65 },
      qualification: '无需专业资格证，但需具备一定骑行经验',
      healthRequirements: [
        '身体健康，适合长距离骑行',
        '无心脏病、癫痫等不适宜运动的疾病',
      ],
    },
    safetyMeasures: {
      insurance: '含运动意外险（保额30万元），可升级至50万元',
      emergencyContact: '赛事应急热线：400-666-8888',
      firstAidPoints: ['起点', '15km补给点', '30km补给点', '终点'],
      coachQualification: '专业领队及收尾车全程护航',
    },
    equipmentRequirements: {
      required: ['头盔', '骑行手套', '运动服', '自行车（或租赁）'],
      recommended: ['骑行眼镜', '水壶', '能量胶', '备用内胎', '简易工具'],
      provided: ['号码布', '计时芯片', '赛事包（含矿泉水、能量棒）'],
    },
    checkInInfo: {
      location: '千岛湖骑行基地游客中心',
      time: '比赛当天 07:00-07:30',
      materials: ['身份证原件', '报名确认码'],
    },
  },
];

// 赛事素材数据
export const eventMaterials: EventMaterials[] = [
  {
    eventId: '1',
    images: [
      {
        id: 'img1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=600&fit=crop',
        uploadTime: '2026-03-10 14:30',
        uploader: '赛事官方',
      },
      {
        id: 'img2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        uploadTime: '2026-03-10 15:20',
        uploader: '赛事官方',
      },
      {
        id: 'img3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop',
        uploadTime: '2026-03-11 09:15',
        uploader: '参赛选手',
      },
      {
        id: 'img4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        uploadTime: '2026-03-11 10:45',
        uploader: '参赛选手',
      },
      {
        id: 'img5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=600&fit=crop',
        uploadTime: '2026-03-12 11:30',
        uploader: '赛事官方',
      },
    ],
    videos: [
      {
        id: 'vid1',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=600&fit=crop',
        uploadTime: '2026-03-10 16:00',
        uploader: '赛事官方',
      },
      {
        id: 'vid2',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        uploadTime: '2026-03-11 14:20',
        uploader: '参赛选手',
      },
    ],
  },
  {
    eventId: '2',
    images: [
      {
        id: 'img6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        uploadTime: '2026-03-20 08:00',
        uploader: '赛事官方',
      },
      {
        id: 'img7',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
        uploadTime: '2026-03-20 09:30',
        uploader: '赛事官方',
      },
      {
        id: 'img8',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        uploadTime: '2026-03-21 10:15',
        uploader: '参赛选手',
      },
    ],
    videos: [
      {
        id: 'vid3',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        uploadTime: '2026-03-20 11:00',
        uploader: '赛事官方',
      },
    ],
  },
];

// 模拟评价数据
export const mockActivityReviews = [
  {
    id: 'rev1',
    activityId: '1',
    userName: '极限狂人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    rating: 5,
    content: '这次赛艇锦标赛组织得非常专业！赛道环境一流，救生措施也很到位。拿到季军很开心，明年继续努力！',
    date: '2026-02-15',
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    tags: ['组织专业', '环境优美']
  },
  {
    id: 'rev2',
    activityId: '1',
    userName: '水上漂',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
    rating: 4,
    content: '整体体验很好，就是签到环节人有点多。建议增加签到窗口。',
    date: '2026-02-10',
    tags: ['体验极佳']
  },
  {
    id: 'rev3',
    activityId: '3',
    userName: '露营小白',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    rating: 5,
    content: '带孩子来体验星空露营，孩子玩得非常开心！营地设施很完善，晚上还能看到很清晰的银河，太美了。',
    date: '2026-01-20',
    images: [
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400'
    ],
    tags: ['亲子推荐', '星空绝美']
  }
];

// 承诺书内容
export const agreements: Agreement[] = [
  {
    id: 'safety-agreement',
    type: 'safety',
    title: '户外运动安全承诺书',
    content: [
      '一、本人自愿参加本次户外活动，已充分了解活动内容、强度、风险及注意事项。',
      '二、本人承诺身体健康，无心脏病、高血压、癫痫等不适宜参加户外运动的疾病。',
      '三、本人承诺在活动中严格遵守组织方的安全规定，听从教练及工作人员指挥。',
      '四、本人承诺穿着适合运动的服装和鞋子，携带必要的装备和补给。',
      '五、本人承诺不在活动前饮酒，不在身体不适的情况下勉强参加活动。',
      '六、本人理解户外运动存在一定风险，愿意自行承担因个人原因导致的意外风险。',
      '七、本人承诺在活动中如发现身体不适或其他异常情况，将立即告知工作人员。',
      '八、本人已购买或同意购买活动组织方提供的运动意外保险。',
    ],
    mandatory: true,
  },
  {
    id: 'health-agreement',
    type: 'health',
    title: '健康状况承诺书',
    content: [
      '一、本人确认目前身体健康状况良好，适合参加本次活动。',
      '二、本人没有以下疾病或症状：',
      '  • 心脏病、冠心病、心绞痛、心肌梗塞等心血管疾病',
      '  • 高血压、低血压等血压异常',
      '  • 癫痫、眩晕症等神经系统疾病',
      '  • 哮喘、慢性支气管炎等呼吸系统疾病',
      '  • 糖尿病等代谢性疾病',
      '  • 骨折未愈、严重关节损伤等运动系统疾病',
      '  • 其他医生建议不宜参加剧烈运动的疾病',
      '三、本人如有过敏史或特殊用药情况，已如实告知组织方。',
      '四、本人承诺如隐瞒病史导致意外发生，愿意承担全部责任。',
      '五、本人理解组织方有权要求提供健康证明，并配合相关检查。',
    ],
    mandatory: true,
  },
];

// 模拟工单数据
export const mockTickets = [
  {
    id: 'TK001',
    title: '申请修改预约日期',
    description: '因临时有事，想将3月15日的赛艇锦标赛调整到下一场。',
    category: '预约变更',
    status: 'processing',
    createTime: '2026-02-20 10:00',
    updateTime: '2026-02-20 14:00',
    replies: [
      {
        id: 'r1',
        content: '您好，我们已经收到您的申请。请问您想调整到哪一天的场次？',
        time: '2026-02-20 11:30',
        sender: 'support',
        senderName: '客服小王'
      },
      {
        id: 'r2',
        content: '我想调整到3月22日的场次，那天还有名额吗？',
        time: '2026-02-20 12:00',
        sender: 'user',
        senderName: '户外达人'
      },
      {
        id: 'r3',
        content: '正在为您查询名额，请稍候。',
        time: '2026-02-20 14:00',
        sender: 'support',
        senderName: '客服小王'
      }
    ]
  },
  {
    id: 'TK002',
    title: '积分未到账咨询',
    description: '完成了昨天的沙滩清理活动，但积分还没有增加。',
    category: '积分问题',
    status: 'resolved',
    createTime: '2026-02-19 16:30',
    updateTime: '2026-02-19 18:00',
    replies: [
      {
        id: 'r4',
        content: '您好，经核实，您的积分已于 2026-02-19 17:55 到账，请在积分中心查看。',
        time: '2026-02-19 18:00',
        sender: 'support',
        senderName: '系统管理员'
      }
    ]
  },
  {
    id: 'TK003',
    title: '退款申请',
    description: '活动取消了，申请全额退款。',
    category: '费用退还',
    status: 'pending',
    createTime: '2026-02-21 09:15',
    replies: []
  }
];
