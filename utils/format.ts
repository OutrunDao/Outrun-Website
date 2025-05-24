/**
 * Format currency value
 */
export function formatCurrency(value: string): string {
  if (!value) return ""

  const num = Number.parseFloat(value)
  if (isNaN(num)) return value

  // 使用对象映射替代多个if条件
  const formats = [
    { threshold: 0.000001, format: (n: number) => n.toExponential(4) },
    { threshold: 0.001, format: (n: number) => n.toFixed(6) },
    { threshold: 1, format: (n: number) => n.toFixed(4) },
    { threshold: 10000, format: (n: number) => n.toFixed(2) },
    {
      threshold: Number.POSITIVE_INFINITY,
      format: (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 }),
    },
  ]

  for (const { threshold, format } of formats) {
    if (num < threshold) return format(num)
  }

  // 默认情况，不应该到达这里
  return value
}

/**
 * Format dollar value
 */
export function formatDollarValue(value: number): string {
  if (value < 0.01) return "<$0.01"
  return `$${value.toFixed(2)}`
}

/**
 * Format address, showing first 6 and last 4 characters
 */
export function formatAddress(address?: string): string {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

/**
 * Get color based on price impact
 */
export function getPriceImpactColor(priceImpact: string): string {
  const impact = Number.parseFloat(priceImpact)
  if (impact < 0.1) return "text-green-400"
  if (impact < 0.5) return "text-green-300"
  if (impact < 1) return "text-yellow-400"
  return "text-red-400"
}

/**
 * Format date time
 */
export function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Format market cap
 */
export function formatMarketCap(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(2)}K`
  return `${value}`
}
