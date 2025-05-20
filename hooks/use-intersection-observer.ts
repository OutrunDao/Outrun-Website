"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  freezeOnceVisible?: boolean
}

/**
 * Uses Intersection Observer API to detect if an element is in the viewport
 * @param elementRef Reference to the element to observe
 * @param options Configuration options
 * @returns Whether the element is in the viewport
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
