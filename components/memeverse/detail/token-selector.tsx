"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { createPortal } from "react-dom"

interface Token {
  symbol: string
  name: string
  icon: string
  balance: number
}

interface TokenSelectorProps {
  tokens: Token[]
  selectedToken: Token
  onSelect: (token: Token) => void
}

export function TokenSelector({ tokens, selectedToken, onSelect }: TokenSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Update dropdown position when button position changes
  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: 176, // Fixed width for dropdown
      })
    }
  }, [showDropdown])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  // Handle token selection
  const handleTokenSelect = (token: Token) => {
    onSelect(token)
    setShowDropdown(false)
  }

  // Render dropdown with portal
  const renderDropdown = () => {
    if (!showDropdown || !isMounted) return null

    return createPortal(
      <div
        ref={dropdownRef}
        className="fixed w-44 bg-[#0f0326]/95 border border-purple-500/40 rounded-lg shadow-lg backdrop-blur-sm z-[9999]"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
        }}
      >
        <div className="py-1 max-h-48 overflow-y-auto">
          {tokens.map((token, index) => (
            <React.Fragment key={token.symbol}>
              <button
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-purple-900/50 transition-colors"
                onClick={() => handleTokenSelect(token)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={token.icon || "/placeholder.svg"}
                      alt={token.symbol}
                      className="w-4 h-4 object-contain"
                      style={{ marginTop: "1px" }}
                    />
                  </div>
                  <span className="text-white text-sm">{token.symbol}</span>
                </div>
                <span className="text-gray-400 text-xs">{token.balance.toFixed(2)}</span>
              </button>
              {/* Add divider except after the last item */}
              {index < tokens.length - 1 && <div className="border-t border-purple-500/20 mx-2"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>,
      document.body,
    )
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-1.5 bg-[#0f0326]/90 rounded-md px-2 py-1 hover:bg-purple-900/50 transition-colors h-7"
      >
        <div className="flex items-center justify-center h-full">
          <img
            src={selectedToken.icon || "/placeholder.svg"}
            alt={selectedToken.symbol}
            className="w-4 h-4 object-contain"
            style={{ marginTop: "1px" }}
          />
        </div>
        <span className="text-white text-sm font-medium">{selectedToken.symbol}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>
      {renderDropdown()}
    </>
  )
}
