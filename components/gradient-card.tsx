"use client"

import { motion } from "framer-motion"
import type { GradientCardProps } from "@/types"

export function GradientCard({ title, description, gradient, delay = 0 }: GradientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-lg h-full"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
      <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
      <div className="relative p-6 md:p-8 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-zinc-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
