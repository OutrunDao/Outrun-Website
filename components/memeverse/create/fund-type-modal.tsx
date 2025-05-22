"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FundTypeModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  fundTypes: string[]
  selectedType: string
  onSelect: (type: string) => void
}

export const FundTypeModal = React.memo(
  ({ isOpen, onClose, title, fundTypes, selectedType, onSelect }: FundTypeModalProps) => {
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
                  {fundTypes.map((type) => (
                    <Button
                      key={type}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left p-3 rounded-lg",
                        selectedType === type
                          ? "bg-purple-900/50 text-white"
                          : "text-pink-300 hover:bg-purple-900/30 hover:text-white",
                      )}
                      onClick={() => onSelect(type)}
                    >
                      <div className="flex items-center">
                        <img
                          src={`/tokens/${type.toLowerCase()}.svg`}
                          alt={type}
                          className="w-5 h-5 mr-3"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/tokens/generic.svg"
                          }}
                        />
                        {type}
                      </div>
                    </Button>
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

FundTypeModal.displayName = "FundTypeModal"
