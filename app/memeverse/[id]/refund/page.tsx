"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

// Mock data - QPEPE project in Refund stage
const MOCK_VERSE = [
  {
    id: 28, // QPEPE ID in projects list
    name: "Quantum Pepe",
    symbol: "QPEPE",
    description:
      "Quantum computing themed Pepe variant with cross-chain bridges. This innovative meme token combines the viral nature of Pepe with advanced quantum computing concepts, creating a unique digital asset with cross-chain compatibility.",
    stage: "Refund",
    mode: "normal",
    raisedAmount: 8.5, // 修改为8.5 UETH
    raisedToken: "UETH",
    population: 18,
    marketCap: 64000,
    progress: 6.4,
    genesisEndTime: "2023-06-15T12:00:00Z",
    createdAt: "2023-05-15T08:20:00Z",
    refundReason: "Insufficient funds raised during Genesis phase",
    refundAmount: 2.5, // User's refund amount
    refundToken: "UETH",
    refundDeadline: "2023-07-15T12:00:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
    website: "https://quantumpepe.io",
    x: "https://x.com/quantumpepe",
    telegram: "https://t.me/quantumpepe",
    discord: "https://discord.gg/quantumpepe",
  },
]

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

// Format date time function to display in UTC time
function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr)

  // 获取 UTC 年、月、日
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")

  // 获取 UTC 小时、分钟
  const hours = String(date.getUTCHours()).padStart(2, "0")
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")

  // 返回格式化的 UTC 日期时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes} (UTC)`
}

// 计算剩余时间
function getRemainingTime(endTimeStr: string): { days: number; hours: number; minutes: number; expired: boolean } {
  const endTime = new Date(endTimeStr).getTime()
  const now = Date.now()
  const diff = endTime - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes, expired: false }
}

