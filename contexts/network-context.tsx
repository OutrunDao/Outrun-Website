"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

// 定义网络类型
export type Network = {
  id: string
  name: string
  icon: string
  chainId: number
  color: string
}

// 更新 NETWORKS 数组，使用SVG文件
export const NETWORKS: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "/networks/ethereum.svg",
    chainId: 1,
    color: "#627EEA",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    icon: "/networks/arbitrum.svg",
    chainId: 42161,
    color: "#28A0F0",
  },
  {
    id: "base",
    name: "Base",
    icon: "/networks/base.svg",
    chainId: 8453,
    color: "#0052FF",
  },
  {
    id: "bnb",
    name: "BNB Chain",
    icon: "/networks/bnb.svg",
    chainId: 56,
    color: "#F3BA2F",
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "/networks/polygon.svg",
    chainId: 137,
    color: "#8247E5",
  },
]

type NetworkContextType = {
  network: Network
  networks: Network[]
  switchNetwork: (network: Network) => Promise<void>
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [networkState, setNetworkState] = useLocalStorage<{
    networkId: string
  }>("networkState", { networkId: "ethereum" })

  // 获取当前网络
  const network = NETWORKS.find((n) => n.id === networkState.networkId) || NETWORKS[0]

  // 切换网络
  const switchNetwork = async (newNetwork: Network) => {
    try {
      // 在真实应用中，这里会使用 ethers.js 或 web3.js 来切换网络
      // 例如: await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `0x${newNetwork.chainId.toString(16)}` }] })

      // 模拟网络切换延迟
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 更新本地存储的网络状态
      setNetworkState({
        networkId: newNetwork.id,
      })

      return newNetwork
    } catch (error) {
      console.error("Failed to switch network:", error)
      throw error
    }
  }

  return (
    <NetworkContext.Provider
      value={{
        network,
        networks: NETWORKS,
        switchNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetwork() {
  const context = useContext(NetworkContext)
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider")
  }
  return context
}
