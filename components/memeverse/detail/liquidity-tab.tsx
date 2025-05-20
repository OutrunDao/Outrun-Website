"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TokenIcon } from "@/components/ui/token-icon"
import { formatMarketCap } from "@/utils/format"

interface LiquidityTabProps {
  project: any
}

export function LiquidityTab({ project }: LiquidityTabProps) {
  const [activeTab, setActiveTab] = useState("token")

  // 模拟不同类型的流动性池数据
  const tokenPools = [
    {
      id: "eth",
      pair: `${project.symbol}/ETH`,
      tokens: [project.symbol, "ETH"],
      tvl: 1250000,
      volume24h: 350000,
      apr: 42.5,
      tvlPrevWeek: 980000,
      growthRate: 27.55,
    },
    {
      id: "usdc",
      pair: `${project.symbol}/USDC`,
      tokens: [project.symbol, "USDC"],
      tvl: 980000,
      volume24h: 280000,
      apr: 38.2,
      tvlPrevWeek: 820000,
      growthRate: 19.51,
    },
    {
      id: "usdt",
      pair: `${project.symbol}/USDT`,
      tokens: [project.symbol, "USDT"],
      tvl: 750000,
      volume24h: 210000,
      apr: 35.8,
      tvlPrevWeek: 680000,
      growthRate: 10.29,
    },
  ]

  const polPools = [
    {
      id: "pol-eth",
      pair: `POL-${project.symbol}/ETH`,
      tokens: [`POL-${project.symbol}`, "ETH"],
      tvl: 850000,
      volume24h: 220000,
      apr: 48.5,
      tvlPrevWeek: 720000,
      growthRate: 18.06,
    },
    {
      id: "pol-usdc",
      pair: `POL-${project.symbol}/USDC`,
      tokens: [`POL-${project.symbol}`, "USDC"],
      tvl: 620000,
      volume24h: 180000,
      apr: 45.2,
      tvlPrevWeek: 540000,
      growthRate: 14.81,
    },
  ]

  const stakedPools = [
    {
      id: "s-eth",
      pair: `s${project.symbol}/ETH`,
      tokens: [`s${project.symbol}`, "ETH"],
      tvl: 950000,
      volume24h: 280000,
      apr: 52.5,
      tvlPrevWeek: 780000,
      growthRate: 21.79,
    },
    {
      id: "s-usdc",
      pair: `s${project.symbol}/USDC`,
      tokens: [`s${project.symbol}`, "USDC"],
      tvl: 720000,
      volume24h: 190000,
      apr: 49.8,
      tvlPrevWeek: 620000,
      growthRate: 16.13,
    },
  ]

  // 根据当前选中的标签获取对应的流动性池
  const getActivePools = () => {
    switch (activeTab) {
      case "pol":
        return polPools
      case "staked":
        return stakedPools
      default:
        return tokenPools
    }
  }

  const liquidityPools = getActivePools()

  // 计算总体流动性增长率
  const totalTVL = liquidityPools.reduce((sum, pool) => sum + pool.tvl, 0)
  const totalTVLPrevWeek = liquidityPools.reduce((sum, pool) => sum + pool.tvlPrevWeek, 0)
  const overallGrowthRate = ((totalTVL - totalTVLPrevWeek) / totalTVLPrevWeek) * 100

  return (
    <div className="space-y-6">
      {/* 流动性概览 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-pink-300">Liquidity Overview</h3>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`${activeTab === "token" ? "bg-purple-600 text-white" : "bg-black/40 text-pink-300"} border border-purple-500/40`}
              onClick={() => setActiveTab("token")}
            >
              Token
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`${activeTab === "pol" ? "bg-purple-600 text-white" : "bg-black/40 text-pink-300"} border border-purple-500/40`}
              onClick={() => setActiveTab("pol")}
            >
              POL
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`${activeTab === "staked" ? "bg-purple-600 text-white" : "bg-black/40 text-pink-300"} border border-purple-500/40`}
              onClick={() => setActiveTab("staked")}
            >
              Staked Token
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Total Value Locked</div>
            <div className="text-xl font-bold text-white">${formatMarketCap(totalTVL)}</div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">24h Volume</div>
            <div className="text-xl font-bold text-white">
              ${formatMarketCap(liquidityPools.reduce((sum, pool) => sum + pool.volume24h, 0))}
            </div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">7d Liquidity Growth Rate</div>
            <div className="text-xl font-bold text-white flex items-center">
              <span className={overallGrowthRate >= 0 ? "text-green-400" : "text-red-400"}>
                {overallGrowthRate >= 0 ? "+" : ""}
                {overallGrowthRate.toFixed(2)}%
              </span>
              <span className="text-xs ml-2 text-pink-300/60">vs last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* 流动性池列表 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-pink-300">Liquidity Pools</h3>
        </div>

        <div className="space-y-4">
          {liquidityPools.map((pool) => (
            <div
              key={pool.id}
              className="bg-black/40 rounded-lg border border-purple-500/30 p-4 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="flex items-center w-1/4">
                  <div className="flex -space-x-2 mr-3">
                    <TokenIcon symbol={pool.tokens[0]} className="w-8 h-8 border-2 border-black rounded-full" />
                    <TokenIcon symbol={pool.tokens[1]} className="w-8 h-8 border-2 border-black rounded-full" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{pool.pair}</div>
                    <div className="text-xs text-pink-300/80">Outrun AMM V1</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-16 w-1/2 ml-4 mr-auto">
                  <div className="text-center">
                    <div className="text-xs text-pink-300/80">TVL</div>
                    <div className="font-semibold text-white">${formatMarketCap(pool.tvl)}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-pink-300/80">24h Volume</div>
                    <div className="font-semibold text-white">${formatMarketCap(pool.volume24h)}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-pink-300/80">APR</div>
                    <div className="font-semibold text-white">{pool.apr.toFixed(2)}%</div>
                  </div>
                </div>

                <div className="ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/60 text-pink-300 border border-purple-500/40 hover:bg-purple-900/40"
                  >
                    Add Liquidity
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
