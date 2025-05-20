"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * Hook for storing and retrieving data from localStorage
 * @param key localStorage key
 * @param initialValue Initial value
 * @returns [storedValue, setValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get initial value
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [initialValue, key])

  // State to store actual value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Read value from localStorage when component mounts
  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Return a wrapped version of useState's setter function that saves new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`)
        return
      }

      try {
        // Allow value to be a function, just like useState's setter
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // Save to state
        setStoredValue(valueToStore)

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))

        // Dispatch custom event so other components can listen for localStorage changes
        window.dispatchEvent(new Event("local-storage"))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue],
  )

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // Listen for custom event
    window.addEventListener("local-storage", handleStorageChange)
    // Listen for storage event (triggered when localStorage is modified in other tabs)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("local-storage", handleStorageChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [readValue])

  return [storedValue, setValue]
}
