"use client"

import React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MemeversePriceChartProps {
  project: any
}

// Custom tooltip component that can overflow container boundaries
const CustomTooltip = React.memo(({ trigger, content }: { trigger: React.ReactNode; content: React.ReactNode }) => {
  return (
    <div className="relative group">
      {trigger}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-sm text-pink-200 px-3 py-1.5 rounded-md whitespace-nowrap shadow-[0_0_8px_rgba(168,85,247,0.3)] border border-pink-500/20">
          {content}
        </div>
      </div>
    </div>
  )
})

CustomTooltip.displayName = "CustomTooltip"

export const MemeversePriceChart = React.memo(({ project }: MemeversePriceChartProps) => {
  const [chartData, setChartData] = useState<any[]>([])
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "all">("7d")
  const [priceChange, setPriceChange] = useState<{ value: number; percentage: number }>({ value: 0, percentage: 0 })
  const [isPositive, setIsPositive] = useState(true)

  // Generate mock price data
  useEffect(() => {
    const generateChartData = () => {
      const now = new Date()
      const data: any[] = []

      // Base price - estimated using market cap divided by total supply
      const basePrice = project.marketCap / 1000000000

      // Determine number of data points and time intervals based on timeframe
      let points = 0
      let interval = 0

      switch (timeframe) {
        case "24h":
          points = 24
          interval = 60 * 60 * 1000 // 1小时
          break
        case "7d":
          points = 7 * 24
          interval = 60 * 60 * 1000 // 1小时
          break
        case "30d":
          points = 30
          interval = 24 * 60 * 60 * 1000 // 1天
          break
        case "all":
          points = 90
          interval = 24 * 60 * 60 * 1000 // 1天
          break
      }

      // Generate randomly fluctuating price data
      for (let i = points; i >= 0; i--) {
        const time = new Date(now.getTime() - i * interval)

        // Add some random fluctuation while maintaining overall trend
        const volatility = 0.05 // 5%的波动率
        const trend = timeframe === "all" ? 0.001 : 0.0005 // Long-term upward trend
        const randomFactor = (Math.random() - 0.5) * 2 * volatility

        // Calculate price based on time, more recent data closer to current price
        const priceFactor = 1 + randomFactor + trend * i
        const price = basePrice * priceFactor

        data.push({
          time: time.toISOString(),
          price: price,
        })
      }

      // Calculate price change
      const firstPrice = data[0].price
      const lastPrice = data[data.length - 1].price
      const change = lastPrice - firstPrice
      const percentageChange = (change / firstPrice) * 100

      setPriceChange({
        value: change,
        percentage: percentageChange,
      })

      setIsPositive(change >= 0)
      setChartData(data)
    }

    generateChartData()
  }, [timeframe, project.marketCap])

  // Find price range for chart drawing
  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    if (chartData.length === 0) return { minPrice: 0, maxPrice: 0, priceRange: 1 }
    const min = Math.min(...chartData.map((d) => d.price))
    const max = Math.max(...chartData.map((d) => d.price))
    return { minPrice: min, maxPrice: max, priceRange: max - min }
  }, [chartData])

  // Format price
  const formatPrice = useCallback((price: number) => {
    if (price < 0.000001) {
      return price.toExponential(2)
    }
    return price.toFixed(price < 0.01 ? 6 : price < 1 ? 4 : 2)
  }, [])

  // Format large numbers like market cap and total supply
  const formatLargeNumber = useCallback((num: number) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + "B"
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M"
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K"
    }
    return num.toString()
  }, [])

  // Calculate random volume - usually a small fraction of market cap
  const volume = project.marketCap ? project.marketCap * (0.05 + Math.random() * 0.15) : 1000000

  // Calculate or use token total supply
  const totalSupply = project.totalSupply || 1000000000

  // Use fixed mock data as liquidity value
  const liquidity = 2500000 // 固定值：250万

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 overflow-visible h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6">
          {/* Gradient token symbol title */}
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text">
              {project.symbol || "TOKEN"}
            </h3>

            {/* Add more project info - use flex layout with fixed width */}
            <div className="flex flex-wrap gap-2 text-xs">
              <CustomTooltip
                trigger={
                  <div className="px-2 py-1 bg-purple-900/30 rounded-md w-[100px] cursor-help">
                    <span className="text-pink-300 font-medium">MC: </span>
                    <span className="text-white">${formatLargeNumber(project.marketCap || 0)}</span>
                  </div>
                }
                content={<span>Market Cap: ${project.marketCap ? project.marketCap.toLocaleString() : "0"}</span>}
              />

              <CustomTooltip
                trigger={
                  <div className="px-2 py-1 bg-purple-900/30 rounded-md w-[100px] cursor-help">
                    <span className="text-pink-300 font-medium">Liq: </span>
                    <span className="text-white">${formatLargeNumber(liquidity)}</span>
                  </div>
                }
                content={<span>Liquidity: ${liquidity.toLocaleString()}</span>}
              />

              <CustomTooltip
                trigger={
                  <div className="px-2 py-1 bg-purple-900/30 rounded-md w-[100px] cursor-help">
                    <span className="text-pink-300 font-medium">Vol: </span>
                    <span className="text-white">${formatLargeNumber(volume)}</span>
                  </div>
                }
                content={<span>Volume: ${volume.toLocaleString()}</span>}
              />

              <CustomTooltip
                trigger={
                  <div className="px-2 py-1 bg-purple-900/30 rounded-md w-[100px] cursor-help">
                    <span className="text-pink-300 font-medium">Pop: </span>
                    <span className="text-white">{formatLargeNumber(project.population || 1000000000)}</span>
                  </div>
                }
                content={<span>Population: {(project.population || 1000000000).toLocaleString()}</span>}
              />

              <CustomTooltip
                trigger={
                  <div className="px-2 py-1 bg-purple-900/30 rounded-md w-[100px] cursor-help">
                    <span className="text-pink-300 font-medium">TS: </span>
                    <span className="text-white">{formatLargeNumber(totalSupply)}</span>
                  </div>
                }
                content={<span>Total Supply: {totalSupply.toLocaleString()}</span>}
              />
            </div>
          </div>

          {/* Separate price and period selection into two rows to avoid interference */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white mr-2">
                ${formatPrice(chartData.length ? chartData[chartData.length - 1].price : 0)}
              </span>
              <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                <span className="font-medium">
                  {isPositive ? "+" : ""}
                  {priceChange.percentage.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="flex items-center bg-black/40 rounded-lg p-1 w-[220px] justify-center">
              {(["24h", "7d", "30d", "all"] as const).map((tf) => (
                <button
                  key={tf}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 w-[45px] text-center ${
                    timeframe === tf
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf === "all" ? "All" : tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price chart - use flex-1 to ensure it takes remaining space */}
        <div className="flex-1 relative min-h-[200px]">
          <div className="absolute inset-0 flex items-end">
            {chartData.map((point, index) => {
              // Calculate height percentage
              const heightPercent = priceRange === 0 ? 50 : ((point.price - minPrice) / priceRange) * 100

              return (
                <div
                  key={index}
                  className="flex-1 flex items-end h-full"
                  style={{ minWidth: `${100 / chartData.length}%` }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.5, delay: index * 0.01 }}
                    className={`w-full ${
                      isPositive
                        ? "bg-gradient-to-t from-green-500/20 to-green-500/5"
                        : "bg-gradient-to-t from-red-500/20 to-red-500/5"
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* Price line */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} />
                <stop offset="100%" stopColor={isPositive ? "#059669" : "#dc2626"} />
              </linearGradient>
            </defs>
            <path
              d={
                chartData.length > 0
                  ? `M${chartData
                      .map((point, i) => {
                        const x = (i / (chartData.length - 1)) * 100
                        const y = 100 - ((point.price - minPrice) / priceRange) * 100
                        return `${x},${y}`
                      })
                      .join(" L")}`
                  : ""
              }
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Y-axis labels */}
          <div className="absolute top-0 right-0 h-full flex flex-col justify-between text-xs text-zinc-500 py-2">
            <div>${formatPrice(maxPrice)}</div>
            <div>${formatPrice(minPrice + priceRange / 2)}</div>
            <div>${formatPrice(minPrice)}</div>
          </div>
        </div>

        {/* Time axis labels */}
        <div className="flex justify-between mt-2 text-xs text-zinc-500">
          {timeframe === "24h" && (
            <>
              <div>24h ago</div>
              <div>12h ago</div>
              <div>Now</div>
            </>
          )}
          {timeframe === "7d" && (
            <>
              <div>7d ago</div>
              <div>3d ago</div>
              <div>Now</div>
            </>
          )}
          {timeframe === "30d" && (
            <>
              <div>30d ago</div>
              <div>15d ago</div>
              <div>Now</div>
            </>
          )}
          {timeframe === "all" && (
            <>
              <div>Launch</div>
              <div>Mid</div>
              <div>Now</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
})

MemeversePriceChart.displayName = "MemeversePriceChart"
