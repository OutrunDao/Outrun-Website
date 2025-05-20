"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { useNetwork } from "@/contexts/network-context"
import { NetworkIcon } from "@/components/network-icon"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface WalletButtonProps {
  isHomePage?: boolean
}

export function WalletButton({ isHomePage = false }: WalletButtonProps) {
  const router = useRouter()
  const { isConnected, isConnecting, address, connectWallet, disconnectWallet } = useWallet()
  const { network, networks, switchNetwork } = useNetwork()
  const [isHoveringState, setIsHoveringState] = useState(false)
  const isHovering = isHoveringState
  const setIsHovering = setIsHoveringState

  const handleClick = async () => {
    if (isHomePage) {
      // Use Next.js client-side navigation instead of window.location
      router.push("/outswap/swap")
    } else {
      // If not on home page, handle wallet connection
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
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="flex items-center gap-4" style={{ marginRight: "-12px" }}>
      {!isHomePage && <NetworkIcon selectedNetwork={network} networks={networks} onNetworkChange={switchNetwork} />}
      <Button
        className={`launch-app-btn bg-transparent border-0 rounded-md px-4 h-[34px] flex items-center justify-center relative overflow-hidden group text-sm ml-auto ${isConnected && !isHomePage ? "text-purple-300" : "text-white"} w-[125px]`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        disabled={isConnecting}
      >
        <span className="relative z-10 font-medium tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] w-full text-center inline-flex items-center justify-center text-xs">
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
              Connecting...
            </>
          ) : isHomePage ? (
            "Launch App"
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
