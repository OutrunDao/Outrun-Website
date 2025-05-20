"use client"

import { useState, useEffect, useRef, useCallback } from "react"

/**
 * Creates a debounced state that only updates after a specified delay when values change rapidly
 * @param initialValue Initial value
 * @param delay Delay time in milliseconds
 * @returns [debouncedValue, setValue, immediateValue]
 */
export function useDebouncedState<T>(initialValue: T, delay = 300): [T, (value: T) => void, T] {
  const [immediateValue, setImmediateValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up timer
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Function to set value
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
