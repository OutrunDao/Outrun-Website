"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { formatDateTime, formatMarketCap } from "@/utils/memeverse"

interface MemeverseDetailContextProps {
  // Define your context values and functions here
  currentPrice: number
  setCurrentPrice: (price: number) => void
  lastUpdated: string
  setLastUpdated: (time: string) => void
  marketCap: string
  setMarketCap: (cap: string) => void
}

const MemeverseDetailContext = createContext<MemeverseDetailContextProps | undefined>(undefined)

interface MemeverseDetailProviderProps {
  children: ReactNode
}

export const MemeverseDetailProvider: React.FC<MemeverseDetailProviderProps> = ({ children }) => {
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [lastUpdated, setLastUpdated] = useState<string>(formatDateTime(new Date()))
  const [marketCap, setMarketCap] = useState<string>(formatMarketCap(0))

  useEffect(() => {
    // Simulate fetching data and updating the context
    const intervalId = setInterval(() => {
      const newPrice = Math.random() * 100
      setCurrentPrice(newPrice)
      setLastUpdated(formatDateTime(new Date()))
      setMarketCap(formatMarketCap(newPrice * 1000000)) // Example calculation
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const value: MemeverseDetailContextProps = {
    currentPrice,
    setCurrentPrice,
    lastUpdated,
    setLastUpdated,
    marketCap,
    setMarketCap,
  }

  return <MemeverseDetailContext.Provider value={value}>{children}</MemeverseDetailContext.Provider>
}

export const useMemeverseDetail = (): MemeverseDetailContextProps => {
  const context = useContext(MemeverseDetailContext)
  if (!context) {
    throw new Error("useMemeverseDetail must be used within a MemeverseDetailProvider")
  }
  return context
}
