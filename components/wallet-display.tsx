"use client"

import { useWallet } from "@/contexts/wallet-context"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export function WalletDisplay() {
  const { isConnected, address } = useWallet()
  const [copied, setCopied] = useState(false)

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
    }
  }

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  if (!isConnected || !address) {
    return null
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-purple-500/30">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-sm text-white font-medium">{formatAddress(address)}</span>
      <button
        onClick={copyToClipboard}
        className="text-zinc-400 hover:text-white transition-colors"
        title="Copy address"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      </button>
      <a
        href={`https://etherscan.io/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-white transition-colors"
        title="View on Etherscan"
      >
        <ExternalLink size={14} />
      </a>
    </div>
  )
}
