"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { designSystem } from "@/styles/design-system"
import type { EnhancedModuleCardProps } from "@/types"

export function EnhancedModuleCard({
  title,
  description,
  icon: Icon,
  href,
  module,
  learnMoreUrl,
}: EnhancedModuleCardProps) {
  // Get module-specific styles
  const moduleColors = designSystem.colors[module]
  const moduleGradient = designSystem.gradients[module].primary

  return (
    <Link href={href} className="group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="relative h-full overflow-hidden rounded-lg"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${moduleGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="relative p-6 md:p-8 h-full flex flex-col">
          <div
            className={`h-12 w-12 rounded-md flex items-center justify-center mb-6 shadow-lg`}
            style={{
              background: `linear-gradient(to bottom right, ${moduleColors.primary}, ${moduleColors.secondary})`,
              boxShadow: `0 0 15px ${moduleColors.primary}50`,
            }}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>

          <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-zinc-300 mb-6 flex-grow">{description}</p>

          <div
            className="flex items-center text-sm font-medium text-zinc-400 group-hover:text-white transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (learnMoreUrl) {
                window.open(learnMoreUrl, "_blank")
              }
            }}
          >
            Learn more
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    </Link>
  )
}
