"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import type { TokenIconProps } from "@/types"
import { TOKEN_ICONS, TOKEN_COLORS } from "@/constants/tokens"

export function TokenIcon({ symbol, size = 24, className = "" }: TokenIconProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // 使用 useMemo 缓存图标 URL 和背景颜色
  const { iconUrl, bgColor, isWrappedToken } = useMemo(() => {
    return {
      iconUrl: TOKEN_ICONS[symbol] || null,
      bgColor: TOKEN_COLORS[symbol] || "#718096",
      isWrappedToken: symbol.startsWith("W") || symbol.includes("wrapped"),
    }
  }, [symbol])

  // Reset states when symbol changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [symbol])

  // 如果没有图标 URL 或加载出错，显示备用图标
  if (!iconUrl || imageError) {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex items-center justify-center ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: bgColor,
          border: isWrappedToken ? "1px solid rgba(255,255,255,0.2)" : "none",
        }}
      >
        <span className="text-white font-bold text-xs">{symbol.substring(0, 2)}</span>
      </div>
    )
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        border: isWrappedToken ? "1px solid rgba(255,255,255,0.2)" : "none",
        backgroundColor: !imageLoaded ? bgColor : "transparent",
      }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xs">{symbol.substring(0, 2)}</span>
        </div>
      )}
      <Image
        src={iconUrl || "/placeholder.svg"}
        alt={`${symbol} icon`}
        width={size}
        height={size}
        className={`rounded-full ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  )
}
