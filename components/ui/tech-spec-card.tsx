"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { TechSpecCardProps } from "@/types"

export function TechSpecCard({
  title,
  specs,
  color = "#a855f7", // Default purple
  className,
  delay = 0,
}: TechSpecCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn(
        "bg-card rounded-lg p-6 shadow-lg border border-white/10 backdrop-blur-sm",
        "bg-black/60",
        className,
      )}
    >
      <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10 text-white" style={{ color: `${color}` }}>
        {title}
      </h3>

      <div className="space-y-4">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-start">
            {spec.icon && <div className="mr-3 mt-0.5">{spec.icon}</div>}
            <div>
              <div className="text-sm font-medium text-zinc-400">{spec.label}</div>
              <div className="text-white font-medium">{spec.value}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
