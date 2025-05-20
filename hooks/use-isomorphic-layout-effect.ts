"use client"

import { useEffect, useLayoutEffect } from "react"

/**
 * Uses useEffect during server-side rendering and useLayoutEffect during client-side rendering
 * Avoids warnings during server-side rendering
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
