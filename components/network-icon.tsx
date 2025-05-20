"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { NetworkSelectorModal, type Network } from "./network-selector-modal"
import { useMobile } from "@/hooks/use-mobile"

interface NetworkIconProps {
  selectedNetwork: Network
  networks: Network[]
  onNetworkChange: (network: Network) => void
  className?: string
  iconOnly?: boolean
}

export function NetworkIcon({
  selectedNetwork,
  networks,
  onNetworkChange,
  className = "",
  iconOnly = false,
}: NetworkIconProps) {
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const isMobile = useMobile()

  return (
    <>
      <button
        onClick={() => setShowNetworkModal(true)}
        className={`launch-app-btn flex items-center justify-center gap-1 ${iconOnly ? "px-0 w-[34px]" : "px-3"} h-[34px] rounded-md relative overflow-hidden group ${className}`}
        style={{ marginLeft: iconOnly ? "0" : "-6px" }}
      >
        <div className="launch-btn-bg absolute inset-0 -z-0 opacity-80"></div>
        <div
          className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} flex items-center justify-center overflow-hidden relative z-10`}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <img
            src={selectedNetwork.icon || "/placeholder.svg"}
            alt={selectedNetwork.name}
            className={`${isMobile ? "w-4 h-4" : "w-4 h-4"} object-contain`}
            onError={(e) => {
              // If icon fails to load, display the first letter of the network name
              e.currentTarget.style.display = "none"
              e.currentTarget.parentElement!.innerHTML = selectedNetwork.name.charAt(0)
            }}
          />
        </div>
        {!iconOnly && (
          <>
            <span
              className={`relative z-10 ${isMobile ? "text-[10px]" : "text-xs"} font-medium tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]`}
            >
              {selectedNetwork.name}
            </span>
            <ChevronDown size={isMobile ? 10 : 12} className="text-white relative z-10" />
          </>
        )}
      </button>

      <NetworkSelectorModal
        isOpen={showNetworkModal}
        onClose={() => setShowNetworkModal(false)}
        networks={networks}
        selectedNetwork={selectedNetwork}
        onSelectNetwork={onNetworkChange}
      />
    </>
  )
}
