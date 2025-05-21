"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
// 更新导入路径
import { ChainTooltip } from "@/components/memeverse/common/chain-tooltip"
import type { MemeProject, StageColorMap } from "@/types/memeverse"
import { formatDateTime, formatMarketCap, formatUSD } from "@/utils/memeverse"

// 最小总筹资金额
const MIN_TOTAL_FUND = 10

// Stage label color mapping
const STAGE_COLORS: StageColorMap = {
  Genesis: {
    bg: "bg-purple-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(168,85,247,0.6)]",
    gradient: "from-purple-600 to-pink-500",
  },
  Refund: {
    bg: "bg-red-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    gradient: "from-red-600 to-orange-500",
  },
  Locked: {
    bg: "bg-pink-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(236,72,153,0.6)]",
    gradient: "from-pink-600 to-purple-500",
  },
  Unlocked: {
    bg: "bg-cyan-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(6,182,212,0.6)]",
    gradient: "from-cyan-500 to-blue-500",
  },
}

interface ProjectCardProps {
  project: MemeProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()

  const stageStyle = STAGE_COLORS[project.stage] || {
    bg: "bg-gray-600",
    text: "text-white",
    glow: "",
    gradient: "from-gray-600 to-gray-500",
  }

  // Determine card border gradient color
  const getBorderGradient = () => {
    switch (project.stage) {
      case "Genesis":
        return "from-purple-500/70 via-pink-500/70 to-purple-500/70"
      case "Locked":
        return "from-pink-500/70 via-purple-500/70 to-pink-500/70"
      case "Unlocked":
        return "from-cyan-400/80 via-blue-500/80 to-indigo-400/80" // 增强亮度和对比度
      case "Refund":
        return "from-red-400/80 via-orange-500/80 to-yellow-500/80" // 增强亮度和对比度
      default:
        return "from-white/10 to-white/5"
    }
  }

