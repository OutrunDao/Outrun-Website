"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { FeatureCardProps } from "@/types"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function FeatureCard({
  title,
  description,
  bulletPoints,
  icon,
  color = "#a855f7", // Default purple
  className,
  delay = 0,
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useIntersectionObserver(ref, { threshold: 0.1, freezeOnceVisible: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: isInView ? delay : 0 }}
      className={cn(
        "bg-black/60 rounded-xl p-6 shadow-lg border border-white/10 backdrop-blur-sm",
        "hover:bg-black/70 transition-colors duration-300",
        className,
      )}
    >
      {icon && (
        <div className="mb-6 p-3 rounded-lg inline-block" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
      )}

      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>

      <p className="text-zinc-300 mb-4">{description}</p>

      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="space-y-2">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span
                className="h-5 w-5 mr-2 mt-0.5 flex items-center justify-center rounded-full text-white"
                style={{ backgroundColor: color }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="text-zinc-200">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
