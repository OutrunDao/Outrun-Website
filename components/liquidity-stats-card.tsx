"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { TrendingUp, TrendingDown } from "lucide-react"

interface LiquidityStatsCardProps {
  title: string
  value: string
  change?: string
  isPositive?: boolean
}

export function LiquidityStatsCard({ title, value, change, isPositive = true }: LiquidityStatsCardProps) {
  const isMobile = useMobile()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`
        bg-gradient-to-r from-[#0f0326]/40 to-[#1a0445]/40 
        border border-white/10 rounded-lg p-4
        ${isMobile ? "w-full" : ""}
      `}
      style={{
        boxShadow: "0 0 15px rgba(168,85,247,0.15)",
      }}
    >
      <div className="text-sm text-zinc-400 mb-1">{title}</div>
      <div className="flex items-end justify-between">
        <span className="text-2xl md:text-3xl font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
          {value}
        </span>

        {change && (
          <div className={`flex items-center text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            {change}
          </div>
        )}
      </div>
    </motion.div>
  )
}
