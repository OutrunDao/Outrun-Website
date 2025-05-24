"use client"

import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * Hook to detect mobile devices
 * @param breakpoint Breakpoint in pixels (default: 768)
 * @returns Whether device is mobile
 */
export const useMobile = (breakpoint = 768) => {
  return useMediaQuery(`(max-width: ${breakpoint}px)`)
}
