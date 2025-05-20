"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, RefreshCw } from "lucide-react"
import { TokenIcon } from "@/components/ui/token-icon"
import { Button } from "@/components/ui/button"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useMobile } from "@/hooks/use-mobile"

// Mock user position data
const positionsData = [
  {
    id: 1,
    pair: "ETH/USDC",
    fee: "0.3%",
    priceRange: {
      token0PerToken1: "1,800 - 2,200", // ETH价格（以USDC计价）
      token1PerToken0: "0.00045 - 0.00056", // USDC价格（以ETH计价）
    },
    inRange: true,
    value: "$5,240.50",
    tokens: {
      token0: { symbol: "ETH", amount: "1.25" },
      token1: { symbol: "USDC", amount: "2,500.00" },
    },
    liquidity: {
      token0: { symbol: "ETH", amount: "1.25" },
      token1: { symbol: "USDC", amount: "2,500.00" },
    },
    fees: {
      token0: { symbol: "ETH", amount: "0.0125" },
      token1: { symbol: "USDC", amount: "25.00" },
    },
    unclaimed: "$12.45",
    apr: "4.2%",
  },
  {
    id: 2,
    pair: "ETH/USDT",
    fee: "0.05%",
    priceRange: {
      token0PerToken1: "1,900 - 2,100", // ETH价格（以USDT计价）
      token1PerToken0: "0.00048 - 0.00053", // USDT价格（以ETH计价）
    },
    inRange: true,
    value: "$3,120.75",
    tokens: {
      token0: { symbol: "ETH", amount: "0.75" },
      token1: { symbol: "USDT", amount: "1,500.00" },
    },
    liquidity: {
      token0: { symbol: "ETH", amount: "0.75" },
      token1: { symbol: "USDT", amount: "1,500.00" },
    },
    fees: {
      token0: { symbol: "ETH", amount: "0.0075" },
      token1: { symbol: "USDT", amount: "15.00" },
    },
    unclaimed: "$5.32",
    apr: "2.8%",
  },
  {
    id: 3,
    pair: "ETH/DAI",
    fee: "1%",
    priceRange: {
      token0PerToken1: "1,700 - 2,300", // ETH价格（以DAI计价）
      token1PerToken0: "0.00043 - 0.00059", // DAI价格（以ETH计价）
    },
    inRange: false,
    value: "$2,850.20",
    tokens: {
      token0: { symbol: "ETH", amount: "0.65" },
      token1: { symbol: "DAI", amount: "1,350.00" },
    },
    liquidity: {
      token0: { symbol: "ETH", amount: "0.65" },
      token1: { symbol: "DAI", amount: "1,350.00" },
    },
    fees: {
      token0: { symbol: "ETH", amount: "0.0065" },
      token1: { symbol: "DAI", amount: "13.50" },
    },
    unclaimed: "$18.75",
    apr: "6.5%",
  },
  {
    id: 4,
    pair: "WBTC/ETH",
    fee: "0.3%",
    priceRange: {
      token0PerToken1: "15.2 - 16.8", // WBTC价格（以ETH计价）
      token1PerToken0: "0.060 - 0.066", // ETH价格（以WBTC计价）
    },
    inRange: true,
    value: "$8,450.00",
    tokens: {
      token0: { symbol: "WBTC", amount: "0.15" },
      token1: { symbol: "ETH", amount: "2.35" },
    },
    liquidity: {
      token0: { symbol: "WBTC", amount: "0.15" },
      token1: { symbol: "ETH", amount: "2.35" },
    },
    fees: {
      token0: { symbol: "WBTC", amount: "0.0015" },
      token1: { symbol: "ETH", amount: "0.0235" },
    },
    unclaimed: "$24.60",
    apr: "5.1%",
  },
  {
    id: 5,
    pair: "USDC/USDT",
    fee: "0.01%",
    priceRange: {
      token0PerToken1: "0.995 - 1.005", // USDC价格（以USDT计价）
      token1PerToken0: "0.995 - 1.005", // USDT价格（以USDC计价）
    },
    inRange: true,
    value: "$10,000.00",
    tokens: {
      token0: { symbol: "USDC", amount: "5,000.00" },
      token1: { symbol: "USDT", amount: "5,000.00" },
    },
    liquidity: {
      token0: { symbol: "USDC", amount: "5,000.00" },
      token1: { symbol: "USDT", amount: "5,000.00" },
    },
    fees: {
      token0: { symbol: "USDC", amount: "5.00" },
      token1: { symbol: "USDT", amount: "5.00" },
    },
    unclaimed: "$1.25",
    apr: "0.8%",
  },
]

