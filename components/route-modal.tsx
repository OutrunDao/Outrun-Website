"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TokenIcon } from "@/components/ui/token-icon"
import type { RouteModalProps } from "@/types"

export function RouteModal({ isOpen, onClose, fromToken, toToken, route, antiMEV = false }: RouteModalProps) {
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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={modalRef}
            className="w-full max-w-sm overflow-hidden rounded-lg mx-4" // Add mx-4 for margin on small screens
            style={{
              background: "linear-gradient(to bottom, rgba(15, 3, 38, 0.95), rgba(10, 2, 25, 0.95))",
              boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
              border: "1px solid rgba(236,72,153,0.3)",
            }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-pink-500/20 py-1.5 px-4">
              <h2
                className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
                style={{
                  textShadow: "0 0 6px rgba(236,72,153,0.4), 0 0 10px rgba(236,72,153,0.2)",
                }}
              >
                ROUTE
              </h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Route Visualization */}
            <div className="p-2.5">
              {/* Route visualization container with responsive height */}
              <div
                className="relative h-20 sm:h-16 flex items-center justify-between px-2"
                style={{ margin: "0 auto" }}
              >
                {/* Single continuous dashed line that spans the entire width */}
                <div
                  className="flowing-dash-line-right absolute"
                  style={{
                    top: "50%",
                    left: "40px" /* Adjusted to start at the edge of the first token icon */,
                    right: "40px" /* Adjusted to end at the edge of the last token icon */,
                    height: "2px",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                />

                {/* Trading route with tokens and pairs */}
                <div className="flex items-center justify-between w-full relative">
                  {/* Starting Token - moved more toward center */}
                  <div className="relative z-10 ml-6" style={{ marginRight: "5px" }}>
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center">
                      <TokenIcon symbol={fromToken.symbol} size={24} className="sm:hidden" />
                      <TokenIcon symbol={fromToken.symbol} size={26} className="hidden sm:block" />
                    </div>
                  </div>

                  {/* Trading Pairs Container - centered in the available space */}
                  <div className="flex-1 flex justify-center items-center space-x-2 sm:space-x-4">
                    {/* First Pool */}
                    <div className="relative z-10">
                      <div
                        className="p-1 sm:p-1.5 rounded-md border border-pink-500/40 bg-[#0f0326] relative overflow-hidden"
                        style={{ marginTop: "-1px" }} // Slight adjustment to center with the line
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <TokenIcon symbol="ETH" size={16} className="sm:hidden" />
                          <TokenIcon symbol="USDT" size={16} className="sm:hidden" />
                          <TokenIcon symbol="ETH" size={18} className="hidden sm:block" />
                          <TokenIcon symbol="USDT" size={18} className="hidden sm:block" />
                        </div>
                        <div
                          className="absolute inset-0 pointer-events-none rounded-lg"
                          style={{
                            background: "linear-gradient(45deg, transparent, rgba(236,72,153,0.1), transparent)",
                            backgroundSize: "200% 200%",
                            animation: "gradient-shift 3s ease infinite",
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="px-1 sm:px-2 py-0.5 rounded-md bg-purple-900/50 border border-pink-500/20 text-[8px] sm:text-[9px] text-center whitespace-nowrap">
                          {antiMEV ? (
                            <span>
                              <span className="line-through opacity-70">0.3%</span>{" "}
                              <span className="text-purple-300">0.45%</span>
                            </span>
                          ) : (
                            <span>0.3%</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Second Pool */}
                    <div className="relative z-10">
                      <div
                        className="p-1 sm:p-1.5 rounded-md border border-pink-500/40 bg-[#0f0326] relative overflow-hidden"
                        style={{ marginTop: "-1px" }} // Slight adjustment to center with the line
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <TokenIcon symbol="USDT" size={16} className="sm:hidden" />
                          <TokenIcon symbol={toToken.symbol} size={16} className="sm:hidden" />
                          <TokenIcon symbol="USDT" size={18} className="hidden sm:block" />
                          <TokenIcon symbol={toToken.symbol} size={18} className="hidden sm:block" />
                        </div>
                        <div
                          className="absolute inset-0 pointer-events-none rounded-lg"
                          style={{
                            background: "linear-gradient(45deg, transparent, rgba(236,72,153,0.1), transparent)",
                            backgroundSize: "200% 200%",
                            animation: "gradient-shift 3s ease infinite",
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="px-1 sm:px-2 py-0.5 rounded-md bg-purple-900/50 border border-pink-500/20 text-[8px] sm:text-[9px] text-center whitespace-nowrap">
                          {antiMEV ? (
                            <span>
                              <span className="line-through opacity-70">0.3%</span>{" "}
                              <span className="text-purple-300">0.45%</span>
                            </span>
                          ) : (
                            <span>0.3%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ending Token - moved more toward center */}
                  <div className="relative z-10 mr-6" style={{ marginLeft: "5px" }}>
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center">
                      <TokenIcon symbol={toToken.symbol} size={24} className="sm:hidden" />
                      <TokenIcon symbol={toToken.symbol} size={26} className="hidden sm:block" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 sm:mt-8 p-2 rounded-lg bg-black/30 border border-white/5">
                <div className="flex items-start">
                  <div className="text-purple-400 mr-2 mt-0.5 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    The routing system optimizes for the best price by splitting your trade across multiple pools.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
