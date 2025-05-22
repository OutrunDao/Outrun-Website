"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface GradientBackgroundCardProps {
  children: ReactNode
  className?: string
  contentClassName?: string

  // 渐变背景选项
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
  backdropBlur?: boolean

  // 网格背景选项
  showGrid?: boolean
  gridColor?: string
  gridOpacity?: number
  gridSize?: number

  // 底部发光效果选项
  showBottomGlow?: boolean
  bottomGlowColor?: string
  bottomGlowHeight?: number
  bottomGlowOpacity?: number

  // 边框选项
  border?: boolean
  borderColor?: string

  // 阴影选项
  shadow?: boolean
  shadowColor?: string

  // 圆角选项
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
}

export function GradientBackgroundCard({
  children,
  className,
  contentClassName,

  // 渐变背景选项
  gradientFrom = "#0f0326",
  gradientVia = "#1a0445",
  gradientTo = "#0f0326",
  backdropBlur = true,

  // 网格背景选项
  showGrid = true,
  gridColor = "rgba(168, 85, 247, 0.1)",
  gridOpacity = 0.1,
  gridSize = 20,

  // 底部发光效果选项
  showBottomGlow = true,
  bottomGlowColor = "from-purple-600/5",
  bottomGlowHeight = 20,
  bottomGlowOpacity = 1,

  // 边框选项
  border = false,
  borderColor = "rgba(236,72,153,0.3)",

  // 阴影选项
  shadow = false,
  shadowColor = "rgba(236,72,153,0.4)",

  // 圆角选项
  rounded = "lg",
}: GradientBackgroundCardProps) {
  // 构建圆角类名
  const roundedClassName = rounded !== "none" ? `rounded-${rounded}` : ""

  // 构建阴影样式
  const shadowStyle = shadow
    ? {
        boxShadow: `0 0 2px #ec4899, 0 0 15px ${shadowColor}, 0 0 30px rgba(168,85,247,0.2)`,
        border: border ? `1px solid ${borderColor}` : undefined,
      }
    : border
      ? { border: `1px solid ${borderColor}` }
      : {}

  return (
    <div className={cn("relative overflow-hidden", roundedClassName, className)} style={shadowStyle}>
      {/* 背景渐变 */}
      <div
        className={cn("absolute inset-0 bg-gradient-to-br", backdropBlur && "backdrop-blur-xl")}
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
        }}
      />

      {/* 网格背景 */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: "center center",
          }}
        />
      )}

      {/* 底部发光效果 */}
      {showBottomGlow && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${bottomGlowColor} to-transparent`}
          style={{
            height: `${bottomGlowHeight}px`,
            opacity: bottomGlowOpacity,
          }}
        />
      )}

      {/* 内容 */}
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  )
}
