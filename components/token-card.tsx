"use client"

import { motion } from "framer-motion"
import type { TokenCardProps } from "@/types"

export function TokenCard({ title, description, formula, gradient, delay = 0 }: TokenCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-lg"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
      <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
      <div className="relative p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-zinc-300 mb-6 leading-relaxed">{description}</p>
        <div className="text-sm text-zinc-400 font-mono bg-black/50 p-3 rounded-lg border border-white/5">
          {formula}
        </div>
      </div>
    </motion.div>
  )
}
