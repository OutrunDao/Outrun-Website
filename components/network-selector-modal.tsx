"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
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
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose()
      }
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY

      // Add styles to body to prevent scrolling
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"

      return () => {
        // Restore scrolling when modal is closed
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflowY = ""

        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/65 backdrop-blur" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        ref={modalRef}
        className="relative w-full max-w-xs mx-4 z-50 overflow-hidden rounded-xl"
        style={{
          border: "1px solid rgba(236,72,153,0.3)",
          boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
        }}
      >
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326]"></div>

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

        {/* Header */}
        <div className="relative px-5 py-4 border-b border-purple-500/30 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Select Network
            </span>
          </h2>
          <button onClick={onClose} className="rounded-full p-1 bg-white/5 hover:bg-white/10 transition-colors">
            <X size={16} className="text-white/80" />
          </button>
        </div>

        {/* Network List */}
        <div className="relative p-3">
          <div className="grid gap-2">
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
                {/* Network Icon - 直接显示图标，无背景 */}
                <img src={network.icon || "/placeholder.svg"} alt={network.name} className="w-7 h-7 object-contain" />

                {/* Network Info - 只显示网络名称 */}
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
      </motion.div>
    </div>
  )
}
