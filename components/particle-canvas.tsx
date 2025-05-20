"use client"

import { useEffect, useRef, useMemo } from "react"
import type { ParticleCanvasProps } from "@/types"
import { useBackground } from "@/contexts/background-context"

// Create a global state to store particle data
// This way particles won't be lost when switching pages
let globalParticles:
  | {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
    }[]
  | null = null

// Flag to track if particles have been initialized
let particlesInitialized = false

export function ParticleCanvas({ className = "" }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Use background context to control visibility
  const { isVisible } = useBackground()

  // Use useMemo to cache color array
  const colors = useMemo(
    () => [
      "rgba(168, 85, 247, 0.7)", // Purple
      "rgba(236, 72, 153, 0.7)", // Pink
      "rgba(59, 130, 246, 0.7)", // Blue
      "rgba(6, 182, 212, 0.7)", // Cyan
    ],
    [],
  )

  useEffect(() => {
    // If component is not visible, don't do anything
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // If canvas dimensions change and particles are initialized, adjust particle positions
      if (particlesInitialized && globalParticles) {
        // Save old dimension ratios
        const widthRatio = canvas.width / (canvas.width || 1)
        const heightRatio = canvas.height / (canvas.height || 1)

        // Adjust particle positions
        globalParticles.forEach((particle) => {
          particle.x *= widthRatio
          particle.y *= heightRatio
        })
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Only create particles if they haven't been initialized
    if (!particlesInitialized) {
      // Adjust particle count based on screen size for better performance
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80)
      globalParticles = []

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length)
        globalParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[colorIndex],
          opacity: Math.random() * 0.5 + 0.2,
        })
      }

      particlesInitialized = true
    }

    // Animation
    let animationFrameId: number
    let lastTime = 0
    const fps = 30 // Limit framerate for better performance
    const interval = 1000 / fps

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime

      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Ensure globalParticles exists
        if (!globalParticles) return

        // Update and draw particles
        for (const particle of globalParticles) {
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Boundary handling
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        }

        // Draw connection lines - optimize with quadtree or spatial partitioning
        ctx.lineWidth = 0.5
        // Only check nearby particles to reduce computation
        const checkDistance = 120
        for (let i = 0; i < globalParticles.length; i++) {
          for (let j = i + 1; j < globalParticles.length; j++) {
            const dx = globalParticles[i].x - globalParticles[j].x
            const dy = globalParticles[i].y - globalParticles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < checkDistance) {
              const opacity = 0.1 * (1 - distance / checkDistance)
              ctx.beginPath()
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
              ctx.moveTo(globalParticles[i].x, globalParticles[i].y)
              ctx.lineTo(globalParticles[j].x, globalParticles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [colors, isVisible]) // Add isVisible as dependency

  // Use CSS transition effect to smoothly show/hide canvas
  return (
    <canvas
      ref={canvasRef}
      className={`${className} transition-opacity duration-300`}
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  )
}
