/**
 * 体育赛事应用 UI 设计系统 (New Version)
 * 基于 "深海蓝为底、动力蓝为魂、环保绿为点缀" 的色彩层级结构
 */

// 🌈 主色调系统
export const colors = {
  // 深海蓝系 (背景与容器)
  navy: {
    primary: '#0B1320',      // 全局背景
    secondary: '#161E2E',    // 卡片/容器背景
    accent: '#1F2937',       // 分割线/边框
  },

  // 动力蓝系 (核心行动)
  action: {
    primary: '#2589F5',      // 主按钮/选中
    hover: '#1E70C6',        // 悬浮状态
    light: '#60A5FA',        // 辅助蓝
  },

  // 环保绿系 (可持续与成功)
  eco: {
    primary: '#34D399',      // 环保标签/进度
    hover: '#10B981',        // 成功提示
    light: '#6EE7B7',        // 辅助绿
  },

  // 积分分类色
  points: {
    sports: '#3B82F6',       // 运动
    arts: '#A855F7',         // 文艺
    events: '#F59E0B',       // 赛事
    carbon: '#10B981',       // 减碳
  },

  // 文字色
  text: {
    primary: '#FFFFFF',      // 主要标题
    secondary: '#9CA3AF',    // 次要描述
    tertiary: '#6B7280',     // 辅助占位
  },

  // 状态色
  success: '#34D399',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// 🔄 渐变色彩系统
export const gradients = {
  primary: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
  eco: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
  gold: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  membership: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
};

// 🎭 视觉效果
export const effects = {
  glass: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  shadow: {
    level1: 'none',
    level2: '0 10px 20px rgba(0, 0, 0, 0.4)',
  }
};

// 📐 间距系统 (8pt Grid)
export const spacing = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '40px',
};

// 📱 圆角系统
export const borderRadius = {
  small: '8px',
  medium: '16px',
  large: '24px',
  full: '9999px',
};

export default {
  colors,
  gradients,
  effects,
  spacing,
  borderRadius,
};
