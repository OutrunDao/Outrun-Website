"use client"

import { useState, useEffect } from "react"

/**
 * Uses media query to detect screen size
 * @param query Media query string
 * @returns Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // 初始化匹配状态
    const updateMatches = () => {
      if (typeof window !== "undefined") {
        setMatches(window.matchMedia(query).matches)
      }
    }

    // 初始检查
    updateMatches()

    // 创建媒体查询
    const mediaQuery = window.matchMedia(query)

    // 添加事件监听器
    const handleChange = () => updateMatches()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // 兼容旧浏览器
      mediaQuery.addListener(handleChange)
    }

    // 清理函数
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        // 兼容旧浏览器
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}
