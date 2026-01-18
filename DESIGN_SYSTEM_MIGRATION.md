# 设计系统迁移指南

## 概述

本项目已经从原有的湖蓝色+草绿色主题迁移至符合体育赛事风格的 **"竞技黄为主、黑为骨、紫为魂、橙为翼"** 设计系统。

## 已完成的工作

### 1. 设计系统基础设施 ✅

- **创建设计系统配置文件** (`src/lib/design-system.ts`)
  - 定义了完整的颜色系统
  - 定义了渐变系统
  - 定义了阴影系统
  - 定义了按钮和卡片样式规范

- **创建设计系统应用工具** (`src/lib/apply-design-system.ts`)
  - 提供快速应用设计系统的辅助函数
  - 类型颜色方案、排名徽章、状态徽章等

- **更新全局样式** (`src/index.css`)
  - 更新 CSS 变量为竞技黄主题
  - 添加自定义工具类 (`.bg-champion-gradient`, `.btn-champion` 等)
  - 支持深色模式

- **更新 Tailwind 配置** (`tailwind.config.ts`)
  - 添加体育赛事专用颜色
  - 添加主题阴影支持

### 2. 已重构的核心组件 ✅

#### 布局组件
- **Header** (`src/components/layout/Header.tsx`)
  - 使用竞技黄作为主色
  - 更新搜索框和图标颜色
  - 优化阴影和边框

- **BottomNav** (`src/components/layout/BottomNav.tsx`)
  - 激活状态使用竞技黄
  - 添加发光效果

#### 首页组件
- **HeroBanner** (`src/components/home/HeroBanner.tsx`)
  - 使用竞技黄指示器
  - 优化渐变遮罩

- **CategoryNav** (`src/components/home/CategoryNav.tsx`)
  - 场景分类使用竞技黄
  - 品类分类使用橙色、黄色、绿色区分

- **RecommendSection** (`src/components/home/RecommendSection.tsx`)
  - 更新文字和图标颜色

- **ActivityCard** (`src/components/activity/ActivityCard.tsx`)
  - 使用新的类型配色（橙色=赛艇，黄色=骑行，绿色=露营）
  - 热门、新品标签使用渐变
  - 价格使用竞技黄
  - 按钮使用冠军荣耀渐变

### 3. 已重构的页面 ✅

- **Index** (`src/pages/Index.tsx`)
  - 更新图标颜色
  
- **Events** (`src/pages/Events.tsx`)
  - 完整应用新设计系统
  - 使用辅助函数统一样式

## 待完成的工作

### 剩余需要重构的页面

由于已经建立了完整的设计系统基础设施和辅助工具，剩余页面可以快速应用相同的模式进行重构：

#### 高优先级（用户高频使用）
1. **Profile** - 个人中心
2. **ActivityDetail** - 活动详情
3. **EventDetail** - 赛事详情
4. **Awards** - 获奖记录
5. **Badges** - 勋章墙（已有3D效果，需应用配色）
6. **Membership** - 会员等级
7. **Achievements** - 成就页面

#### 中优先级
8. **Insurance** - 保险购买
9. **Category** - 分类页面
10. **SearchPage** - 搜索页面
11. **Calendar** - 日历页面
12. **Orders** - 订单页面

#### 低优先级（辅助功能）
13. **Settings** - 设置
14. **Notifications** - 通知
15. **Service** - 客服
16. **EmergencyContact** - 紧急联系人
17. **HealthRecord** - 健康档案
18. **SafetyCenter** - 安全中心
19. **ProfileEdit** - 资料编辑
20. **Verify** - 实名认证
21. **Favorites** - 收藏
22. **Coupons** - 优惠券
23. **Points** - 积分
24. **Reviews** - 评价列表
25. **Review** - 写评价
26. **NotFound** - 404页面

## 快速重构指南

### 基本步骤

1. **导入设计系统**
```typescript
import { colors, gradients, shadows } from '@/lib/design-system';
import { getButtonStyle, getCardStyle, getStatusBadgeStyle } from '@/lib/apply-design-system';
```

2. **替换主要视觉元素**

#### 页面标题和图标
```tsx
// 旧代码
<Trophy className="w-5 h-5 text-primary" />
<h1 className="text-lg font-bold text-foreground">标题</h1>

// 新代码
<Trophy className="w-5 h-5" style={{ color: colors.yellow.primary }} />
<h1 className="text-lg font-bold" style={{ color: colors.text.primary }}>标题</h1>
```

