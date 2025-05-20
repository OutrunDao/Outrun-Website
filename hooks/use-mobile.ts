"use client"

import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * Detects if the device is mobile
 * @param breakpoint Breakpoint width, defaults to 1024px
 * @returns Whether the device is mobile
 */
export const useMobile = (breakpoint = 1024) => {
  return useMediaQuery(`(max-width: ${breakpoint}px)`)
}
