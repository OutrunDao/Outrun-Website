"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { useNetwork } from "@/contexts/network-context"
import { NetworkIcon } from "@/components/network-icon"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"

type WalletButtonProps = {
  isMobile?: boolean
}

export function WalletButton({ isMobile = false }: WalletButtonProps) {
  const router = useRouter()
  const { isConnected, isConnecting, address, connectWallet, disconnectWallet } = useWallet()
  const { network, networks, switchNetwork } = useNetwork()
  const [isHoveringState, setIsHoveringState] = useState(false)
  const isHovering = isHoveringState
  const setIsHovering = setIsHoveringState

  const isNavMobile = useMediaQuery("(max-width: 780px)") // 与导航栏的断点保持一致
  const effectiveIsMobile = isMobile || isNavMobile // 使用组合条件

  const handleClick = async () => {
    // Handle wallet connection
    if (isConnected) {
      disconnectWallet()
    } else {
      try {
        await connectWallet()
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    }
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className={`flex items-center gap-2 ${effectiveIsMobile ? "" : "pr-2 ml-auto"}`}>
      <NetworkIcon
        selectedNetwork={network}
        networks={networks}
        onNetworkChange={switchNetwork}
        isMobile={effectiveIsMobile}
      />
      <Button
        className={`launch-app-btn bg-transparent border-0 rounded-md px-3 h-[30px] flex items-center justify-center relative overflow-hidden group ${effectiveIsMobile ? "text-xs" : "text-xs"} ${isConnected ? "text-purple-300" : "text-white"} w-[100px] ${isConnecting ? "opacity-80 cursor-wait" : ""}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        disabled={isConnecting}
      >
        <span
          className={`relative z-10 font-medium tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] w-full text-center inline-flex items-center justify-center text-[10px]`}
        >
          {isConnecting ? (
            <>
              <Loader2 className={`mr-1 h-3 w-3 animate-spin inline`} />
              <span className="animate-pulse">Connecting...</span>
            </>
          ) : isConnected ? (
            isHovering ? (
              "Disconnect"
            ) : (
              formatAddress(address!)
            )
          ) : (
            "Connect Wallet"
          )}
        </span>
        <div className="launch-btn-bg absolute inset-0 -z-0 opacity-90"></div>
        {isConnecting && <div className="absolute inset-0 bg-purple-500/10 z-0 animate-pulse rounded-md"></div>}
      </Button>
    </div>
  )
}
