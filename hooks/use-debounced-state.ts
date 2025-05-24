"use client"

import { useState, useEffect, useRef, useCallback } from "react"

/**
 * Hook for debounced state updates
 * @param initialValue Initial value
 * @param delay Debounce delay in ms (default: 300)
 * @returns [debouncedValue, setValue, immediateValue]
 */
export function useDebouncedState<T>(initialValue: T, delay = 300): [T, (value: T) => void, T] {
  const [immediateValue, setImmediateValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const setValue = useCallback(
    (value: T) => {
      setImmediateValue(value)

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        setDebouncedValue(value)
        timerRef.current = null
      }, delay)
    },
    [delay],
  )

  return [debouncedValue, setValue, immediateValue]
}
