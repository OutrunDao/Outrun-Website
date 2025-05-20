// 格式化日期时间
export function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr)

  // Get local time
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  // Get timezone offset (minutes)
  const offsetMinutes = date.getTimezoneOffset()
  // Convert to hours and minutes
  const offsetHours = Math.abs(Math.floor(offsetMinutes / 60))
  const offsetMinutesPart = Math.abs(offsetMinutes % 60)

  // Format as UTC+X:XX or UTC-X:XX
  const sign = offsetMinutes <= 0 ? "+" : "-"
  const formattedOffset = `UTC${sign}${offsetHours.toString().padStart(1, "0")}${
    offsetMinutesPart > 0 ? `:${offsetMinutesPart.toString().padStart(2, "0")}` : ""
  }`

  // Return formatted date time string with timezone info
  return `${year}-${month}-${day} ${hours}:${minutes} ${formattedOffset}`
}

// 格式化市值
export function formatMarketCap(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  } else {
    return `${value}`
  }
}

// 格式化美元金额
export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

// 格式化百分比
export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

// 格式化数字
export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals)
}

// 格式化价格
export function formatPrice(value: number): string {
  return `$${value.toFixed(4)}`
}

// 格式化时间差
export function formatTimeRemaining(endTime: string): string {
  const end = new Date(endTime).getTime()
  const now = new Date().getTime()
  const diff = end - now

  if (diff <= 0) {
    return "Ended"
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}d ${hours}h`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

// 导入样式系统，使用其中的样式定义
import { cardStyles } from "@/styles/memeverse-styles"

// 获取阶段对应的样式
export function getStageStyle(stage: string, styleType: "border" | "background" | "shadow"): string {
  const stageKey = stage.toLowerCase() as keyof typeof cardStyles.borderGradients

  switch (styleType) {
    case "border":
      return cardStyles.borderGradients[stageKey] || cardStyles.borderGradients.default
    case "background":
      return cardStyles.backgroundGradients[stageKey] || cardStyles.backgroundGradients.default
    case "shadow":
      return cardStyles.hoverShadowColors[stageKey] || cardStyles.hoverShadowColors.default
    default:
      return ""
  }
}

// 这些函数现在是对样式系统的包装器
export function getBorderGradient(stage: string): string {
  return (
    cardStyles.borderGradients[stage.toLowerCase() as keyof typeof cardStyles.borderGradients] ||
    cardStyles.borderGradients.default
  )
}

export function getBackgroundGradient(stage: string): string {
  return (
    cardStyles.backgroundGradients[stage.toLowerCase() as keyof typeof cardStyles.backgroundGradients] ||
    cardStyles.backgroundGradients.default
  )
}

export function getHoverShadowColor(stage: string): string {
  return (
    cardStyles.hoverShadowColors[stage.toLowerCase() as keyof typeof cardStyles.hoverShadowColors] ||
    cardStyles.hoverShadowColors.default
  )
}
