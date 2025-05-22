"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface OmniChainsModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  chains: string[]
  selectedChains: string[]
  onToggle: (chain: string) => void
}

export const OmniChainsModal = React.memo(
  ({ isOpen, onClose, title, chains, selectedChains, onToggle }: OmniChainsModalProps) => {
    if (!isOpen) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="relative w-full max-w-[300px] md:max-w-xs" onClick={(e) => e.stopPropagation()}>
          <div
            className="rounded-xl overflow-hidden relative"
            style={{
              boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
              border: "1px solid rgba(236,72,153,0.3)",
            }}
          >
            {/* 背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] backdrop-blur-xl"></div>

            {/* 网格背景 */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                backgroundPosition: "center center",
              }}
            ></div>

            {/* 底部发光效果 */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-600/5 to-transparent"></div>

            <div className="relative z-10">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                      {title}
                    </span>
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-pink-300 hover:text-white hover:bg-purple-900/30"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-2 max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

OmniChainsModal.displayName = "OmniChainsModal"
