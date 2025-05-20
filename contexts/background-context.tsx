"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type BackgroundContextType = {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined)

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  // Display background after client-side hydration is complete
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true)
    }, 50) // 短暂延迟以确保平滑过渡

    return () => clearTimeout(timeoutId)
  }, [])

  return <BackgroundContext.Provider value={{ isVisible, setIsVisible }}>{children}</BackgroundContext.Provider>
}

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider")
  }
  return context
}
