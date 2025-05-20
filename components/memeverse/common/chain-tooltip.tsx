"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

interface ChainTooltipProps {
  chainName: string
  chainIcon: string
  className?: string
}

export function ChainTooltip({ chainName, chainIcon, className = "" }: ChainTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  // 处理客户端渲染
  useEffect(() => {
    setMounted(true)

    // 创建一个专门的容器用于渲染气泡，确保它在DOM树的最顶层
    const tooltipContainer = document.createElement("div")
    tooltipContainer.id = "chain-tooltip-container"
    tooltipContainer.style.position = "fixed"
    tooltipContainer.style.top = "0"
    tooltipContainer.style.left = "0"
    tooltipContainer.style.width = "100%"
    tooltipContainer.style.height = "0"
    tooltipContainer.style.overflow = "visible"
    tooltipContainer.style.pointerEvents = "none"
    tooltipContainer.style.zIndex = "9999"
    document.body.appendChild(tooltipContainer)

    setPortalContainer(tooltipContainer)

    return () => {
      document.body.removeChild(tooltipContainer)
      setMounted(false)
    }
  }, [])

  // 渲染气泡
  const renderTooltip = () => {
    if (!iconRef.current || !mounted || !showTooltip) return null

    const rect = iconRef.current.getBoundingClientRect()

    // 计算气泡位置 - 确保在图标上方并更贴近图标
    const tooltipStyle: React.CSSProperties = {
      position: "fixed",
      left: `${rect.left + rect.width / 2}px`,
      top: `${rect.top - 5}px`, // 减小距离，使气泡更贴近图标
      transform: "translate(-50%, -100%)", // 水平居中并向上偏移
      zIndex: 9999,
      pointerEvents: "none",
      // 最简单的淡入动画
      opacity: 1,
      transition: "opacity 100ms linear",
    }

    return createPortal(
      <div style={tooltipStyle}>
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-sm text-[10px] text-pink-200 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(168,85,247,0.3)] border border-pink-500/20 whitespace-nowrap">
            {chainName}
          </div>
          {/* 删除小三角形箭头 */}
        </div>
      </div>,
      portalContainer || document.body,
    )
  }

  return (
    <div
      ref={iconRef}
      className={`inline-flex ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img src={chainIcon || "/placeholder.svg"} alt={chainName} className="w-4 h-4 ml-0.5" />
      {renderTooltip()}
    </div>
  )
}