export default function VerseRefundPage() {
  const router = useRouter()
  const params = useParams()
  const [verse, setVerse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refundProcessing, setRefundProcessing] = useState(false)
  const [refundComplete, setRefundComplete] = useState(false)
  const [remainingTime, setRemainingTime] = useState<{
    days: number
    hours: number
    minutes: number
    expired: boolean
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    expired: false,
  })

  useEffect(() => {
    const verseId = params.id
    if (!verseId) {
      setError("Verse ID does not exist")
      setLoading(false)
      return
    }

    // Simulate API request
    setTimeout(() => {
      const foundVerse = MOCK_VERSE.find((p) => p.id.toString() === verseId.toString())
      if (foundVerse) {
        setVerse(foundVerse)

        // 初始化剩余时间
        if (foundVerse.refundDeadline) {
          setRemainingTime(getRemainingTime(foundVerse.refundDeadline))
        }

        setLoading(false)
      } else {
        setError(`Cannot find memeverse with verseId ${verseId}`)
        setLoading(false)
      }
    }, 500) // Simulate loading delay
  }, [params.id])

  // 更新倒计时
  useEffect(() => {
    if (!verse || !verse.refundDeadline) return

    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime(verse.refundDeadline))
    }, 60000) // 每分钟更新一次

    return () => clearInterval(timer)
  }, [verse])

  // Handle back button click
  const handleBackClick = () => {
    router.push("/memeverse/board")
  }

  // Handle refund
  const handleRefund = () => {
    if (!verse) return

    setRefundProcessing(true)

    // Simulate refund process
    setTimeout(() => {
      setRefundProcessing(false)
      setRefundComplete(true)

      // Show success message
      alert(`Successfully refunded ${verse.refundAmount} ${verse.refundToken}`)
    }, 2000)
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
      <div className="max-w-5xl px-4 md:px-6 mx-auto py-12 pt-28">
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

        {/* 项目信息卡片 */}
        <div
          className="relative rounded-xl overflow-hidden p-4 md:p-6 mb-8"
          style={{
            boxShadow: "0 0 2px #ef4444, 0 0 15px rgba(239,68,68,0.4), 0 0 30px rgba(239,68,68,0.2)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/90 via-[#1a0445]/90 to-[#0f0326]/90 backdrop-blur-sm"></div>
          {/* 网格背景 */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "center center",
            }}
          ></div>

          <div className="relative flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
            {/* Use vertical layout on small and medium screens */}
            <div className="w-full lg:hidden flex flex-col gap-4">
              {/* 简化的项目信息卡片 - 移动端 */}
              <div className="w-full">
                <div className="relative">
                  {/* 项目标题和状态 */}
                  <div className="flex flex-col mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {verse.name} <span className="text-pink-400">({verse.symbol})</span>
                      </h1>
                      <span
                        className={`${stageStyle.bg} ${stageStyle.text} ${stageStyle.glow} text-xs font-medium px-2.5 py-1 rounded-full`}
                      >
                        {verse.stage}
                      </span>
                    </div>
                    <p className="text-pink-300/80">{verse.description}</p>
                  </div>

                  {/* 只显示Omnichain和Genesis Fund */}
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    {/* Omnichain */}
                    <div className="bg-[#0f0326]/80 rounded-lg p-4 border border-pink-500/20">
                      <h3 className="text-pink-300 mb-2">Omnichain</h3>
                      <div className="flex items-center gap-2">
                        {verse.omnichain.map((chain: any, index: number) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full overflow-hidden bg-[#0f0326] border border-pink-500/30 flex items-center justify-center"
                          >
                            <Image
                              src={chain.icon || "/placeholder.svg"}
                              alt={chain.name}
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Genesis Fund */}
                    <div className="bg-[#0f0326]/80 rounded-lg p-4 border border-pink-500/20">
                      <h3 className="text-pink-300 mb-2">Genesis Fund</h3>
                      <p className="text-xl font-bold text-white">
                        {verse.raisedAmount} {verse.raisedToken}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Section for Mobile */}
              <div className="w-full flex-shrink-0">
                <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] border border-red-500/40 p-4">
                  {/* 网格背景 */}
                  <div
                    className="absolute inset-0 opacity-10 rounded-lg"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "center center",
                    }}
                  ></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-red-400 mb-4">Refund Available</h3>

                    <div className="mb-4">
                      <p className="text-pink-300/80 text-sm mb-1">Refund Reason:</p>
                      <p className="text-white">{verse.refundReason}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-pink-300/80 text-sm mb-1">Your Refund Amount:</p>
                      <p className="text-2xl font-bold text-white">
                        {verse.refundAmount} {verse.refundToken}
                      </p>
                    </div>

                    {verse.refundDeadline && (
                      <div className="mb-6">
                        <p className="text-pink-300/80 text-sm mb-1">Refund Deadline:</p>
                        <p className="text-white">{formatDateTime(verse.refundDeadline)}</p>

                        {!remainingTime.expired ? (
                          <div className="mt-2 p-2 bg-red-900/30 rounded-md border border-red-500/30">
                            <p className="text-red-300 text-sm">Time Remaining:</p>
                            <p className="text-white font-medium">
                              {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes
                            </p>
                          </div>
                        ) : (
                          <div className="mt-2 p-2 bg-red-900/30 rounded-md border border-red-500/30">
                            <p className="text-red-300 text-sm">Refund Period Expired</p>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={handleRefund}
                      disabled={refundProcessing || refundComplete || remainingTime.expired}
                      className={`w-full relative overflow-hidden ${
                        refundComplete
                          ? "bg-green-600 hover:bg-green-700"
                          : remainingTime.expired
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                      } text-white font-medium py-2 px-4 rounded-lg transition-all duration-300`}
                    >
                      {refundProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-t-white border-r-transparent border-b-white border-l-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : refundComplete ? (
                        "Refund Completed"
                      ) : remainingTime.expired ? (
                        "Refund Period Ended"
                      ) : (
                        "Claim Refund"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Use horizontal layout on large screens */}
            <div className="hidden lg:flex lg:flex-row gap-6 items-start w-full justify-center">
              {/* 简化的项目信息卡片 - 桌面端 */}
              <div className="w-[70%]">
                <div className="relative">
                  {/* 项目标题和状态 */}
                  <div className="flex flex-col mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-3xl font-bold text-white">
                        {verse.name} <span className="text-pink-400">({verse.symbol})</span>
                      </h1>
                      <span
                        className={`${stageStyle.bg} ${stageStyle.text} ${stageStyle.glow} text-xs font-medium px-2.5 py-1 rounded-full`}
                      >
                        {verse.stage}
                      </span>
                    </div>
                    <p className="text-pink-300/80">{verse.description}</p>
                  </div>

                  {/* 只显示Omnichain和Genesis Fund */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Omnichain */}
                    <div className="bg-[#0f0326]/80 rounded-lg p-4 border border-pink-500/20">
                      <h3 className="text-pink-300 mb-2">Omnichain</h3>
                      <div className="flex items-center gap-2">
                        {verse.omnichain.map((chain: any, index: number) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full overflow-hidden bg-[#0f0326] border border-pink-500/30 flex items-center justify-center"
                          >
                            <Image
                              src={chain.icon || "/placeholder.svg"}
                              alt={chain.name}
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Genesis Fund */}
                    <div className="bg-[#0f0326]/80 rounded-lg p-4 border border-pink-500/20">
                      <h3 className="text-pink-300 mb-2">Genesis Fund</h3>
                      <p className="text-xl font-bold text-white">
                        {verse.raisedAmount} {verse.raisedToken}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Section for Desktop */}
              <div className="w-[30%] flex-shrink-0">
                <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] border border-red-500/40 p-4">
                  {/* 网格背景 */}
                  <div
                    className="absolute inset-0 opacity-10 rounded-lg"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "center center",
                    }}
                  ></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-red-400 mb-4">Refund Available</h3>

                    <div className="mb-4">
                      <p className="text-pink-300/80 text-sm mb-1">Refund Reason:</p>
                      <p className="text-white">{verse.refundReason}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-pink-300/80 text-sm mb-1">Your Refund Amount:</p>
                      <p className="text-2xl font-bold text-white">
                        {verse.refundAmount} {verse.refundToken}
                      </p>
                    </div>

                    {verse.refundDeadline && (
                      <div className="mb-6">
                        <p className="text-pink-300/80 text-sm mb-1">Refund Deadline:</p>
                        <p className="text-white">{formatDateTime(verse.refundDeadline)}</p>

                        {!remainingTime.expired ? (
                          <div className="mt-2 p-2 bg-red-900/30 rounded-md border border-red-500/30">
                            <p className="text-red-300 text-sm">Time Remaining:</p>
                            <p className="text-white font-medium">
                              {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes
                            </p>
                          </div>
                        ) : (
                          <div className="mt-2 p-2 bg-red-900/30 rounded-md border border-red-500/30">
                            <p className="text-red-300 text-sm">Refund Period Expired</p>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={handleRefund}
                      disabled={refundProcessing || refundComplete || remainingTime.expired}
                      className={`w-full relative overflow-hidden ${
                        refundComplete
                          ? "bg-green-600 hover:bg-green-700"
                          : remainingTime.expired
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                      } text-white font-medium py-2 px-4 rounded-lg transition-all duration-300`}
                    >
                      {refundProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-t-white border-r-transparent border-b-white border-l-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : refundComplete ? (
                        "Refund Completed"
                      ) : remainingTime.expired ? (
                        "Refund Period Ended"
                      ) : (
                        "Claim Refund"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
