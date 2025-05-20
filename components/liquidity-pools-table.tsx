"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowUpDown, ChevronUp, ChevronDown, X } from "lucide-react"
import { TokenIcon } from "@/components/ui/token-icon"
import { Button } from "@/components/ui/button"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for the pools
const poolsData = [
  {
    id: 1,
    pair: "ezETH/WETH",
    fee: "1.0%",
    volume: "$1.9k",
    tvl: "$2.80m",
    apr: "0.05%",
    fees: "$0.96",
  },
  {
    id: 2,
    pair: "USDB/WETH",
    fee: "1.0%",
    volume: "$951.04k",
    tvl: "$2.39m",
    apr: "7.62%",
    fees: "$475.52",
  },
  {
    id: 3,
    pair: "USDB/WETH",
    fee: "0.3%",
    volume: "$1.13k",
    tvl: "$1.62m",
    apr: "0.41%",
    fees: "$3.39",
  },
  {
    id: 4,
    pair: "USDB/USDC",
    fee: "1.0%",
    volume: "$18.49k",
    tvl: "$1.29m",
    apr: "0.76%",
    fees: "$9.24",
  },
  {
    id: 5,
    pair: "WETH/bPEPE",
    fee: "0.3%",
    volume: "$1.09k",
    tvl: "$1.24m",
    apr: "0.05%",
    fees: "$3.27",
  },
  {
    id: 6,
    pair: "WETH/BLAST",
    fee: "0.3%",
    volume: "$107.28k",
    tvl: "$490.28k",
    apr: "16.36%",
    fees: "$321.83",
  },
  {
    id: 7,
    pair: "sUSD/USDB",
    fee: "1.0%",
    volume: "$4.13k",
    tvl: "$415.89k",
    apr: "0.99%",
    fees: "$2.06",
  },
  {
    id: 8,
    pair: "WETH/OLE",
    fee: "0.3%",
    volume: "$8.70k",
    tvl: "$374.23k",
    apr: "1.70%",
    fees: "$26.09",
  },
  {
    id: 9,
    pair: "USDB/WETH",
    fee: "0.3%",
    volume: "$17.02k",
    tvl: "$340.63k",
    apr: "14.52%",
    fees: "$51.07",
  },
  {
    id: 10,
    pair: "USDB/axlUSD",
    fee: "1.0%",
    volume: "$131.98k",
    tvl: "$333.72k",
    apr: "3.61%",
    fees: "$65.99",
  },
]

interface LiquidityPoolsTableProps {
  poolType?: string
  sortOption?: string | null
  searchTerm?: string
}

