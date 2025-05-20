"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { InfoTooltip } from "@/components/ui/info-tooltip"

interface ToggleSwitchProps {
  isEnabled: boolean
  onChange: () => void
  label: string
  tooltipContent: string
}

export const ToggleSwitch = React.memo(({ isEnabled, onChange, label, tooltipContent }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center mb-2">
      <Label htmlFor="flash-genesis" className="text-pink-300">
        {label}
      </Label>
      <div className="inline-flex items-center">
        <InfoTooltip
          content={tooltipContent}
          iconClassName="ml-1.5 text-pink-300/70 hover:text-pink-300"
          iconSize={14}
        />
      </div>
      <button
        className={`ml-3 w-8 h-5 rounded-md p-0.5 transition-colors duration-300 ${isEnabled ? "bg-gradient-to-r from-purple-600/70 to-pink-600/70" : "bg-white/10"}`}
        onClick={onChange}
        type="button"
      >
        <div
          className={`w-4 h-4 rounded-md bg-white transition-transform duration-300 ${isEnabled ? "translate-x-3" : "translate-x-0"} my-auto`}
        />
      </button>
    </div>
  )
})

ToggleSwitch.displayName = "ToggleSwitch"
