"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface OmniChainsModalProps {
  isOpen: boolean
  onClose: () => void
  chains: string[]
  selectedChains: string[]
  onToggle: (chain: string) => void
}

export const OmniChainsModal = React.memo(
  ({ isOpen, onClose, chains, selectedChains, onToggle }: OmniChainsModalProps) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/70 via-pink-500/70 to-purple-500/70 opacity-90"></div>
          <div className="bg-gradient-to-br from-purple-950/90 via-[#0f0326]/95 to-purple-950/90 rounded-xl overflow-hidden relative z-10 m-[1px]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Select OmniChains</h3>
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
                {chains.map((chain) => (
                  <div
                    key={chain}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-900/30 cursor-pointer"
                    onClick={() => onToggle(chain)}
                  >
                    <div className="flex items-center">
                      <img
                        src={`/networks/${chain.toLowerCase().replace(/\s+/g, "")}.svg`}
                        alt={chain}
                        className="w-5 h-5 mr-3"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/networks/ethereum.svg"
                        }}
                      />
                      <span className="text-pink-300">{chain}</span>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center",
                        selectedChains.includes(chain) ? "bg-pink-500 border-pink-500" : "border-purple-500/50",
                      )}
                    >
                      {selectedChains.includes(chain) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={onClose} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

OmniChainsModal.displayName = "OmniChainsModal"
