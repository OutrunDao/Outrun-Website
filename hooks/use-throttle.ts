"use client"

import { useState, useEffect, useRef, useCallback } from "react"

/**
 * Throttle function that limits execution frequency
 * @param value Value to throttle
 * @param limit Throttle time interval in milliseconds
 * @returns Throttled value
 */
export function useThrottle<T>(value: T, limit = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef<number>(Date.now())

  useEffect(() => {
    const handler = setTimeout(
      () => {
        const now = Date.now()
        if (now - lastRan.current >= limit) {
          setThrottledValue(value)
          lastRan.current = now
        }
      },
      limit - (Date.now() - lastRan.current),
    )

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

/**
 * Throttle function that limits execution frequency
 * @param fn Function to throttle
 * @param limit Throttle time interval in milliseconds
 * @returns Throttled function
 */
export function useThrottleFn<T extends (...args: any[]) => any>(fn: T, limit = 200): T {
  const lastRan = useRef<number>(Date.now())
  const lastArgs = useRef<any[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      lastArgs.current = args

      const now = Date.now()
      if (now - lastRan.current >= limit) {
        fn(...args)
        lastRan.current = now
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(
          () => {
            lastRan.current = Date.now()
            fn(...lastArgs.current)
            timeoutRef.current = null
          },
          limit - (now - lastRan.current),
        )
      }
    },
    [fn, limit],
  ) as T

  // Cleanup function
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return throttledFn
}