export function PositionsTable() {
  const isMobile = useMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filterInRange, setFilterInRange] = useState<boolean | null>(null)
  const [priceDisplayMode, setPriceDisplayMode] = useState<Record<number, "normal" | "inverted">>({})
  // 移动端展开状态单独管理
  const [mobileExpandedStates, setMobileExpandedStates] = useState<Record<number, boolean>>({})

  // Get current page positions
  const getCurrentPagePositions = () => {
    const itemsPerPage = isMobile ? 3 : 5
    const startIndex = (currentPage - 1) * itemsPerPage
    return positionsData.slice(startIndex, startIndex + itemsPerPage)
  }

  // Toggle price display mode - use useCallback to ensure stable function reference
  const togglePriceDisplayMode = useCallback((positionId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }

    setPriceDisplayMode((prev) => ({
      ...prev,
      [positionId]: prev[positionId] === "inverted" ? "normal" : "inverted",
    }))
  }, [])

  // Get current price display mode
  const getCurrentPriceDisplayMode = (positionId: number) => {
    return priceDisplayMode[positionId] || "normal"
  }

  // Get currently displayed price range
  const getDisplayedPriceRange = (position: (typeof positionsData)[0]) => {
    const mode = getCurrentPriceDisplayMode(position.id)
    return mode === "normal" ? position.priceRange.token0PerToken1 : position.priceRange.token1PerToken0
  }

  // Get price range description
  const getPriceRangeDescription = (position: (typeof positionsData)[0]) => {
    const mode = getCurrentPriceDisplayMode(position.id)
    const [token0, token1] = position.pair.split("/")
    return mode === "normal" ? `${token0} per ${token1}` : `${token1} per ${token0}`
  }

  // Get price range title
  const getPriceRangeTitle = (position: (typeof positionsData)[0]) => {
    const [token0, token1] = position.pair.split("/")
    const mode = getCurrentPriceDisplayMode(position.id)
    return `Price Range (${mode === "normal" ? `${token0} per ${token1}` : `${token1} per ${token0}`})`
  }

  // Toggle expanded state on mobile
  const toggleMobileExpanded = useCallback((positionId: number) => {
    setMobileExpandedStates((prev) => ({
      ...prev,
      [positionId]: !prev[positionId],
    }))
  }, [])

  // Mobile position card component
  const MobilePositionCard = ({ position }: { position: (typeof positionsData)[0] }) => {
    const isExpanded = mobileExpandedStates[position.id] || false
    const currentPriceMode = getCurrentPriceDisplayMode(position.id)

    // Handle flip button click - completely independent handler function
    const handleFlipClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      togglePriceDisplayMode(position.id)
    }

    return (
      <div
        className="relative rounded-lg overflow-hidden mb-3 transition-all duration-300"
        style={{
          boxShadow: "0 0 2px #bf4ddb, 0 0 15px rgba(191,77,219,0.2), 0 0 30px rgba(168,85,247,0.1)",
          border: "1px solid rgba(191,77,219,0.2)",
        }}
      >
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] backdrop-blur-xl"></div>

        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "center center",
          }}
        ></div>

        {/* 底部发光效果 */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-purple-600/10 to-transparent"></div>

        {/* 头寸状态指示器 */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${
            position.inRange
              ? "bg-gradient-to-r from-green-400 to-green-500"
              : "bg-gradient-to-r from-yellow-400 to-yellow-500"
          }`}
        ></div>

        {/* 头寸内容 */}
        <div className="relative p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <TokenIcon symbol={position.pair.split("/")[0]} size={20} />
                <TokenIcon symbol={position.pair.split("/")[1]} size={20} />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">{position.pair}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-white/10">{position.fee}</span>
              </div>
            </div>
            <div
              className={`text-xs px-2 py-0.5 rounded-full ${
                position.inRange
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              }`}
            >
              {position.inRange ? "In Range" : "Out of Range"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="text-xs text-zinc-400">Value</div>
              <div className="text-sm font-medium">{position.value}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400">APR</div>
              <div className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {position.apr}
              </div>
            </div>
          </div>

          {/* Modify here to put Unclaimed fees and Show Details button on the same line, aligned with Value and APR above */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="text-xs text-zinc-400">Unclaimed fees</div>
              <div className="text-sm font-medium">{position.unclaimed}</div>
            </div>
            <div>
              <button
                className="flex items-center text-xs text-zinc-300 hover:text-white mt-0.5"
                onClick={() => toggleMobileExpanded(position.id)}
              >
                {isExpanded ? "Hide Details" : "Show Details"}
                <ChevronDown
                  size={14}
                  className={`ml-1 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Expanded details */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-purple-500/20">
              {/* Price range section - add COLLECT button */}
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-xs text-zinc-400 mr-1">{getPriceRangeTitle(position)}</div>
                    {/* 反转按钮 - 使用独立的处理函数 */}
                    <button onClick={handleFlipClick} className="text-white hover:text-purple-300 transition-colors">
                      <RefreshCw size={12} />
                    </button>
                  </div>
                  <div className="text-sm font-medium">{getDisplayedPriceRange(position)}</div>
                </div>
                {/* COLLECT按钮 */}
                <Button
                  size="sm"
                  className="bg-[#0f0326]/60 text-white rounded-md text-sm font-medium uppercase transition-all duration-200 h-7 px-3 relative hover:bg-[#0f0326]/80 hover:text-green-300 min-w-[120px]"
                  style={{
                    boxShadow: "0 0 10px 2px rgba(74, 222, 128, 0.2)",
                    border: "1px solid rgba(74, 222, 128, 0.4)",
                  }}
                >
                  COLLECT
                </Button>
              </div>

              {/* Token section - display liquidity and fees side by side */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                {/* Left side shows liquidity tokens */}
                <div>
                  <div className="text-xs text-zinc-400 mb-1">Liquidity Tokens</div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <TokenIcon symbol={position.liquidity.token0.symbol} size={14} />
                      <span className="text-sm ml-1">{position.liquidity.token0.amount}</span>
                    </div>
                    <div className="flex items-center">
                      <TokenIcon symbol={position.liquidity.token1.symbol} size={14} />
                      <span className="text-sm ml-1">{position.liquidity.token1.amount}</span>
                    </div>
                  </div>
                </div>

                {/* Right side shows fee tokens */}
                <div>
                  <div className="text-xs text-zinc-400 mb-1">Fee Tokens</div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <TokenIcon symbol={position.fees.token0.symbol} size={14} />
                      <span className="text-sm ml-1">{position.fees.token0.amount}</span>
                    </div>
                    <div className="flex items-center">
                      <TokenIcon symbol={position.fees.token1.symbol} size={14} />
                      <span className="text-sm ml-1">{position.fees.token1.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="bg-[#1a0445]/60 text-white rounded-md text-sm font-medium uppercase transition-all duration-200 h-7 px-2 relative hover:bg-[#1a0445]/80 hover:text-purple-300 flex-1"
                  style={{
                    boxShadow: "0 0 10px 2px rgba(93, 63, 211, 0.3)",
                    border: "1px solid rgba(93, 63, 211, 0.5)",
                  }}
                >
                  ADD
                </Button>
                <Button
                  size="sm"
                  className="bg-[#2d0a2e]/60 text-white rounded-md text-sm font-medium uppercase transition-all duration-200 h-7 px-2 relative hover:bg-[#2d0a2e]/80 hover:text-pink-300 flex-1"
                  style={{
                    boxShadow: "0 0 10px 2px rgba(236, 72, 153, 0.3)",
                    border: "1px solid rgba(236, 72, 153, 0.5)",
                  }}
                >
                  REMOVE
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Mobile pagination control component
  const MobilePagination = () => {
    const totalPages = Math.ceil(positionsData.length / 3)

    return (
      <div className="flex justify-center mt-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white hover:bg-[#1a0445]/60 rounded-md transition-colors"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </Button>

        <div className="flex items-center space-x-1 mx-2">
          {(() => {
            let startPage = Math.max(1, currentPage - 1)
            const endPage = Math.min(startPage + 2, totalPages)

            if (endPage - startPage < 2 && startPage > 1) {
              startPage = Math.max(1, endPage - 2)
            }

            return Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
              const pageNum = startPage + i
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 flex items-center justify-center text-xs rounded-md ${
                    currentPage === pageNum
                      ? "text-white/90 bg-[#1a0445]/30 border border-purple-500/20"
                      : "text-zinc-400 hover:text-white/90 hover:bg-[#1a0445]/20"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })
          })()}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white hover:bg-[#1a0445]/60 rounded-md transition-colors"
          onClick={() => setCurrentPage(Math.min(Math.ceil(positionsData.length / 3), currentPage + 1))}
          disabled={currentPage === Math.ceil(positionsData.length / 3)}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    )
  }

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full">
        {/* 筛选器 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <button
              className={`px-3 py-1 rounded-full text-xs ${
                filterInRange === null
                  ? "bg-purple-500/30 text-white border border-purple-500/40"
                  : "bg-black/30 text-zinc-400 border border-white/10"
              }`}
              onClick={() => setFilterInRange(null)}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs ml-2 ${
                filterInRange === true
                  ? "bg-green-500/30 text-green-300 border border-green-500/40"
                  : "bg-black/30 text-zinc-400 border border-white/10"
              }`}
              onClick={() => setFilterInRange(true)}
            >
              In Range
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs ml-2 ${
                filterInRange === false
                  ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/40"
                  : "bg-black/30 text-zinc-400 border border-white/10"
              }`}
              onClick={() => setFilterInRange(false)}
            >
              Out of Range
            </button>
          </div>
        </div>

        {/* 头寸列表 */}
        {getCurrentPagePositions().map((position) => (
          <MobilePositionCard key={position.id} position={position} />
        ))}

        {/* 分页 */}
        <MobilePagination />
      </div>
    )
  }

  // Desktop view
  return (
    <div
      className="rounded-lg overflow-hidden relative"
      style={{
        boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
        border: "1px solid rgba(236,72,153,0.3)",
      }}
    >
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] backdrop-blur-xl"></div>

      {/* 网格背景 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "center center",
        }}
      ></div>

      {/* 底部发光效果 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-600/5 to-transparent"></div>

      {/* 筛选器 */}
      <div className="relative px-4 py-3 border-b border-purple-500/20 flex items-center">
        <div className="flex items-center">
          <button
            className={`px-3 py-1 rounded-full text-xs ${
              filterInRange === null
                ? "bg-purple-500/30 text-white border border-purple-500/40"
                : "bg-black/30 text-zinc-400 border border-white/10"
            }`}
            onClick={() => setFilterInRange(null)}
          >
            All Positions
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs ml-2 ${
              filterInRange === true
                ? "bg-green-500/30 text-green-300 border border-green-500/40"
                : "bg-black/30 text-zinc-400 border border-white/10"
            }`}
            onClick={() => setFilterInRange(true)}
          >
            In Range
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs ml-2 ${
              filterInRange === false
                ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/40"
                : "bg-black/30 text-zinc-400 border border-white/10"
            }`}
            onClick={() => setFilterInRange(false)}
          >
            Out of Range
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider w-[180px]">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => {
                    if (sortBy === "pair") {
                      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("pair")
                      setSortDirection("desc")
                    }
                  }}
                >
                  Pool
                </button>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider w-[120px]">
                <div className="flex items-center justify-center">
                  Status
                  <InfoTooltip content="Position status relative to current price" position="top" className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[120px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => {
                    if (sortBy === "value") {
                      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("value")
                      setSortDirection("desc")
                    }
                  }}
                >
                  Value
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[120px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => {
                    if (sortBy === "apr") {
                      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("apr")
                      setSortDirection("desc")
                    }
                  }}
                >
                  APR
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[140px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => {
                    if (sortBy === "unclaimed") {
                      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                    } else {
                      setSortBy("unclaimed")
                      setSortDirection("desc")
                    }
                  }}
                >
                  Unclaimed Fees
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPagePositions().map((position) => (
              <>
                <tr
                  key={position.id}
                  className={`border-b border-purple-500/10 hover:bg-[#170538]/70 transition-all duration-200 ${
                    expandedPosition === position.id ? "bg-[#170538]/70" : ""
                  }`}
                  onMouseEnter={() => setHoveredRow(position.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <TokenIcon symbol={position.pair.split("/")[0]} size={18} />
                        <TokenIcon symbol={position.pair.split("/")[1]} size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{position.pair}</div>
                        <div className="text-xs text-zinc-400 flex items-center">
                          <span className="bg-white/10 px-1.5 py-0.5 rounded-md">{position.fee}</span>
                          <button
                            className="ml-2 text-zinc-400 hover:text-white flex items-center"
                            onClick={() => setExpandedPosition(expandedPosition === position.id ? null : position.id)}
                          >
                            <span className="text-xs">Details</span>
                            <ChevronDown
                              size={14}
                              className={`ml-1 transition-transform duration-200 ${
                                expandedPosition === position.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        position.inRange
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      }`}
                    >
                      {position.inRange ? "In Range" : "Out of Range"}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right">{position.value}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                      {position.apr}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right">{position.unclaimed}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        className="bg-[#0f0326]/60 text-white rounded-md text-sm font-medium uppercase transition-all duration-200 h-7 px-3 relative hover:bg-[#0f0326]/80 hover:text-green-300"
                        style={{
                          boxShadow: "0 0 10px 2px rgba(74, 222, 128, 0.2)",
                          border: "1px solid rgba(74, 222, 128, 0.4)",
                        }}
                      >
                        COLLECT
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedPosition === position.id && (
                  <tr className="bg-[#170538]/70">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="grid grid-cols-4 gap-4">
                        {/* 价格范围部分 - 修改为包含币种信息的标题，反转按钮去掉背景紧贴文本 */}
                        <div>
                          <div className="flex items-center mb-1">
                            <div className="text-xs text-zinc-400 mr-1">{getPriceRangeTitle(position)}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                togglePriceDisplayMode(position.id, e)
                              }}
                              className="text-white hover:text-purple-300 transition-colors"
                            >
                              <RefreshCw size={12} />
                            </button>
                          </div>
                          <div className="text-sm font-medium">{getDisplayedPriceRange(position)}</div>
                        </div>

                        {/* 流动性代币部分 */}
                        <div>
                          <div className="text-xs text-zinc-400 mb-1">Liquidity Tokens</div>
                          <div className="flex items-center">
                            <div className="flex items-center mr-4">
                              <TokenIcon symbol={position.liquidity.token0.symbol} size={16} className="mr-1" />
                              <span className="text-sm">{position.liquidity.token0.amount}</span>
                            </div>
                            <div className="flex items-center">
                              <TokenIcon symbol={position.liquidity.token1.symbol} size={16} className="mr-1" />
                              <span className="text-sm">{position.liquidity.token1.amount}</span>
                            </div>
                          </div>
                        </div>

                        {/* 手续费代币部分 */}
                        <div>
                          <div className="text-xs text-zinc-400 mb-1">Unclaimed Fees</div>
                          <div className="flex items-center">
                            <div className="flex items-center mr-4">
                              <TokenIcon symbol={position.fees.token0.symbol} size={16} className="mr-1" />
                              <span className="text-sm">{position.fees.token0.amount}</span>
                            </div>
                            <div className="flex items-center">
                              <TokenIcon symbol={position.fees.token1.symbol} size={16} className="mr-1" />
                              <span className="text-sm">{position.fees.token1.amount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons - placed on the same line and icons removed */}
                        <div className="flex flex-row justify-between items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-[#1a0445]/60 text-white rounded-md text-sm font-medium uppercase transition-all duration-200 h-7 px-3 relative hover:bg-[#1a0445]/80 hover:text-purple-300 flex-1"
                            style={{
                              boxShadow: "0 0 10px 2px rgba(93, 63, 211, 0.3)",
                              border: "1px solid rgba(93, 63, 211, 0.5)",
                            }}
                          >
                            ADD
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#2d0a2e]/60 text-white rounded-md text-sm font-medium uppercase transition-all duration-200 h-7 px-3 relative hover:bg-[#2d0a2e]/80 hover:text-pink-300 flex-1"
                            style={{
                              boxShadow: "0 0 10px 2px rgba(236, 72, 153, 0.3)",
                              border: "1px solid rgba(236, 72, 153, 0.5)",
                            }}
                          >
                            REMOVE
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="relative flex items-center justify-center px-4 py-3 border-t border-purple-500/20">
        <nav className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-[#1a0445]/40 transition-colors"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="flex items-center space-x-2 mx-3">
            {(() => {
              const totalPages = Math.ceil(positionsData.length / 5)
              const pages = []

              // 确定显示的页码范���
              let startPage = Math.max(1, currentPage - 1)
              const endPage = Math.min(startPage + 2, totalPages)

              // 调整起始页，确保显示三个页码（如果有足够的页数）
              if (endPage - startPage < 2 && startPage > 1) {
                startPage = Math.max(1, endPage - 2)
              }

              // 生成页码按钮
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-9 h-9 flex items-center justify-center text-sm rounded-md transition-all duration-200 ${
                      currentPage === i
                        ? "text-white/90 relative"
                        : "text-zinc-400 hover:text-white/90 hover:bg-[#1a0445]/20"
                    }`}
                  >
                    {currentPage === i && (
                      <div className="absolute inset-0 rounded-md bg-[#1a0445]/30 border border-purple-500/20"></div>
                    )}
                    <span className="relative z-10">{i}</span>
                  </button>,
                )
              }

              return pages
            })()}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-[#1a0445]/40 transition-colors"
            onClick={() => setCurrentPage(Math.min(Math.ceil(positionsData.length / 5), currentPage + 1))}
            disabled={currentPage === Math.ceil(positionsData.length / 5)}
          >
            <ChevronRight size={16} />
          </Button>
        </nav>
      </div>
    </div>
  )
}
