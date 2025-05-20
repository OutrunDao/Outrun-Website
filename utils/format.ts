/**
 * Format currency value
 */
export function formatCurrency(value: string): string {
  if (!value) return ""
  const num = Number.parseFloat(value)
  if (isNaN(num)) return value

  if (num < 0.000001) return num.toExponential(4)
  if (num < 0.001) return num.toFixed(6)
  if (num < 1) return num.toFixed(4)
  if (num < 10000) return num.toFixed(2)
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 })
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
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  } else {
    return `${value}`
  }
}
