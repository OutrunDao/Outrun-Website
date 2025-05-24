"use client"

import { useCallback, useRef } from "react"

/**
 * 创建一个节流函数
 * @param fn 要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastExecTime = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const elapsed = now - lastExecTime.current

      if (elapsed >= delay) {
        lastExecTime.current = now
        fn(...args)
      } else {
        // 清除之前的定时器
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        // 设置新的定时器
        timeoutRef.current = setTimeout(() => {
          lastExecTime.current = Date.now()
          fn(...args)
          timeoutRef.current = null
        }, delay - elapsed)
      }
    },
    [fn, delay],
  )
}
