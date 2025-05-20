"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useMobile } from "@/hooks/use-mobile"

interface ReferralLinkProps {
  code: string
  link: string
}

export function ReferralLink({ code, link }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false)
  const isMobile = useMobile()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="rounded-lg overflow-hidden relative"
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

      <div className="relative p-6">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Your Referral Link
          </h2>
          <InfoTooltip
            content="Share this link with friends. When they trade on Outrun, you'll earn a percentage of their trading fees."
            position="top"
            className="ml-2"
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-stretch">
              <div className="bg-black/30 border border-white/10 rounded-l-lg px-4 py-2 flex-grow overflow-hidden flex items-center">
                <p className="font-mono text-white truncate">{link}</p>
              </div>
              <button
                onClick={() => handleCopy(link)}
                className="bg-gradient-to-r from-purple-700/60 to-pink-600/60 hover:from-purple-600/80 hover:to-pink-500/80 border-y border-r border-purple-500/50 rounded-r-lg aspect-square w-11 flex items-center justify-center transition-all duration-300"
              >
                {copied ? (
                  <Check size={20} className="text-green-400" />
                ) : (
                  <Copy size={20} className="hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
