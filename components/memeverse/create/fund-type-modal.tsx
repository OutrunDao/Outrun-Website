"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FundTypeModalProps {
  isOpen: boolean
  onClose: () => void
  fundTypes: string[]
  selectedType: string
  onSelect: (type: string) => void
}

export const FundTypeModal = React.memo(
  ({ isOpen, onClose, fundTypes, selectedType, onSelect }: FundTypeModalProps) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/70 via-pink-500/70 to-purple-500/70 opacity-90"></div>
          <div className="bg-gradient-to-br from-purple-950/90 via-[#0f0326]/95 to-purple-950/90 rounded-xl overflow-hidden relative z-10 m-[1px]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Select Fund Type</h3>
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
    )
  },
)

FundTypeModal.displayName = "FundTypeModal"
