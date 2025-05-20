"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Search } from "lucide-react"
import { TokenIcon } from "@/components/ui/token-icon"
import type { TokenSelectionModalProps } from "@/types"
import { formatAddress } from "@/utils/format"

type TokenCategory = "Popular" | "My Token" | "Stable" | "DeFi" | "Meme" | "Game"

export function TokenSelectionModal({
  isOpen,
  onClose,
  onSelectToken,
  excludeToken,
  tokens,
  showTabs = true,
  showSearch = true, // 添加showSearch属性，默认为true
}: TokenSelectionModalProps & { showTabs?: boolean; showSearch?: boolean }) {
  // Updated props type to include optional showTabs
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<TokenCategory>("Popular")
  const [filteredTokens, setFilteredTokens] = useState(tokens)
  const tokenListRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Filter tokens based on search query and excluded token
  useEffect(() => {
    let filtered = tokens.filter((token) => token.symbol !== excludeToken)

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (token) =>
          token.symbol.toLowerCase().includes(query) ||
          token.name.toLowerCase().includes(query) ||
          (token.description && token.description.toLowerCase().includes(query)) ||
          (token.address && token.address.toLowerCase().includes(query)),
      )
    }

    setFilteredTokens(filtered)
  }, [searchQuery, excludeToken, tokens])

  // Categories for token filtering
  const categories: TokenCategory[] = ["Popular", "My Token", "Stable", "DeFi", "Meme", "Game"]

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Prevent background scrolling when modal is open
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        ref={modalRef}
        className="w-full max-w-sm overflow-hidden rounded-lg mx-4"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(26, 4, 69, 0.95), rgba(15, 3, 38, 0.95))",
          boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
          border: "1px solid rgba(236,72,153,0.3)",
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "center center",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-pink-500/20 p-4">
          <h2
            className="text-xl font-bold text-white"
            style={{
              textShadow: "0 0 8px rgba(236,72,153,0.5), 0 0 12px rgba(236,72,153,0.3)",
            }}
          >
            SELECT TOKEN
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="relative p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                id="token-search"
                name="token-search"
                placeholder="Search by Name, Symbol, or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-pink-500/20 bg-black/40 py-2 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                style={{ boxShadow: "0 0 10px rgba(236,72,153,0.1) inset" }}
              />
            </div>
          </div>
        )}

        {/* Categories */}
        {showTabs && (
          <div className="flex space-x-2 overflow-x-auto px-4 pb-2 token-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-pink-600/30 to-purple-600/30 text-white"
                    : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
                style={
                  activeCategory === category
                    ? { boxShadow: "0 0 10px rgba(236,72,153,0.2), 0 0 20px rgba(168,85,247,0.1) inset" }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Token List */}
        <div ref={tokenListRef} className="max-h-[280px] overflow-y-auto p-2 token-list">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <button
                key={token.symbol}
                className="w-full mb-2 rounded-lg transition-all duration-200 overflow-hidden hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 active:bg-gradient-to-r active:from-purple-600/30 active:to-pink-600/30 cursor-pointer"
                onClick={() => {
                  onSelectToken(token)
                  onClose()
                }}
              >
                <div className="p-3 flex items-center gap-3 w-full text-left">
                  <TokenIcon symbol={token.symbol} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-base">{token.symbol}</div>
                    <div className="text-xs text-zinc-400 truncate">
                      {token.name} {token.address && <span className="opacity-70">{formatAddress(token.address)}</span>}
                    </div>
                  </div>
                  <div className="text-right text-base font-medium text-white">{token.balance}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-zinc-400">No tokens found</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
