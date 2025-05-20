"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * Uses media query to detect screen size
 * @param query Media query string
 * @returns Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((query: string): boolean => {
    // Always return false during server-side rendering
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  }, [])

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Define callback function
    const handleChange = () => {
      setMatches(getMatches(query))
    }

    // Initial check
    handleChange()

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // Compatible with older browsers
      mediaQuery.addListener(handleChange)
    }

    // Cleanup function
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        // Compatible with older browsers
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [getMatches, query])

  return matches
}
