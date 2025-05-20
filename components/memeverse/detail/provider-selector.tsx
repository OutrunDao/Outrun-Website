"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { createPortal } from "react-dom"
import { InfoTooltip } from "@/components/ui/info-tooltip"

interface Provider {
  id: string
  name: string
}

interface ProviderSelectorProps {
  providers: Provider[]
  selectedProvider: Provider
  onSelect: (provider: Provider) => void
  disabled?: boolean
  disabledMessage?: string
  fixedProvider?: Provider
  fixedProviderMessage?: string
}

export function ProviderSelector({
  providers,
  selectedProvider,
  onSelect,
  disabled = false,
  disabledMessage = "",
  fixedProvider,
  fixedProviderMessage = "",
}: ProviderSelectorProps) {
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
        width: rect.width,
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

  // Handle provider selection
  const handleProviderSelect = (provider: Provider) => {
    onSelect(provider)
    setShowDropdown(false)
  }

  // Get button content based on state
  const getButtonContent = () => {
    if (disabled) {
      return (
        <div className="flex items-center justify-center w-full text-gray-400 text-xs">
          <InfoTooltip content={disabledMessage} iconSize={14} iconClassName="text-pink-400 mr-1.5" />
          <span>UETH is already staked</span>
        </div>
      )
    } else if (fixedProvider) {
      return (
        <div className="flex items-center justify-between w-full">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{fixedProvider.name}</span>
          <InfoTooltip content={fixedProviderMessage} iconSize={14} iconClassName="text-pink-400 ml-1.5" />
        </div>
      )
    } else {
      return (
        <>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{selectedProvider.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 ml-1" />
        </>
      )
    }
  }

  // Render dropdown with portal
  const renderDropdown = () => {
    if (!showDropdown || disabled || fixedProvider || !isMounted) return null

    return createPortal(
      <div
        ref={dropdownRef}
        className="fixed bg-[#0f0326]/95 border border-purple-500/40 rounded-lg shadow-lg backdrop-blur-sm z-[9999]"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
        }}
      >
        <div className="py-1 max-h-36 overflow-y-auto">
          {providers.map((provider, index) => (
            <React.Fragment key={provider.id}>
              <button
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-purple-900/40 transition-colors text-sm"
                onClick={() => handleProviderSelect(provider)}
              >
                <span className="text-white overflow-hidden text-ellipsis whitespace-nowrap">{provider.name}</span>
              </button>
              {/* Add divider except after the last item */}
              {index < providers.length - 1 && <div className="border-t border-purple-500/20 mx-2"></div>}
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
        onClick={() => {
          if (!disabled && !fixedProvider) {
            setShowDropdown(!showDropdown)
          }
        }}
        className={`w-full bg-[#1a0f3d]/90 border border-purple-500/40 rounded-lg h-7 flex items-center justify-between px-2.5 text-white text-xs backdrop-blur-sm ${
          disabled || fixedProvider ? "cursor-default" : "hover:bg-purple-900/30"
        }`}
      >
        {getButtonContent()}
      </button>
      {renderDropdown()}
    </>
  )
}
