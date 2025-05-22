"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { NetworkSelectorModal, type Network } from "./network-selector-modal"

interface NetworkIconProps {
  selectedNetwork: Network
  networks: Network[]
  onNetworkChange: (network: Network) => void
  className?: string
  isMobile?: boolean
}

export function NetworkIcon({
  selectedNetwork,
  networks,
  onNetworkChange,
  className = "",
  isMobile = false,
}: NetworkIconProps) {
  const [showNetworkModal, setShowNetworkModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowNetworkModal(true)}
        className={`launch-app-btn flex items-center justify-center ${isMobile ? "w-[30px] px-0" : "px-2"} h-[30px] rounded-md relative overflow-hidden group ${className}`}
        style={{ marginLeft: "-6px" }}
      >
        <div className={`launch-btn-bg absolute inset-0 -z-0 ${isMobile ? "opacity-70" : "opacity-80"}`}></div>
        <div
          className={`${isMobile ? "w-5 h-5" : "w-5 h-5"} flex items-center justify-center overflow-hidden relative z-10`}
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
        {!isMobile && (
          <>
            <span className="relative z-10 text-[10px] font-medium tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
              {selectedNetwork.name}
            </span>
            <ChevronDown size={10} className="text-white relative z-10" />
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
