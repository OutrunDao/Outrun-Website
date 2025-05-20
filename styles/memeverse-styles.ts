// MemeVerse 样式系统

// 卡片样式变量
export const cardStyles = {
  // 卡片边框渐变
  borderGradients: {
    genesis: "from-purple-500/70 via-pink-500/70 to-purple-500/70",
    locked: "from-pink-500/70 via-purple-500/70 to-pink-500/70",
    unlocked: "from-cyan-400/80 via-blue-500/80 to-indigo-400/80",
    refund: "from-red-400/80 via-orange-500/80 to-yellow-500/80",
    default: "from-white/10 to-white/5",
  },

  // 卡片背景渐变
  backgroundGradients: {
    genesis: "from-purple-950/90 via-[#0f0326]/95 to-purple-950/90",
    locked: "from-pink-950/90 via-[#0f0326]/95 to-pink-950/90",
    unlocked: "from-cyan-950/90 via-[#0f0326]/95 to-cyan-950/90",
    refund: "from-red-950/90 via-[#0f0326]/95 to-red-950/90",
    default: "from-[#0f0326]/95 to-[#0f0326]/95",
  },

  // 悬停阴影颜色
  hoverShadowColors: {
    genesis: "rgba(168,85,247,0.4)",
    locked: "rgba(236,72,153,0.4)",
    unlocked: "rgba(6,182,212,0.5)",
    refund: "rgba(239,68,68,0.5)",
    default: "rgba(168,85,247,0.4)",
  },

  // 进度条渐变
  progressGradients: {
    complete: "from-cyan-400 via-purple-400 to-pink-400",
    inProgress: "from-purple-500 via-pink-500 to-purple-500",
  },
}

// 阶段标签样式
export const stageColors = {
  Genesis: {
    bg: "bg-purple-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(168,85,247,0.6)]",
    gradient: "from-purple-600 to-pink-500",
  },
  Refund: {
    bg: "bg-red-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    gradient: "from-red-600 to-orange-500",
  },
  Locked: {
    bg: "bg-pink-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(236,72,153,0.6)]",
    gradient: "from-pink-600 to-purple-500",
  },
  Unlocked: {
    bg: "bg-cyan-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(6,182,212,0.6)]",
    gradient: "from-cyan-500 to-blue-500",
  },
}

// 按钮样式
export const buttonStyles = {
  // 基础按钮样式
  base: "transition-all duration-300",

  // 过滤器按钮
  filter: {
    active:
      "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(168,85,247,0.2)_inset]",
    inactive: "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/30 hover:text-pink-200",
  },

  // 分页按钮
  pagination: {
    active:
      "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white border-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]",
    inactive: "bg-black/30 border border-purple-500/30 text-pink-300 hover:border-pink-400/50",
  },
}

// 下拉菜单样式
export const dropdownStyles = {
  container:
    "absolute z-50 mt-2 rounded-md overflow-hidden bg-gradient-to-br from-purple-950/95 via-[#150538]/98 to-indigo-950/95 backdrop-blur-md border border-purple-500/40 shadow-[0_4px_20px_rgba(138,75,175,0.3)] animate-in fade-in-50 zoom-in-95 duration-200",
}

// 导出所有样式
export const memeVerseStyles = {
  cardStyles,
  stageColors,
  buttonStyles,
  dropdownStyles,
}

export default memeVerseStyles
