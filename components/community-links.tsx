"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { ChevronDown, Globe } from "lucide-react"

interface CommunityLinksProps {
  website: string
  twitter: string
  discord: string
  telegram: string
  onChange: (name: string, value: string) => void
}

export function CommunityLinks({ website, twitter, discord, telegram, onChange }: CommunityLinksProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <div className="border border-purple-500/30 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={toggleExpanded}
        className={`w-full flex items-center justify-between p-4 transition-colors duration-300 ${
          isExpanded ? "bg-transparent" : "bg-black/30 hover:bg-purple-900/20"
        }`}
      >
        <div className="flex items-center">
          <Label className="text-pink-300 m-0">Community</Label>
          <div className="inline-flex items-center">
            <InfoTooltip
              content="Add optional community links for your token"
              iconClassName="ml-1.5 text-pink-300/70 hover:text-pink-300"
              iconSize={14}
            />
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-pink-300 transition-transform duration-300 ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Collapsible content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Website */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Globe className="h-4 w-4 text-pink-300" />
              </div>
              <Input
                id="website"
                name="website"
                value={website}
                onChange={handleChange}
                placeholder="Website URL"
                className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pl-10"
              />
            </div>

            {/* X/Twitter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-4 w-4 text-pink-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <Input
                id="twitter"
                name="twitter"
                value={twitter}
                onChange={handleChange}
                placeholder="X handle"
                className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pl-10"
              />
            </div>

            {/* Discord */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-4 w-4 text-pink-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.28a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.28.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.49a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                </svg>
              </div>
              <Input
                id="discord"
                name="discord"
                value={discord}
                onChange={handleChange}
                placeholder="Discord invite url"
                className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pl-10"
              />
            </div>

            {/* Telegram */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-4 w-4 text-pink-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <Input
                id="telegram"
                name="telegram"
                value={telegram}
                onChange={handleChange}
                placeholder="Telegram handle"
                className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pl-10"
              />
            </div>
          </div>
          <p className="text-xs text-pink-300/70 italic">All community links are optional</p>
        </div>
      </div>
    </div>
  )
}