  // Determine card background gradient color
  const getBackgroundGradient = () => {
    switch (project.stage) {
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

  // Get shadow color when hovering over the card
  const getHoverShadowColor = () => {
    switch (project.stage) {
      case "Genesis":
        return "rgba(168,85,247,0.4)"
      case "Locked":
        return "rgba(236,72,153,0.4)"
      case "Unlocked":
        return "rgba(6,182,212,0.5)" // 增强亮度
      case "Refund":
        return "rgba(239,68,68,0.5)" // 增强亮度
      default:
        return "rgba(168,85,247,0.4)"
    }
  }

  // Calculate progress percentage for Genesis stage
  const calculateProgress = () => {
    if (project.stage === "Genesis") {
      // Calculate progress by dividing raisedAmount by MIN_TOTAL_FUND (10 UETH)
      const progressPercent = (project.raisedAmount / MIN_TOTAL_FUND) * 100
      // Don't limit maximum progress, allow exceeding 100%
      return progressPercent
    }
    return project.progress || 0
  }

  // Get progress bar gradient color
  const getProgressGradient = () => {
    const progress = calculateProgress()
    if (progress >= 100) {
      // Use brighter gradient colors when exceeding 100%
      return "from-cyan-400 via-purple-400 to-pink-400"
    }
    return "from-purple-500 via-pink-500 to-purple-500"
  }

  // High APY indicator
  const isHighApy = project.stakingApy && project.stakingApy > 1000

  // Handle card click event
  const handleCardClick = () => {
    // 根据项目阶段和符号决定导航路径
    if (project.symbol === "DDIN" || project.symbol === "MDRG" || project.symbol === "QPEPE") {
      router.push(`/memeverse/${project.id}/detail/`)
    } else if (project.symbol === "PFROG") {
      // PFROG卡片跳转到Locked阶段详情页面
      router.push(`/memeverse/${project.id}/locked/`)
    } else {
      // 对于其他项目，显示提示信息
      alert("详情页面正在建设中...")
    }
  }

  // 修改isClickable变量的定义，添加PFROG
  const isClickable =
    project.symbol === "DDIN" || project.symbol === "MDRG" || project.symbol === "QPEPE" || project.symbol === "PFROG"

  return (
    <div
      className={`card-container relative ${isClickable ? "cursor-pointer" : "cursor-default"} group`}
      onClick={handleCardClick}
      data-stage={project.stage}
    >
      {/* Use an outer container to handle hover effects */}
      <div
        className="card-float-wrapper"
        style={
          {
            "--hover-shadow-color": getHoverShadowColor(),
          } as React.CSSProperties
        }
      >
        {/* Card body - contains border and content */}
        <div className="relative rounded-lg overflow-hidden md:h-auto">
          {/* Gradient border */}
          <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getBorderGradient()} opacity-90`}></div>

          {/* Card content */}
          <div
            className={`bg-gradient-to-br ${getBackgroundGradient()} rounded-lg overflow-hidden relative z-10 m-[1px]`}
          >
            <div className="p-2.5 relative z-10">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center max-w-[180px] overflow-hidden">
                  <span
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[100px]"
                    title={project.symbol}
                  >
                    {project.symbol}
                  </span>{" "}
                  <span
                    className="text-sm text-pink-200/90 ml-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px] sm:max-w-[70px]"
                    title={project.name}
                  >
                    {project.name}
                  </span>
                </div>

                {/* Market Cap */}
                <div className="text-cyan-300/80 text-xs mx-auto">
                  Market Cap: <span className="text-cyan-200 font-medium">{formatMarketCap(project.marketCap)}</span>
                </div>

                {/* Stage label */}
                <div
                  className={`text-xs px-3 py-1 rounded-md bg-gradient-to-r ${stageStyle.gradient} ${stageStyle.text} ${stageStyle.glow} transition-all duration-300`}
                >
                  {project.stage}
                </div>
              </div>

              <div className="flex">
                {/* Left project image - 调整缩小断点为450px */}
                <div className="w-[120px] h-[120px] max-[450px]:w-[110px] max-[450px]:h-[110px] flex-shrink-0 relative flex items-center justify-center rounded-md overflow-hidden transition-all duration-300">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />

                  {/* High APY indicator */}
                  {isHighApy && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      High APY
                    </div>
                  )}
                </div>

                {/* Right project information - 调整缩小断点为450px */}
                <div className="flex-1 pl-3 max-[450px]:pl-2 flex flex-col min-w-0 h-[120px] max-[450px]:h-[110px] lg:h-auto lg:min-h-[120px] relative">
                  {/* Project description - 调整缩小断点为450px */}
                  <p
                    className="text-cyan-300/70 text-xs max-[450px]:text-[11px] mb-1.5 max-[450px]:mb-1 whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200 hover:text-cyan-200/90"
                    title={project.description}
                  >
                    {project.description}
                  </p>

                  {/* Other information - 调整缩小断点为450px */}
                  <div className="mt-auto space-y-1 max-[450px]:space-y-0.5 overflow-hidden">
                    {/* Omnichain support */}
                    <div className="text-pink-300/70 text-xs max-[450px]:text-[11px] flex items-center relative">
                      <span className="text-pink-300/90 mr-1">Omnichain:</span>
                      <div className="flex">
                        {project.omnichain?.map((chain, index) => (
                          <ChainTooltip key={index} chainName={chain.name} chainIcon={chain.icon} />
                        ))}
                      </div>
                    </div>

                    {/* Show Total Raised in Genesis and Refund stages */}
                    {(project.stage === "Genesis" || project.stage === "Refund") && (
                      <div className="text-pink-300/70 text-xs max-[450px]:text-[11px]">
                        Total Raised:{" "}
                        <span className="text-pink-200 font-medium">
                          {project.raisedAmount.toFixed(2)} {project.raisedToken}
                        </span>
                      </div>
                    )}

                    {/* Show Genesis Endtime in Genesis stage */}
                    {project.stage === "Genesis" && project.genesisEndTime && (
                      <div className="text-pink-300/70 text-xs max-[450px]:text-[11px]">
                        Genesis Endtime:{" "}
                        <span className="text-pink-200 font-medium">{formatDateTime(project.genesisEndTime)}</span>
                      </div>
                    )}

                    {/* Show Unlock Time in Locked stage */}
                    {project.stage === "Locked" && project.unlockTime && (
                      <div className="text-pink-300/70 text-xs max-[450px]:text-[11px]">
                        Unlock Time:{" "}
                        <span className="text-pink-200 font-medium">{formatDateTime(project.unlockTime)}</span>
                      </div>
                    )}

                    {/* Show Staking APY in Locked and Unlocked stages */}
                    {(project.stage === "Locked" || project.stage === "Unlocked") && project.stakingApy && (
                      <div className="text-pink-300/70 text-xs max-[450px]:text-[11px]">
                        Staking APY:{" "}
                        <span className={`${isHighApy ? "text-yellow-400" : "text-green-400"} font-medium`}>
                          {project.stakingApy.toFixed(2)}%
                        </span>
                      </div>
                    )}

                    {/* Show Treasury Fund in Locked and Unlocked stages */}
                    {(project.stage === "Locked" || project.stage === "Unlocked") && project.treasuryFund && (
                      <div className="text-pink-300/70 text-xs max-[450px]:text-[11px]">
                        Treasury Fund:{" "}
                        <span className="text-pink-200 font-medium">{formatUSD(project.treasuryFund)}</span>
                      </div>
                    )}

                    {/* Show Unlock Time in Genesis stage, Population in other stages */}
                    {project.stage === "Genesis" ? (
                      <div className="text-pink-300/70 text-xs max-[450px]:text-[11px]">
                        Unlock Time:{" "}
                        <span className="text-pink-200 font-medium">
                          {project.unlockTime ? formatDateTime(project.unlockTime) : "TBA"}
                        </span>
                      </div>
                    ) : (
                      <div className="text-pink-300/70 text-xs max-[450px]:text-[11px]">
                        Population:{" "}
                        <span className="text-pink-200 font-medium">{project.population.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Progress bar and percentage - 调整缩小断点为450px */}
                    {project.stage === "Genesis" && (
                      <div className="flex items-center mt-1 max-[450px]:mt-0.5">
                        <div className="flex-grow">
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${getProgressGradient()} h-full transition-all duration-500`}
                              style={{
                                width: `${Math.min(calculateProgress(), 100)}%`,
                                boxShadow: calculateProgress() >= 100 ? "0 0 8px rgba(236,72,153,0.6)" : "none",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right text-xs max-[450px]:text-[11px] ml-2 max-[450px]:ml-1">
                          <span
                            className={
                              calculateProgress() >= 100 ? "text-cyan-300 font-medium" : "text-pink-400 font-medium"
                            }
                          >
                            {calculateProgress().toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    )}
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
