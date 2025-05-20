"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { UseCaseCardProps } from "@/types"

export function UseCaseCard({
  title,
  description,
  icon,
  steps,
  color = "#a855f7", // Default purple
  className,
  delay = 0,
}: UseCaseCardProps) {
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
      <div className="flex items-start mb-4">
        {icon && (
          <div className="mr-4 p-3 rounded-md" style={{ backgroundColor: `${color}20` }}>
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <p className="text-zinc-300 mb-6">{description}</p>

      {steps && steps.length > 0 && (
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div
                className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: color }}
              >
                {index + 1}
              </div>
              <p className="text-zinc-200">{step}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
