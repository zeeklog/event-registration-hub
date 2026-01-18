UI 设计系统文档 (UI Design System)
1.1 设计理念 (Design Philosophy)
专业动感：采用深蓝色作为主基调，模拟深海的沉稳与专业感，符合“深潜”品牌属性。
可持续性：融入“环保绿”点缀，强调减碳积分与“山海共生”的环保主题。
现代简约：使用大圆角卡片、流体渐变和毛玻璃效果（Glassmorphism），营造高端、数字化的社交运动氛围。
1.2 布局与间距 (Layout & Spacing)
外边距 (Margins)：页面两侧统一留白 16dp 或 20dp。
卡片圆角 (Corner Radius)：
大容器/头图卡片：24dp
标准功能卡片/输入框：16dp
按钮/标签：8dp 或 全圆角 (Pill-shaped)
间距策略：采用 8 像素网格系统 (8pt Grid System)，元素间距多为 8px, 16px, 24px。
1.3 字体系统 (Typography)
字体族：推荐使用 PingFang SC (iOS) / Roboto (Android)。
字号层级：
大标题 (H1): 24sp - 28sp / Bold (用于 KV 标题、积分数字)
中标题 (H2): 18sp - 20sp / Medium (用于模块标题、卡片标题)
正文 (Body): 14sp - 16sp / Regular (用于表单、说明文本)
辅助信息 (Caption): 12sp / Regular (用于时间、地点、次要标注)
1.4 核心组件规范 (Core Components)
按钮 (Buttons)：主按钮采用“深海蓝”渐变或纯色块，文字白色居中；次要按钮采用深色描边或半透明深色。
表单 (Forms)：深色半透明背景输入框，左对齐标签，带有微弱的边框高亮。
进度指示器：如“点亮进度”条，采用线性渐变流向，完成态带发光效果。
2. 颜色系统文档 (Color System)
颜色系统分为品牌色、语义色以及针对积分模块的功能色。

2.1 品牌核心色 (Brand Colors)
颜色类型	颜色描述	HEX 代码 (示例)	应用场景
主背景色	深潜蓝 (Deep Navy)	#0B1320	页面全局背景、容器底色
品牌主色	动力蓝 (Action Blue)	#2589F5	主按钮、选中状态、关键图标
主题辅助色	环保绿 (Eco Green)	#34D399	减碳标签、环保相关进度、成功提示
2.2 积分分类色 (Points Category Colors)
用于积分中心环形图及分类标签，确保用户快速识别积分来源：

运动积分 (Sports)：#3B82F6 (亮蓝色)
文艺积分 (Arts)：#A855F7 (紫色)
赛事积分 (Events)：#F59E0B (琥珀色)
减碳积分 (Carbon)：#10B981 (翠绿色)
2.3 语义与状态色 (Semantic Colors)
文字主色：#FFFFFF (100% 不透明度) - 标题、核心数值
文字副色：#9CA3AF (灰蓝色系) - 说明文案、未选中状态
分割线/边框：#1F2937 (深灰蓝) - 模块分割
警告/错误：#EF4444 (红色) - 必填项缺失、报错提示
2.4 视觉效果 (Visual Effects)
毛玻璃效果：背景模糊 (Backdrop Blur 20px) + 半透明填充 (rgba(255, 255, 255, 0.05))，用于悬浮导航栏或浮动卡片。
渐变应用：
会员卡片：#2563EB 渐变至 #1E40AF。
主按钮：#3B82F6 渐变至 #2563EB。

交互状态说明 (Component States)
针对移动端触摸操作，所有可交互组件需遵循以下状态反馈逻辑：