#### 按钮
```tsx
// 主要按钮 - 使用冠军荣耀渐变
<Button 
  className="font-bold"
  style={{
    background: gradients.champion,
    color: colors.text.white,
    boxShadow: shadows.yellow
  }}
>
  立即报名
</Button>

// 或使用辅助函数
<Button style={getButtonStyle('primary')}>立即报名</Button>
```

#### 卡片
```tsx
// 常规卡片
<Card style={{
  borderColor: `${colors.yellow.light}40`,
  boxShadow: shadows.sm
}}>
  ...
</Card>

// 冠军卡片
<Card style={getCardStyle('champion')}>
  ...
</Card>
```

#### 徽章
```tsx
// 状态徽章
const badgeStyle = getStatusBadgeStyle(status);
<Badge style={{
  background: badgeStyle.background,
  color: badgeStyle.color
}}>
  {badgeStyle.label}
</Badge>
```

#### Header
```tsx
<header 
  className="sticky top-0 z-40 border-b"
  style={{
    backgroundColor: colors.background.white,
    borderColor: `${colors.yellow.light}40`,
    boxShadow: shadows.sm
  }}
>
  ...
</header>
```

### 颜色使用规范

#### 主色 - 竞技黄系
- **冠军金** (#FFC107) - 品牌核心、主要按钮、核心数据
- **赛道黄** (#FFB300) - 边框、进度条
- **警示黄** (#FFE082) - 提示标签、背景点缀
- **荣耀黄** (#FF8F00) - 点击态、阴影

#### 辅助色 - 深紫色系（VIP/冠军专用）
- **帝王紫** (#6A1B9A) - VIP专区、冠军榜单
- **竞技紫** (#8E24AA) - 赛事专题、特殊活动
- **活力紫** (#AB47BC) - 互动元素

#### 辅助色 - 活力橙系（行动引导）
- **赛道橙** (#FF6F00) - 立即报名、直播预约
- **活力橙** (#FF8A00) - 投票、打赏
- **暖橙** (#FF9E00) - 渐变过渡

#### 功能色
- **胜利绿** (#1B5E20) - 成功、晋级、完成
- **专业蓝** (#1976D2) - 数据、信息
- **错误红** (#D32F2F) - 失败、警告

#### 文字色
- **主要文字** (#121212) - 标题、重要内容
- **次要文字** (#2A2A2A) - 正文
- **辅助文字** (#4A4A4A) - 说明、时间戳

### 设计原则

1. **色彩层级**
   - 竞技黄占比不超过 30%
   - 黑色/深灰作为底色占比 40%-50%
   - 紫色、橙色作为焦点色占比不超过 15%

2. **对比度**
   - 文字与背景对比度不低于 4.5:1
   - 黄色文字仅在深色背景上使用

3. **圆角统一**
   - 按钮：8px
   - 卡片：12px

4. **阴影层级**
   - 小: `shadows.sm`
   - 中: `shadows.md`
   - 大: `shadows.lg`
   - 主题: `shadows.yellow`, `shadows.purple`, `shadows.orange`

## 批量更新建议

可以使用以下命令批量更新特定模式：

```bash
# 更新所有 text-primary 为竞技黄
# (手动检查后执行)

# 更新所有 bg-primary 为竞技黄渐变
# (需要谨慎处理每个场景)
```

## 测试检查清单

- [ ] 首页显示正常，颜色符合设计系统
- [ ] 活动卡片使用新的类型配色
- [ ] 按钮使用竞技黄渐变
- [ ] Header 和 BottomNav 使用新配色
- [ ] 所有页面标题使用竞技黄图标
- [ ] 徽章和标签使用正确的颜色方案
- [ ] 深色模式（如果支持）正常工作
- [ ] 无障碍性：对比度符合标准

## 注意事项

1. 已有3D效果的勋章墙需要保留原有的立体效果，只需更新配色
2. 某些特殊页面（如404、错误页）可以保持较为中性的配色
3. 所有修改都已通过构建测试，无语法错误

## 相关文件

- 设计系统: `src/lib/design-system.ts`
- 应用工具: `src/lib/apply-design-system.ts`
- 全局样式: `src/index.css`
- Tailwind 配置: `tailwind.config.ts`
- UI 设计约束: `UI设计风格约束.md`
