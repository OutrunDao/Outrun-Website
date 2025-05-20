"use client"

import { useState } from "react"
import { X, Twitter, Facebook, TextIcon as Telegram, Link2, Check } from "lucide-react"

interface MemeverseSocialShareProps {
  isOpen: boolean
  onClose: () => void
  project: any
}

export function MemeverseSocialShare({ isOpen, onClose, project }: MemeverseSocialShareProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `Check out ${project.name} (${project.symbol}) on Memeverse! ${project.description}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    )
  }

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const handleTelegramShare = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      "_blank",
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-[#0f0326]/95 via-[#170b3b]/95 to-[#0f0326]/95 rounded-xl border border-white/10 p-6 max-w-md w-full mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">Share {project.name}</h3>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleTwitterShare}
            className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-lg border border-white/10 hover:border-blue-400/30 hover:bg-blue-900/10 transition-colors"
          >
            <Twitter className="h-6 w-6 text-[#1DA1F2] mb-2" />
            <span className="text-sm text-zinc-300">Twitter</span>
          </button>

          <button
            onClick={handleFacebookShare}
            className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-lg border border-white/10 hover:border-blue-600/30 hover:bg-blue-900/10 transition-colors"
          >
            <Facebook className="h-6 w-6 text-[#4267B2] mb-2" />
            <span className="text-sm text-zinc-300">Facebook</span>
          </button>

          <button
            onClick={handleTelegramShare}
            className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-lg border border-white/10 hover:border-blue-400/30 hover:bg-blue-900/10 transition-colors"
          >
            <Telegram className="h-6 w-6 text-[#0088cc] mb-2" />
            <span className="text-sm text-zinc-300">Telegram</span>
          </button>
        </div>

        <div className="relative">
          <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-2 pr-14">
            <Link2 className="h-5 w-5 text-zinc-400 mr-2 flex-shrink-0" />
            <div className="truncate text-zinc-300 text-sm">{shareUrl}</div>
          </div>
          <button
            onClick={handleCopyLink}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs py-1 px-2 rounded-md"
          >
            {copied ? (
              <span className="flex items-center">
                <Check className="h-3 w-3 mr-1" /> Copied
              </span>
            ) : (
              "Copy"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
