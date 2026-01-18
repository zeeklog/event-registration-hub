/**
 * 设计系统应用工具 (New Version)
 * 提供快速应用新设计系统样式的辅助函数
 */

import { colors, gradients, effects } from './design-system';

/**
 * 获取活动类型对应的颜色方案
 */
export const getTypeColorScheme = (type: string) => {
  switch (type) {
    case 'rowing':
      return { bg: colors.action.primary, text: colors.text.primary };
    case 'cycling':
      return { bg: colors.points.sports, text: colors.text.primary };
    case 'camping':
      return { bg: colors.eco.primary, text: colors.navy.primary };
    default:
      return { bg: colors.action.primary, text: colors.text.primary };
  }
};

/**
 * 获取排名徽章样式
 */
export const getRankBadgeStyle = (rank: number) => {
  if (rank === 1) {
    return {
      background: gradients.gold,
      color: colors.text.primary,
      label: '🥇 冠军'
    };
  } else if (rank === 2) {
    return {
      background: 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)',
      color: colors.navy.primary,
      label: '🥈 亚军'
    };
  } else if (rank === 3) {
    return {
      background: 'linear-gradient(135deg, #D97706 0%, #92400E 100%)',
      color: colors.text.primary,
      label: '🥉 季军'
    };
  } else {
    return {
      background: colors.navy.lighter,
      color: colors.text.secondary,
      label: '优秀奖'
    };
  }
};

/**
 * 获取状态徽章样式
 */
export const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'confirmed':
    case 'active':
      return {
        background: colors.action.primary,
        color: colors.text.primary,
        label: '已确认'
      };
    case 'pending':
      return {
        background: colors.warning,
        color: colors.text.primary,
        label: '待参与'
      };
    case 'completed':
      return {
        background: colors.eco.primary,
        color: colors.navy.primary,
        label: '已完成'
      };
    case 'reviewing':
      return {
        background: colors.info,
        color: colors.text.primary,
        label: '审核中'
      };
    case 'cancelled':
      return {
        background: colors.error,
        color: colors.text.primary,
        label: '已取消'
      };
    default:
      return {
        background: colors.navy.accent,
        color: colors.text.secondary,
        label: status
      };
  }
};

/**
 * 获取玻璃拟态样式
 */
export const getGlassStyle = () => {
  return effects.glass;
};

/**
 * 获取会员等级样式
 */
export const getMemberLevelStyle = (level: string) => {
  switch (level) {
    case 'diamond':
      return {
        background: gradients.membership,
        color: colors.text.primary,
        label: '钻石会员',
        icon: '💎'
      };
    case 'gold':
      return {
        background: gradients.gold,
        color: colors.text.primary,
        label: '黄金会员',
        icon: '👑'
      };
    case 'silver':
      return {
        background: 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)',
        color: colors.navy.primary,
        label: '白银会员',
        icon: '🥈'
      };
    default:
      return {
        background: colors.navy.accent,
        color: colors.text.secondary,
        label: '普通会员',
        icon: '👤'
      };
  }
};

export default {
  getTypeColorScheme,
  getRankBadgeStyle,
  getStatusBadgeStyle,
  getGlassStyle,
  getMemberLevelStyle
};