export function LiquidityPoolsTable({
  poolType = "all",
  sortOption = null,
  searchTerm = "",
}: LiquidityPoolsTableProps) {
  const isMobile = useMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedPool, setSelectedPool] = useState<number | null>(null)
  const [visiblePools, setVisiblePools] = useState(poolsData)
  const filterMenuRef = useRef<HTMLDivElement>(null)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  // 处理排序逻辑
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  // 根据排序和筛选更新可见池子
  useEffect(() => {
    let filtered = [...poolsData]

    // 应用搜索筛选
    if (localSearchTerm) {
      filtered = filtered.filter((pool) => pool.pair.toLowerCase().includes(localSearchTerm.toLowerCase()))
    }

    // 应用池子类型筛选
    if (poolType !== "all") {
      // 这里需要根据实际数据结构调整筛选逻辑
      filtered = filtered.filter((pool) => {
        // 示例筛选逻辑，根据实际数据结构调整
        if (poolType === "stablecoin") {
          return pool.pair.includes("USD") || pool.pair.includes("DAI")
        } else if (poolType === "memecoin") {
          return pool.pair.includes("PEPE") || pool.pair.includes("DOGE")
        } else if (poolType === "defi") {
          return !pool.pair.includes("USD") && !pool.pair.includes("PEPE")
        }
        return true
      })
    }

    // 应用排序
    if (sortOption) {
      const [field, direction] = sortOption.split("-")

      filtered.sort((a, b) => {
        let valueA, valueB

        // 根据字段获取值
        switch (field) {
          case "tvl":
            valueA = Number.parseFloat(a.tvl.replace(/[^0-9.]/g, ""))
            valueB = Number.parseFloat(b.tvl.replace(/[^0-9.]/g, ""))
            break
          case "apr":
            valueA = Number.parseFloat(a.apr.replace(/[^0-9.]/g, ""))
            valueB = Number.parseFloat(b.apr.replace(/[^0-9.]/g, ""))
            break
          case "volume":
            valueA = Number.parseFloat(a.volume.replace(/[^0-9.]/g, ""))
            valueB = Number.parseFloat(b.volume.replace(/[^0-9.]/g, ""))
            break
          default:
            valueA = a.id
            valueB = b.id
        }

        // 根据排序方向排序
        return direction === "asc" ? valueA - valueB : valueB - valueA
      })
    }

    setVisiblePools(filtered)
  }, [poolType, sortOption, localSearchTerm])

  // 点击外部关闭筛选菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // 渲染排序图标
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown size={14} className="ml-1 opacity-50" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="ml-1" />
    ) : (
      <ChevronDown size={14} className="ml-1" />
    )
  }

  // 移动端池子详情组件
  const MobilePoolDetails = ({ pool }: { pool: (typeof poolsData)[0] }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedPool(null)}></div>
        <div
          className="w-full max-w-xs rounded-xl overflow-hidden z-10 relative"
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

          <div className="relative p-3 border-b border-pink-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <TokenIcon symbol={pool.pair.split("/")[0]} size={22} />
                  <TokenIcon symbol={pool.pair.split("/")[1]} size={22} />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{pool.pair}</h3>
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-white/10">{pool.fee}</span>
                </div>
              </div>
              <button
                className="text-white/70 hover:text-white transition-colors"
                onClick={() => setSelectedPool(null)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="relative p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Volume (24h)</div>
                <div className="text-xl font-medium">{pool.volume}</div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">TVL</div>
                <div className="text-xl font-medium">{pool.tvl}</div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">APR</div>
                <div className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  {pool.apr}
                </div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Fees (24h)</div>
                <div className="text-xl font-medium">{pool.fees}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                className="bg-[#1a0445]/60 text-white rounded-md text-sm font-medium transition-all duration-200 h-10 px-0 relative hover:bg-[#1a0445]/80 hover:text-purple-300 hover:scale-105"
                style={{
                  boxShadow: "0 0 10px 2px rgba(93, 63, 211, 0.3)",
                  border: "1px solid rgba(93, 63, 211, 0.5)",
                }}
              >
                Swap
              </Button>
              <Button
                className="bg-[#2d0a2e]/60 text-white rounded-md text-sm font-medium transition-all duration-200 h-10 px-0 relative hover:bg-[#2d0a2e]/80 hover:text-pink-300 hover:scale-105"
                style={{
                  boxShadow: "0 0 10px 2px rgba(236, 72, 153, 0.3)",
                  border: "1px solid rgba(236, 72, 153, 0.5)",
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 移动端池子卡片组件
  const MobilePoolCard = ({ pool }: { pool: (typeof poolsData)[0] }) => {
    return (
      <div
        className="relative rounded-lg p-3 mb-1 transition-colors w-full shadow-sm shadow-purple-500/10 overflow-hidden"
        onClick={() => setSelectedPool(pool.id)}
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

        <div className="relative flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <TokenIcon symbol={pool.pair.split("/")[0]} size={20} />
              <TokenIcon symbol={pool.pair.split("/")[1]} size={20} />
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold text-sm">{pool.pair}</div>
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-white/10">{pool.fee}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <span className="text-xs text-zinc-400 mr-1">APR:</span>
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {pool.apr}
              </span>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <span className="text-zinc-400 mr-1">Volume:</span>
            <span className="font-medium">{pool.volume}</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-zinc-400 mr-1">TVL:</span>
            <span className="font-medium">{pool.tvl}</span>
          </div>
        </div>
      </div>
    )
  }

  // 移动端筛选菜单
  const MobileFilterMenu = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilterMenu(false)}></div>
        <div
          ref={filterMenuRef}
          className="w-full max-w-md rounded-t-xl overflow-hidden z-10 p-4 pb-8 relative"
          style={{
            boxShadow: "0 -2px 15px rgba(191,77,219,0.2)",
            border: "1px solid rgba(191,77,219,0.2)",
            borderBottom: "none",
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
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-600/10 to-transparent"></div>

          <div className="relative flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Filter Pools</h3>
            <button
              className="rounded-full p-1 bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setShowFilterMenu(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Search</label>
              <input
                type="text"
                placeholder="Search by token..."
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Sort by</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`p-2 rounded-lg text-sm ${sortColumn === "tvl" ? "bg-purple-600/30 text-white" : "bg-black/20 text-zinc-300"}`}
                  onClick={() => handleSort("tvl")}
                >
                  TVL {sortColumn === "tvl" && (sortDirection === "asc" ? "↑" : "↓")}
                </button>
                <button
                  className={`p-2 rounded-lg text-sm ${sortColumn === "apr" ? "bg-purple-600/30 text-white" : "bg-black/20 text-zinc-300"}`}
                  onClick={() => handleSort("apr")}
                >
                  APR {sortColumn === "apr" && (sortDirection === "asc" ? "↑" : "↓")}
                </button>
                <button
                  className={`p-2 rounded-lg text-sm ${sortColumn === "volume" ? "bg-purple-600/30 text-white" : "bg-black/20 text-zinc-300"}`}
                  onClick={() => handleSort("volume")}
                >
                  Volume {sortColumn === "volume" && (sortDirection === "asc" ? "↑" : "↓")}
                </button>
                <button
                  className={`p-2 rounded-lg text-sm ${sortColumn === "fees" ? "bg-purple-600/30 text-white" : "bg-black/20 text-zinc-300"}`}
                  onClick={() => handleSort("fees")}
                >
                  Fees {sortColumn === "fees" && (sortDirection === "asc" ? "↑" : "↓")}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Fee tier</label>
              <div className="flex gap-2">
                <button
                  className={`p-2 rounded-lg text-sm flex-1 ${activeFilter === "1.0%" ? "bg-purple-600/30 text-white" : "bg-black/20 text-zinc-300"}`}
                  onClick={() => setActiveFilter(activeFilter === "1.0%" ? null : "1.0%")}
                >
                  1.0%
                </button>
                <button
                  className={`p-2 rounded-lg text-sm flex-1 ${activeFilter === "0.3%" ? "bg-purple-600/30 text-white" : "bg-black/20 text-zinc-300"}`}
                  onClick={() => setActiveFilter(activeFilter === "0.3%" ? null : "0.3%")}
                >
                  0.3%
                </button>
                <button
                  className={`p-2 rounded-lg text-sm flex-1 ${activeFilter === "1%" ? "bg-purple-600/30 text-white" : "bg-black/20 text-zinc-300"}`}
                  onClick={() => setActiveFilter(activeFilter === "1%" ? null : "1%")}
                >
                  1%
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                className="w-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white"
                onClick={() => setShowFilterMenu(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 移动端表格头部
  const MobileTableHeader = () => {
    return (
      <div className="flex items-center mb-0">
        <div className="flex items-center gap-2">
          {activeFilter && (
            <div className="flex items-center bg-purple-600/20 text-white text-xs px-2 py-1 rounded-full">
              {activeFilter}
              <button className="ml-1 text-white/70 hover:text-white" onClick={() => setActiveFilter(null)}>
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 获取当前页的池子
  const getCurrentPagePools = () => {
    const itemsPerPage = isMobile ? 5 : 10
    const startIndex = (currentPage - 1) * itemsPerPage
    // 返回当前页的数据，但总是保持相同的数据以模拟多页
    return visiblePools.slice(0, itemsPerPage)
  }

  // 移动端分页控制组件
  const MobilePagination = () => {
    // 强制设置为5页，用于演示
    const totalPages = 5

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
          onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
          disabled={currentPage === 5}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    )
  }

  // 渲染移动端视图
  if (isMobile) {
    return (
      <div className="w-full">
        <MobileTableHeader />

        {visiblePools.length === 0 ? (
          <div className="text-center py-8 text-zinc-400">No pools match your filters</div>
        ) : (
          <div className="w-full">
            {getCurrentPagePools().map((pool) => (
              <MobilePoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        )}

        <MobilePagination />

        {showFilterMenu && <MobileFilterMenu />}
        {selectedPool && <MobilePoolDetails pool={poolsData.find((p) => p.id === selectedPool)!} />}
      </div>
    )
  }

  // 渲染PC端视图 - 保持原有的表格布局
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

      <div className="relative overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="w-[20px]"></th>
              <th className="px-1 py-3 text-center text-xs font-medium text-zinc-300 uppercase tracking-wider w-[14px] text-shadow-sm">
                #
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider w-[140px]">
                <button className="flex items-center focus:outline-none" onClick={() => handleSort("pool")}>
                  Pool {renderSortIcon("pool")}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider whitespace-nowrap w-[110px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => handleSort("volume")}
                >
                  Volume (24H) {renderSortIcon("volume")}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[110px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => handleSort("tvl")}
                >
                  TVL {renderSortIcon("tvl")}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[110px]">
                <div className="flex items-center justify-end">
                  <button
                    className="flex items-center justify-end ml-auto focus:outline-none"
                    onClick={() => handleSort("apr")}
                  >
                    APR {renderSortIcon("apr")}
                  </button>
                  <InfoTooltip
                    content="Annual Percentage Rate based on 24h trading volume"
                    position="top"
                    className="ml-1"
                  />
                </div>
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider whitespace-nowrap w-[110px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => handleSort("fees")}
                >
                  Fees (24H) {renderSortIcon("fees")}
                </button>
              </th>
              <th className="w-[20px]"></th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPagePools().map((pool) => (
              <tr
                key={pool.id}
                className="border-b border-purple-500/10 hover:bg-[#170538]/70 transition-all duration-200"
                onMouseEnter={() => setHoveredRow(pool.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="w-[25px]"></td>
                <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-zinc-200 text-center">{pool.id}</td>
                <td className="px-2 py-4 whitespace-nowrap overflow-hidden">
                  <div className="flex items-center w-full">
                    <div className="flex -space-x-2 mr-2 flex-shrink-0">
                      <TokenIcon symbol={pool.pair.split("/")[0]} size={18} />
                      <TokenIcon symbol={pool.pair.split("/")[1]} size={18} />
                    </div>
                    <span className="font-bold text-base tracking-tighter font-mono flex-shrink-0">{pool.pair}</span>
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-white/10 flex-shrink-0">{pool.fee}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-zinc-300 text-right">{pool.volume}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-zinc-300 text-right">{pool.tvl}</td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)] relative">
                      {pool.apr}
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></span>
                    </span>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-zinc-300 relative text-right">
                  {hoveredRow === pool.id ? (
                    <div className="absolute inset-0 flex items-center justify-end pr-2 space-x-2">
                      <Button
                        size="sm"
                        className="w-[60px] bg-[#0c0414] text-white rounded-md text-xs font-medium transition-all duration-200 h-7 px-0 relative hover:bg-[#150a28] hover:text-purple-300 hover:scale-105"
                        style={{
                          boxShadow: "0 0 10px 2px rgba(93, 63, 211, 0.3)",
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-md"
                          style={{
                            border: "1px solid rgba(93, 63, 211, 0.8)",
                            boxShadow: "inset 0 0 4px rgba(93, 63, 211, 0.5)",
                          }}
                        ></div>
                        Swap
                      </Button>
                      <Button
                        size="sm"
                        className="w-[60px] bg-[#0c0414] text-white rounded-md text-xs font-medium transition-all duration-200 h-7 px-0 relative hover:bg-[#1a0a1e] hover:text-pink-300 hover:scale-105"
                        style={{
                          boxShadow: "0 0 10px 2px rgba(236, 72, 153, 0.3)",
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-md"
                          style={{
                            border: "1px solid rgba(236, 72, 153, 0.8)",
                            boxShadow: "inset 0 0 4px rgba(236, 72, 153, 0.5)",
                          }}
                        ></div>
                        Add
                      </Button>
                    </div>
                  ) : (
                    pool.fees
                  )}
                </td>
                <td className="w-[25px]"></td>
              </tr>
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
              // 强制设置为5页，用于演示
              const totalPages = 5
              const pages = []

              // 确定要显示的页码范围
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
            onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
            disabled={currentPage === 5}
          >
            <ChevronRight size={16} />
          </Button>
        </nav>
      </div>
    </div>
  )
}
