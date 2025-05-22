"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X, Check } from "lucide-react"

export type Network = {
  id: string
  name: string
  icon: string
  chainId: number
  color: string
}

interface NetworkSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  networks: Network[]
  selectedNetwork: Network
  onSelectNetwork: (network: Network) => void
}

export function NetworkSelectorModal({
  isOpen,
  onClose,
  networks,
  selectedNetwork,
  onSelectNetwork,
}: NetworkSelectorModalProps) {
  // 防止滚动背景
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // 使用Portal将弹窗直接挂载到body上，避免被其他容器限制
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[280px] md:max-w-xs" onClick={(e) => e.stopPropagation()}>
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
                <h3 className="text-xl font-bold text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Select Network
                  </span>
                </h3>
                <button onClick={onClose} className="rounded-full p-1.5 bg-white/5 hover:bg-white/10 transition-colors">
                  <X size={16} className="text-white/80" />
                </button>
              </div>

              {/* Network List */}
              <div className="space-y-2 max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {networks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => {
                      onSelectNetwork(network)
                      onClose()
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 border ${
                      selectedNetwork.id === network.id
                        ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/40"
                        : "hover:bg-white/5 border-transparent hover:border-white/10"
                    }`}
                  >
                    {/* Network Icon */}
                    <img
                      src={network.icon || "/placeholder.svg"}
                      alt={network.name}
                      className="w-7 h-7 object-contain"
                    />

                    {/* Network Info */}
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white">{network.name}</div>
                    </div>

                    {/* Selected Indicator */}
                    {selectedNetwork.id === network.id && (
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Check size={12} className="text-purple-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
