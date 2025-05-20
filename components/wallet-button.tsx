"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { useNetwork } from "@/contexts/network-context"
import { NetworkIcon } from "@/components/network-icon"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

interface WalletButtonProps {
  isHomePage?: boolean
}

export function WalletButton({ isHomePage = false }: WalletButtonProps) {
  const router = useRouter()
  const isMobile = useMobile()
  const { isConnected, isConnecting, address, connectWallet, disconnectWallet } = useWallet()
  const { network, networks, switchNetwork } = useNetwork()
  const [isHoveringState, setIsHoveringState] = useState(false)
  const isHovering = isHoveringState
  const setIsHovering = setIsHoveringState

  const handleClick = async () => {
    // 所有页面都处理钱包连接
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
    <div className="flex items-center gap-4" style={{ marginRight: "-12px" }}>
      {!isMobile && <NetworkIcon selectedNetwork={network} networks={networks} onNetworkChange={switchNetwork} />}
      <Button
        className={`launch-app-btn bg-transparent border-0 rounded-md px-4 h-[34px] flex items-center justify-center relative overflow-hidden group text-sm ml-auto ${isConnected ? "text-purple-300" : "text-white"} ${isMobile ? "w-[120px] px-2" : "w-[125px]"}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        disabled={isConnecting}
      >
        <span className="relative z-10 font-medium tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] w-full text-center inline-flex items-center justify-center text-xs">
          {isConnecting ? (
            <>
              <Loader2 className={`mr-1 ${isMobile ? "h-3 w-3" : "h-4 w-4"} animate-spin inline`} />
              {isMobile ? "Connecting..." : "Connecting..."}
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
      </Button>
    </div>
  )
}
