"use client"

import { ParticleCanvas } from "@/components/particle-canvas"
import { SeamlessStarryBackground } from "@/components/seamless-starry-background"
import { useBackground } from "@/contexts/background-context"

export function GlobalBackground() {
  const { isVisible } = useBackground()

  return (
    <>
      {/* Starry background */}
      <SeamlessStarryBackground />

      {/* Particle effect - Only show after client-side hydration to avoid flickering */}
      <ParticleCanvas className="fixed inset-0 w-full h-full -z-10" />

      {/* Fixed dark background as base layer to prevent white flashing */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background: "linear-gradient(to bottom, #0f0326, #170b3b, #0f0326)",
          pointerEvents: "none",
        }}
      />
    </>
  )
}
