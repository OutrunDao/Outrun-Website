"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// Import components
import { LockedProjectDetails } from "@/components/memeverse/detail/locked-project-details"
import { LockedOverviewTab } from "@/components/memeverse/detail/locked-overview-tab"
import { LiquidityTab } from "@/components/memeverse/detail/liquidity-tab"
import { POLTab } from "@/components/memeverse/detail/pol-tab"
import { YieldVaultTab } from "@/components/memeverse/detail/yield-vault-tab"
import { DAOTab } from "@/components/memeverse/detail/dao-tab"
import { MOCK_PROJECTS } from "@/data/memeverse-projects"

// 修改Stage颜色映射，使用更加统一的渐变和阴影效果
const STAGE_COLORS: Record<string, { bg: string; text: string; glow: string; gradient: string }> = {
  Genesis: {
    bg: "bg-purple-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(168,85,247,0.7)]",
    gradient: "from-purple-600 via-pink-500 to-purple-600",
  },
  Refund: {
    bg: "bg-red-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(239,68,68,0.7)]",
    gradient: "from-red-600 via-orange-500 to-red-600",
  },
  Locked: {
    bg: "bg-pink-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(236,72,153,0.7)]",
    gradient: "from-pink-600 via-purple-500 to-pink-600",
  },
  Unlocked: {
    bg: "bg-cyan-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(6,182,212,0.7)]",
    gradient: "from-cyan-500 via-blue-500 to-cyan-500",
  },
}

export default function LockedDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [verse, setVerse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const verseId = params.id
    if (!verseId) {
      setError("Verse ID does not exist")
      setLoading(false)
      return
    }

    // Simulate API request
    setTimeout(() => {
      const foundVerse = MOCK_PROJECTS.find((p) => p.id.toString() === verseId.toString())
      if (foundVerse) {
        // 确保项目有社交媒体链接和必要的时间字段
        const currentDate = new Date()
        const threeMonthsLater = new Date(currentDate)
        threeMonthsLater.setMonth(currentDate.getMonth() + 3)

        const verseWithAllFields = {
          ...foundVerse,
          website: foundVerse.website || "https://outrun.network",
          x: foundVerse.x || "https://x.com/outrunnetwork",
          telegram: foundVerse.telegram || "https://t.me/outrunnetwork",
          discord: foundVerse.discord || "https://discord.gg/outrun",
          // 确保时间字段存在
          createdAt: foundVerse.createdAt || currentDate.toISOString(),
          genesisEndTime: foundVerse.genesisEndTime || currentDate.toISOString(),
          unlockTime: foundVerse.unlockTime || threeMonthsLater.toISOString(),
          // 为Locked阶段添加额外字段
          circulatingSupply: 1000000000,
          totalSupply: 10000000000,
          holders: 1200,
          // 修改阶段为Locked
          stage: "Locked",
        }
        setVerse(verseWithAllFields)
        setLoading(false)
      } else {
        setError(`Cannot find memeverse with verseId ${verseId}`)
        setLoading(false)
      }
    }, 500) // Simulate loading delay
  }, [params.id])

  // Handle back button click
  const handleBackClick = () => {
    router.push("/memeverse/board")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-300">Loading memeverse details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">Memeverse Not Found</h1>
          <p className="text-pink-300 mb-8">{error}</p>
          <Button
            onClick={handleBackClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to board
          </Button>
        </div>
      </div>
    )
  }

  if (!verse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">Memeverse Not Found</h1>
          <p className="text-pink-300 mb-8">Unable to load verse details. Please return to the board and try again.</p>
          <Button
            onClick={handleBackClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <ChevronLeft className="mr-0.5 h-4 w-4" />
            Back to Board
          </Button>
        </div>
      </div>
    )
  }

  const stageStyle = STAGE_COLORS[verse.stage] || {
    bg: "bg-gray-600",
    text: "text-white",
    glow: "",
    gradient: "from-gray-600 to-gray-500",
  }

  return (
    <div className="min-h-screen">
      {/* Page content - increased top spacing */}
      <div className="max-w-6xl px-2 md:px-4 mx-auto py-12 pt-28">
        {/* Back button - Outrun风格美化 */}
        <Button
          onClick={handleBackClick}
          variant="outline"
          className="mb-6 relative overflow-hidden group"
          style={{
            background: "rgba(15, 3, 38, 0.8)",
            border: "1px solid rgba(236, 72, 153, 0.4)",
            borderRadius: "9999px",
            boxShadow: "0 0 10px rgba(236, 72, 153, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)",
            padding: "8px 16px",
          }}
        >
          {/* 背景渐变效果 */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-purple-600/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></span>

          {/* 发光边框效果 */}
          <span
            className="absolute inset-00 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: "inset 0 0 8px rgba(236, 72, 153, 0.6), 0 0 12px rgba(168, 85, 247, 0.4)",
            }}
          ></span>

          {/* 按钮内容 */}
          <div className="flex items-center relative z-10">
            <ChevronLeft className="mr-1 h-4 w-4 text-pink-300 group-hover:text-pink-200 transition-colors duration-300" />
            <span className="text-pink-300 group-hover:text-pink-200 transition-colors duration-300 font-medium">
              Back to Board
            </span>
          </div>
        </Button>

        {/* 项目详情卡片 */}
        <div
          className="relative rounded-xl overflow-hidden p-4 md:p-6 mb-8"
          style={{
            boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
            border: "1px solid rgba(236,72,153,0.3)",
          }}
        >
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/90 via-[#1a0445]/90 to-[#0f0326]/90 backdrop-blur-sm"></div>
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

          <div className="relative">
            <LockedProjectDetails project={verse} stageStyle={stageStyle} />
          </div>
        </div>

        {/* 标签内容区域 */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
            border: "1px solid rgba(236,72,153,0.3)",
          }}
        >
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/90 via-[#1a0445]/90 to-[#0f0326]/90 backdrop-blur-sm"></div>
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

          {/* 标签导航 */}
          <div className="relative">
            <div className="flex items-center px-6 pt-4 pb-0 space-x-1 overflow-x-auto scrollbar-hide">
              {["overview", "liquidity", "pol", "yield-vault", "dao"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab ? "text-white" : "text-pink-300/80 hover:text-pink-200 hover:bg-purple-900/20"
                  }`}
                >
                  {/* 活动标签的背景效果 */}
                  {activeTab === tab && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient-x"></span>
                  )}
                  {/* 标签文本 */}
                  <span className="relative z-10">
                    {tab === "overview"
                      ? "Overview"
                      : tab === "liquidity"
                        ? "Liquidity"
                        : tab === "pol"
                          ? "POL"
                          : tab === "yield-vault"
                            ? "Yield Vault"
                            : "DAO"}
                  </span>
                </button>
              ))}
            </div>

            {/* 内容与标签导航之间的分隔线 */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mx-6 mt-4"></div>

            {/* 标签内容 */}
            <div className="relative pt-4 px-6 pb-6">
              {activeTab === "overview" && (
                <LockedOverviewTab
                  description={verse.description}
                  website={verse.website}
                  x={verse.x}
                  telegram={verse.telegram}
                  discord={verse.discord}
                  name={verse.name}
                  symbol={verse.symbol}
                  image="/placeholder.svg"
                  omnichain={verse.omnichain}
                />
              )}
              {activeTab === "liquidity" && <LiquidityTab project={verse} />}
              {activeTab === "pol" && <POLTab project={verse} />}
              {activeTab === "yield-vault" && <YieldVaultTab project={verse} />}
              {activeTab === "dao" && <DAOTab project={verse} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
