"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Info } from "lucide-react"
import { createPortal } from "react-dom"
import type { InfoTooltipProps } from "@/types"

export function InfoTooltip({
  content,
  position = "top",
  className = "",
  iconClassName = "text-zinc-400 hover:text-white",
  iconSize = 16,
  maxWidth = 220,
}: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipStyles, setTooltipStyles] = useState<React.CSSProperties>({
    position: "fixed",
    zIndex: 99999,
    pointerEvents: "auto", // Changed from 'none' to 'auto' to allow interaction
    opacity: 0, // Start with opacity 0
    maxWidth: `${maxWidth}px`,
  })
  const [mounted, setMounted] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle client-side only rendering
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Function to calculate and set position
  const calculatePosition = useCallback(() => {
    if (!iconRef.current || !mounted || !tooltipRef.current) return

    const iconRect = iconRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    // Calculate position based on icon and tooltip dimensions
    let x = 0
    let y = 0

    switch (position) {
      case "top":
        x = iconRect.left + iconRect.width / 2 - tooltipRect.width / 2
        y = iconRect.top - tooltipRect.height - 8
        break
      case "bottom":
        x = iconRect.left + iconRect.width / 2 - tooltipRect.width / 2
        y = iconRect.bottom + 8
        break
      case "left":
        x = iconRect.left - tooltipRect.width - 8
        y = iconRect.top + iconRect.height / 2 - tooltipRect.height / 2
        break
      case "right":
        x = iconRect.right + 8
        y = iconRect.top + iconRect.height / 2 - tooltipRect.height / 2
        break
    }

    // Boundary checks
    const padding = 10
    if (x < padding) x = padding
    if (x + tooltipRect.width > window.innerWidth - padding) {
      x = window.innerWidth - tooltipRect.width - padding
    }
    if (y < padding) y = padding
    if (y + tooltipRect.height > window.innerHeight - padding) {
      y = window.innerHeight - tooltipRect.height - padding
    }

    // Update tooltip styles with new position and make it visible
    setTooltipStyles((prev) => ({
      ...prev,
      left: `${x}px`,
      top: `${y}px`,
      opacity: 1, // Make visible after positioning
    }))
  }, [position, mounted, maxWidth])

  // Calculate position when tooltip becomes visible or when dependencies change
  useEffect(() => {
    if (!isVisible) return

    // Initial calculation
    const calcTimeout = setTimeout(() => {
      calculatePosition()
    }, 10)

    // Recalculate on resize
    window.addEventListener("resize", calculatePosition)
    window.addEventListener("scroll", calculatePosition, true)

    return () => {
      clearTimeout(calcTimeout)
      window.removeEventListener("resize", calculatePosition)
      window.removeEventListener("scroll", calculatePosition, true)
    }
  }, [calculatePosition, isVisible])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Add a delay before hiding the tooltip
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 300) // 300ms delay
  }, [])

  // Process content to add styling to "Learn more" links
  const processedContent = useMemo(() => {
    const processContent = (content: React.ReactNode): React.ReactNode => {
      if (typeof content === "string") {
        return content
      }

      if (React.isValidElement(content)) {
        // If it's a React element, recursively process its children
        if (content.props.children) {
          const newChildren = React.Children.map(content.props.children, (child) => {
            // If it's a link with "Learn more" text, add the gradient style
            if (
              React.isValidElement(child) &&
              child.type === "a" &&
              typeof child.props.children === "string" &&
              child.props.children.includes("Learn more")
            ) {
              return React.cloneElement(child, {
                className:
                  "bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 font-medium inline-block",
                style: {
                  textShadow: "0 0 5px rgba(236, 72, 153, 0.5)",
                  transition: "all 0.2s ease",
                },
              })
            }
            return processContent(child)
          })
          return React.cloneElement(content, {}, newChildren)
        }
      }

      return content
    }

    return processContent(content)
  }, [content])

  // Arrow styles based on position
  const arrowStyles = useMemo(() => {
    switch (position) {
      case "top":
        return {
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid rgba(26, 4, 69, 0.95)",
          filter: "drop-shadow(0 1px 1px rgba(236,72,153,0.2))",
        }
      case "bottom":
        return {
          top: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "8px solid rgba(26, 4, 69, 0.95)",
          filter: "drop-shadow(0 -1px 1px rgba(236,72,153,0.2))",
        }
      case "left":
        return {
          right: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: "8px solid transparent",
          borderBottom: "8px solid transparent",
          borderLeft: "8px solid rgba(26, 4, 69, 0.95)",
          filter: "drop-shadow(1px 0 1px rgba(236,72,153,0.2))",
        }
      case "right":
        return {
          left: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: "8px solid transparent",
          borderBottom: "8px solid transparent",
          borderRight: "8px solid rgba(26, 4, 69, 0.95)",
          filter: "drop-shadow(-1px 0 1px rgba(236,72,153,0.2))",
        }
    }
  }, [position])

  return (
    <div
      ref={iconRef}
      className={`inline-flex items-center justify-center cursor-help ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <Info size={iconSize} className={iconClassName} />

      {mounted &&
        isVisible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            style={tooltipStyles}
            className="transition-opacity duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative p-2 text-xs text-zinc-300 rounded-lg bg-[#1a0445]/95 backdrop-blur-sm border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.2)] whitespace-normal break-words">
              {processedContent}

              {/* Arrow - now part of the tooltip content div */}
              <div className="absolute w-0 h-0" style={arrowStyles} />
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
