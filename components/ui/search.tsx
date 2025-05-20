"use client"

import type React from "react"

import { useState, useRef } from "react"
import { SearchIcon, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SearchProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  className?: string
}

export function Search({ placeholder = "Search...", value, onChange, onClear, className = "" }: SearchProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMobile()

  // 当点击清除按钮时，聚焦输入框
  const handleClear = () => {
    onClear()
    inputRef.current?.focus()
  }

  return (
    <div className={`relative flex items-center w-full ${className}`} onClick={() => inputRef.current?.focus()}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon
          size={isMobile ? 16 : 18}
          className={`${value || isFocused ? "text-white/80" : "text-white/50"} transition-colors duration-200`}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full pl-10 pr-10 py-2 bg-transparent text-white placeholder-white/50 focus:placeholder-white/30 outline-none transition-all duration-200 ${isMobile ? "text-xs" : "text-sm"}`}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white/80 transition-colors duration-200"
          aria-label="Clear search"
        >
          <X size={isMobile ? 16 : 18} />
        </button>
      )}
    </div>
  )
}
