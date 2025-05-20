"use client"

import { motion } from "framer-motion"
import { EnhancedSwapInterface } from "@/components/enhanced-swap-interface"

export default function SwapPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">

      <div className="container px-4 md:px-6 mx-auto py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <EnhancedSwapInterface />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
