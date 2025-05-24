// Format date time
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

// Format market cap
export function formatMarketCap(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  } else {
    return `${value}`
  }
}

// Format USD amount
export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

// Get border gradient color for stage
export function getBorderGradient(stage: string): string {
  switch (stage) {
    case "Genesis":
      return "from-purple-500/70 via-pink-500/70 to-purple-500/70"
    case "Locked":
      return "from-pink-500/70 via-purple-500/70 to-pink-500/70"
    case "Unlocked":
      return "from-cyan-400/80 via-blue-500/80 to-indigo-400/80"
    case "Refund":
      return "from-red-400/80 via-orange-500/80 to-yellow-500/80"
    default:
      return "from-white/10 to-white/5"
  }
}

// Get background gradient color for stage
export function getBackgroundGradient(stage: string): string {
  switch (stage) {
    case "Genesis":
      return "from-purple-950/90 via-[#0f0326]/95 to-purple-950/90"
    case "Locked":
      return "from-pink-950/90 via-[#0f0326]/95 to-pink-950/90"
    case "Unlocked":
      return "from-cyan-950/90 via-[#0f0326]/95 to-cyan-950/90"
    case "Refund":
      return "from-red-950/90 via-[#0f0326]/95 to-red-950/90"
    default:
      return "from-[#0f0326]/95 to-[#0f0326]/95"
  }
}

// Get hover shadow color for stage
export function getHoverShadowColor(stage: string): string {
  switch (stage) {
    case "Genesis":
      return "rgba(168,85,247,0.4)"
    case "Locked":
      return "rgba(236,72,153,0.4)"
    case "Unlocked":
      return "rgba(6,182,212,0.5)"
    case "Refund":
      return "rgba(239,68,68,0.5)"
    default:
      return "rgba(168,85,247,0.4)"
  }
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

// Format number
export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals)
}

// Format price
export function formatPrice(value: number): string {
  return `$${value.toFixed(4)}`
}

// Format time remaining
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
