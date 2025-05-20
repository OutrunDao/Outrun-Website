"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

type WalletContextType = {
  isConnected: boolean
  isConnecting: boolean
  address: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletState, setWalletState] = useLocalStorage<{
    isConnected: boolean
    address: string | null
  }>("walletState", { isConnected: false, address: null })

  const { isConnected, address } = walletState

  const connectWallet = async () => {
    try {
      setIsConnecting(true)

      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock wallet connection
      // In a real app, this would use ethers.js or web3.js to connect to MetaMask or other wallets
      const mockAddress =
        "0x" +
        Array(40)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")

      setWalletState({
        isConnected: true,
        address: mockAddress,
      })

      return mockAddress
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
    })
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isConnecting,
        address,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
