"use client"

import { motion } from "framer-motion"
import { InfoTooltip } from "@/components/ui/info-tooltip"

interface ReferralStatsProps {
  data: {
    totalEarned: string
    referralsCount: number
  }
}

export function ReferralStats({ data }: ReferralStatsProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.4 }}
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
        <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Your Referral Stats
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Total Earned"
            value={`$${data.totalEarned}`}
            tooltip="Total amount earned from referrals"
            gradient="from-purple-500 to-pink-500"
            delay={0.1}
          />
          <StatCard
            title="Total Referrals"
            value={data.referralsCount.toString()}
            tooltip="Number of users who signed up with your code"
            gradient="from-pink-500 to-purple-500"
            delay={0.2}
          />
        </div>
      </div>
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  value: string
  tooltip: string
  gradient: string
  delay: number
}

function StatCard({ title, value, tooltip, gradient, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-black/40 rounded-lg p-4 border border-white/5"
    >
      <div className="flex items-center mb-2">
        <h3 className="text-sm text-zinc-400">{title}</h3>
        <InfoTooltip content={tooltip} position="top" className="ml-1" />
      </div>
      <p className={`text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
        {value}
      </p>
    </motion.div>
  )
}
