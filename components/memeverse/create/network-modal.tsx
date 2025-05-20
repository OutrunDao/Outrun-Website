"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NetworkModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  networks: string[]
  selectedNetwork: string
  onSelect: (network: string) => void
}

export const NetworkModal = React.memo(
  ({ isOpen, onClose, title, networks, selectedNetwork, onSelect }: NetworkModalProps) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/70 via-pink-500/70 to-purple-500/70 opacity-90"></div>
          <div className="bg-gradient-to-br from-purple-950/90 via-[#0f0326]/95 to-purple-950/90 rounded-xl overflow-hidden relative z-10 m-[1px]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-pink-300 hover:text-white hover:bg-purple-900/30"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {networks.map((network) => (
                  <Button
                    key={network}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left p-3 rounded-lg",
                      selectedNetwork === network
                        ? "bg-purple-900/50 text-white"
                        : "text-pink-300 hover:bg-purple-900/30 hover:text-white",
                    )}
                    onClick={() => onSelect(network)}
                  >
                    <div className="flex items-center">
                      <img
                        src={`/networks/${network.toLowerCase().replace(/\s+/g, "")}.svg`}
                        alt={network}
                        className="w-5 h-5 mr-3"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/networks/ethereum.svg"
                        }}
                      />
                      {network}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

NetworkModal.displayName = "NetworkModal"