组件类型	正常状态 (Normal)	点击/压下 (Pressed)	禁用状态 (Disabled)	加载状态 (Loading)
主按钮	品牌渐变，100% 不透明度	亮度降低 10%，比例缩放至 0.96	灰色填充 (#374151)，文字 30% 不透明度	文字隐藏，中心显示 Spinner
功能图标	线性描边 (#FFFFFF)	填充色块，Icon 缩放 1.1x	颜色变浅 (#4B5563)	N/A
输入框	描边 (#1F2937)，背景透明	描边变更为品牌蓝，光标闪烁	背景变为浅灰，不可点	N/A
列表卡片	静态显示	背景色轻微变亮 (Overlay 5% White)	N/A	骨架屏动画 (Skeleton)
2. 圆角系统 (Corner Radius System)
为了营造现代、亲和且专业的运动感，我们采用分级圆角逻辑：

大圆角 (24px - 32px)：
应用场景：首页 KV 轮播图、个人中心会员卡片、底部抽屉 (Bottom Sheet)。
逻辑：用于页面中权重最高的容器，强调包裹感。
中圆角 (16px)：
应用场景：赛事列表卡片、积分详情面板、功能聚合区。
逻辑：标准容器，平衡空间利用率与美感。
小圆角 (8px - 12px)：
应用场景：商品缩略图、表单输入框、弹出对话框 (Dialog)。
逻辑：保证内容展示的紧凑性。
全圆角 (Pill Shape)：
应用场景：标签 (Tag)、主行动按钮 (CTA)。
逻辑：引导视觉点击。
3. 动画与过渡 (Animation & Motion)
动效不仅是视觉点缀，更是引导用户理解操作逻辑的关键：

页面切换 (Transition)：
同级页面（如 Tab 切换）：采用水平淡入淡出（Fade + Slide）。
下级页面（如点击赛事详情）：采用“容器转换”动效（Shared Element Transition），卡片无缝展开至全屏。
微交互 (Micro-interactions)：
点赞/收藏：点击后图标轻微弹性缩放 (Elastic Scale)，并有粒子迸发效果。
积分数值滚动：进入积分页面时，数字从 0 快速滚动至当前值，增强成就感。
下拉刷新：下拉时出现潜水员下潜的趣味动画，提升品牌记忆。
加载反馈：
使用“流光效果” (Shimmer Effect) 作为列表加载占位，避免白屏焦虑。
4. 阴影与深度 (Shadows & Elevation)
在深色模式下，阴影的表现力较弱，我们通过亮度叠加 (Opacity Overlay) 来表现层级：

Level 0 (底色)：#0B1320 (全局背景)。
Level 1 (卡片层)：#161E2E (背景色基础上叠加 5% 白色)，无阴影或带极细的 #FFFFFF0D 描边。
Level 2 (浮窗/对话框)：#1F2937，带有深蓝色阴影 (Color: #000000, Alpha: 0.4, Blur: 20px, Y: 10px)。
Level 3 (顶部导航/悬浮按钮)：增加模糊度 backdrop-filter: blur(20px)，模拟磨砂玻璃穿透效果。
5. 配色方案进阶 (Advanced Color Palette)
5.1 渐变色定义 (Gradients)
品牌主渐变 (Primary)：linear-gradient(135deg, #2563EB 0%, #3B82F6 100%) - 用于报名按钮。
环保质感渐变 (Eco)：linear-gradient(135deg, #059669 0%, #10B981 100%) - 用于减碳勋章。
成就金渐变 (Gold)：linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%) - 用于高级会员。
5.2 透明度逻辑 (Transparency)
High Emphasis (高强度)：100% - 用于主要标题、按钮文字。
Medium Emphasis (中强度)：70% - 用于副标题、描述文本。
Disabled (禁用/辅助)：38% - 用于占位符、页脚版权文字。
6. 交互设计特别提示 (Interaction Tips)
触控目标 (Target Area)：所有可点击区域不小于 44x44pt，确保运动场景下也能精准操作。
震动反馈 (Haptic Feedback)：
成功：轻微双击震动（如签到成功）。
警告：短促单次震动（如输入错误）。
手势支持：
赛事相册支持双指缩放。
长按社区 POST 可呼出“举报/不感兴趣”菜单。