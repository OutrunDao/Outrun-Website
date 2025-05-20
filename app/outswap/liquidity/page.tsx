"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Plus, Filter, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiquidityPoolsTable } from "@/components/liquidity-pools-table"
import { PositionsTable } from "@/components/positions-table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "@/components/ui/search"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function LiquidityPage() {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeView, setActiveView] = useState<"pools" | "positions">("pools")

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [sortOption, setSortOption] = useState<string | null>(null)

  // Prevent scroll penetration
  useEffect(() => {
    if (showFilterMenu) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showFilterMenu])

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-screen">

      {/* Hero Section - simplified display on mobile */}
      <section className={`relative ${isMobile ? "pt-24 pb-4" : "pt-24 pb-6"} overflow-hidden`}>
        {/* Hero overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/40 via-[#1a0445]/40 to-[#000000]/30 opacity-30" />

        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="flex flex-col items-start text-left space-y-6 max-w-4xl">
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="space-y-6">
              <h1
                className={`${isMobile ? "text-3xl" : "text-4xl md:text-5xl"} font-bold tracking-tighter text-[#ff6b6b] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]`}
              >
                EARN WITH
                <br />
                YOUR LIQUIDITY
              </h1>

              {/* Place Volume and TVL in the same row on mobile */}
              {isMobile ? (
                <div className="flex justify-between items-center gap-4 w-full max-w-md">
                  <div className="space-y-1">
                    <p className="text-zinc-400 text-sm">Volume (24H):</p>
                    <p className="text-xl font-mono font-bold text-white">$1.26M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-400 text-sm">TVL:</p>
                    <p className="text-xl font-mono font-bold text-white">$23.52M</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-8 max-w-md">
                  <div className="space-y-1">
                    <p className="text-zinc-400 text-sm">Volume (24H):</p>
                    <p className="text-2xl md:text-4xl font-mono font-bold text-white">$1.26M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-400 text-sm">TVL:</p>
                    <p className="text-2xl md:text-4xl font-mono font-bold text-white">$23.52M</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pools Section */}
      <section className="py-4 relative">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          {/* Title and create button - only displayed on desktop */}
          {!isMobile && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveView("pools")}
                  className={`text-2xl font-bold relative ${
                    activeView === "pools"
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  TOP POOLS
                  {activeView === "pools" && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e]"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveView("positions")}
                  className={`text-2xl font-bold relative ${
                    activeView === "positions"
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  POSITIONS
                  {activeView === "positions" && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e]"></span>
                  )}
                </button>
              </div>
              <Link href="/outswap/liquidity/add">
                <Button className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] hover:from-[#ff5a5a] hover:to-[#ff7a7a] text-white border-0 rounded-lg px-4 h-9 text-sm shadow-[0_0_15px_rgba(255,107,107,0.5)] w-auto flex items-center justify-center">
                  <Plus className="mr-0.25 h-4 w-4" />
                  Create Position
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile title and buttons */}
          {isMobile && (
            <div className="flex flex-col mb-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 h-7">
                  <button
                    onClick={() => setActiveView("pools")}
                    className={`text-base font-bold relative h-full flex items-center ${
                      activeView === "pools"
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    TOP POOLS
                    {activeView === "pools" && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveView("positions")}
                    className={`text-base font-bold relative h-full flex items-center ${
                      activeView === "positions"
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    POSITIONS
                    {activeView === "positions" && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e]"></span>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/outswap/liquidity/add">
                    <Button className="bg-gradient-to-r from-[#ff6b6b]/90 to-[#ff8e8e]/90 hover:from-[#ff5a5a] hover:to-[#ff7a7a] text-white border-0 rounded-lg px-2 h-7 text-xs shadow-[0_0_10px_rgba(255,107,107,0.4)] flex items-center justify-center">
                      Create Position
                    </Button>
                  </Link>
                  {activeView === "pools" && (
                    <button
                      className="h-7 w-7 rounded-lg bg-[#150a2e] border border-[#2a1b4a]/30 hover:bg-[#1d0c3e] transition-all duration-200 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                      onClick={() => setShowFilterMenu(true)}
                      aria-label="Filter and sort"
                    >
                      <Filter size={16} className="text-white/80" />
                    </button>
                  )}
                </div>
              </div>

              {/* Only show search box in TOP POOLS view */}
              {activeView === "pools" && (
                <Search
                  placeholder="Search pools by tokens"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery("")}
                  className="bg-black/40 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-0 focus:border-[#ff6b6b]/50 transition-all duration-300 shadow-inner shadow-black/20 mb-1 h-8 text-xs py-0"
                />
              )}
            </div>
          )}

          {/* Search and filter - only displayed on desktop and in TOP POOLS view */}
          {!isMobile && activeView === "pools" && (
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
              <div className="relative w-full md:w-2/5">
                <Search
                  placeholder="Search pools by tokens"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery("")}
                  className="bg-black/40 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-0 focus:border-[#ff6b6b]/50 transition-all duration-300 shadow-inner shadow-black/20"
                />
              </div>

              <div className="flex justify-end">
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList className="bg-black/40 border border-white/10">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="stablecoin">Stablecoin</TabsTrigger>
                    <TabsTrigger value="memecoin">Memecoin</TabsTrigger>
                    <TabsTrigger value="defi">DeFi</TabsTrigger>
                    <TabsTrigger value="game">Game</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          )}

          {/* Table content - switches based on activeView */}
          <div className="max-w-5xl mx-auto mt-1">
            {activeView === "pools" ? (
              <LiquidityPoolsTable poolType={activeTab} sortOption={sortOption} searchTerm={searchQuery} />
            ) : (
              <PositionsTable />
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter menu - only displayed in TOP POOLS view */}
      {isMobile && showFilterMenu && activeView === "pools" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowFilterMenu(false)}></div>
          <div
            className="w-full max-w-xs bg-[#0f0726]/90 backdrop-blur-md rounded-xl overflow-hidden z-10 p-4 m-4"
            style={{
              boxShadow: "0 0 2px #bf4ddb, 0 0 15px rgba(191,77,219,0.3), 0 0 30px rgba(168,85,247,0.15)",
              border: "1px solid rgba(191,77,219,0.3)",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Filter Pools</h3>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setShowFilterMenu(false)}
              >
                <X size={20} className="text-white/80" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[#9d8cb0] mb-2 text-sm font-medium">Pool Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "all", label: "All Pools" },
                    { id: "stablecoin", label: "Stablecoin" },
                    { id: "memecoin", label: "Memecoin" },
                    { id: "defi", label: "DeFi" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      className={`relative py-2 px-3 rounded-lg text-center transition-all duration-300 ${
                        activeTab === option.id ? "text-white font-medium" : "text-[#9d8cb0] hover:text-white"
                      }`}
                      onClick={() => setActiveTab(option.id)}
                    >
                      <div
                        className={`absolute inset-0 rounded-lg ${
                          activeTab === option.id ? "bg-[#2d0f5e]" : "bg-[#150a2e] hover:bg-[#1d0c3e]"
                        }`}
                      ></div>
                      {activeTab === option.id && (
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#9d4edd]/30 to-transparent opacity-50"></div>
                      )}
                      <span className="relative z-10">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[#9d8cb0] mb-2 text-sm font-medium">Sort By</p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: "tvl-desc", label: "TVL: High to Low" },
                    { id: "tvl-asc", label: "TVL: Low to High" },
                    { id: "apr-desc", label: "APR: High to Low" },
                    { id: "apr-asc", label: "APR: Low to High" },
                    { id: "volume-desc", label: "Volume: High to Low" },
                    { id: "volume-asc", label: "Volume: Low to High" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      className={`relative py-2 px-3 rounded-lg text-left transition-all duration-300 ${
                        sortOption === option.id ? "text-white font-medium" : "text-[#9d8cb0] hover:text-white"
                      }`}
                      onClick={() => setSortOption(option.id)}
                    >
                      <div
                        className={`absolute inset-0 rounded-lg ${
                          sortOption === option.id ? "bg-[#2d0f5e]" : "bg-[#150a2e] hover:bg-[#1d0c3e]"
                        }`}
                      ></div>
                      {sortOption === option.id && (
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#9d4edd]/30 to-transparent opacity-50"></div>
                      )}
                      <span className="relative z-10 flex items-center">
                        {option.label}
                        {sortOption === option.id && <Check size={16} className="ml-auto text-[#9d4edd]" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white font-medium transition-all duration-300 hover:from-[#ff5a5a] hover:to-[#ff7a7a] hover:shadow-[0_0_15px_rgba(255,107,107,0.5)]"
                onClick={() => setShowFilterMenu(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
