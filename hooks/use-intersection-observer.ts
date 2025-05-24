"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  freezeOnceVisible?: boolean
}

/**
 * Hook to detect if element is in viewport using Intersection Observer
 * @param elementRef Element reference to observe
 * @param options Observer configuration
 * @returns Whether element is intersecting
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { root = null, rootMargin = "0px", threshold = 0, freezeOnceVisible = false }: UseIntersectionObserverProps = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const frozen = useRef<boolean>(false)

  useEffect(() => {
    const element = elementRef?.current
    if (!element || (freezeOnceVisible && frozen.current)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && freezeOnceVisible) {
          frozen.current = true
        }
      },
      { root, rootMargin, threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, root, rootMargin, threshold, freezeOnceVisible])

  return isIntersecting
}
