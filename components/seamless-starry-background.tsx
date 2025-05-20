"use client"

import { useEffect, useRef, useMemo, useCallback } from "react"
import { useBackground } from "@/contexts/background-context"

export function SeamlessStarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isVisible } = useBackground()

  // Cache color array using useMemo
  const colors = useMemo(
    () => [
      "rgba(168, 85, 247, 1)", // Purple
      "rgba(236, 72, 153, 1)", // Pink
      "rgba(59, 130, 246, 1)", // Blue
      "rgba(6, 182, 212, 1)", // Cyan
    ],
    [],
  )

  // Optimize function with useCallback
  const setCanvasDimensions = useCallback((canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  // Optimize star generation logic with useCallback
  const generateStars = useCallback(
    (canvas: HTMLCanvasElement) => {
      const stars: {
        x: number
        y: number
        size: number
        color: string
        opacity: number
        twinkleSpeed: number
        twinklePhase: number
      }[] = []

      // Use grid distribution to ensure uniform coverage
      const gridSize = 80 // 每个网格单元的大小
      const cols = Math.ceil(window.innerWidth / gridSize)
      const rows = Math.ceil(window.innerHeight / gridSize)

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // Add 1-2 stars per grid cell, reducing total count for better performance
          const starsInCell = Math.floor(Math.random() * 2) + 1

          for (let k = 0; k < starsInCell; k++) {
            const x = j * gridSize + Math.random() * gridSize
            const y = i * gridSize + Math.random() * gridSize

            // Ensure stars are within canvas boundaries
            if (x <= window.innerWidth && y <= window.innerHeight) {
              stars.push({
                x,
                y,
                size: Math.random() * 1.5 + 0.5, // Smaller stars (0.5 to 2)
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2, // Random initial phase
              })
            }
          }
        }
      }

      return stars
    },
    [colors],
  )

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    setCanvasDimensions(canvas)
    window.addEventListener("resize", () => setCanvasDimensions(canvas))

    // Create stars with consistent distribution
    let stars = generateStars(canvas)

    // Animation
    let animationFrameId: number
    let time = 0
    let lastTime = 0
    const fps = 24 // Limit frame rate for better performance
    const interval = 1000 / fps

    const render = (timestamp: number) => {
      const deltaTime = timestamp - lastTime

      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval)
        time += 0.01

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#0f0326") // Deep purple at top
        gradient.addColorStop(0.5, "#170b3b") // Purple in middle
        gradient.addColorStop(1, "#0f0326") // Deep purple at bottom

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw stars with twinkling effect
        for (const star of stars) {
          // Calculate twinkling effect
          const twinkle = Math.sin(time * star.twinkleSpeed * 5 + star.twinklePhase) * 0.3 + 0.7
          const currentOpacity = star.opacity * twinkle

          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fillStyle = star.color.replace("1)", `${currentOpacity})`)
          ctx.fill()

          // Add subtle glow for larger stars
          if (star.size > 1) {
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
            const glow = ctx.createRadialGradient(star.x, star.y, star.size * 0.5, star.x, star.y, star.size * 2)
            glow.addColorStop(0, star.color.replace("1)", `${currentOpacity * 0.5})`))
            glow.addColorStop(1, star.color.replace("1)", "0)"))
            ctx.fillStyle = glow
            ctx.fill()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // Handle window resize
    const handleResize = () => {
      setCanvasDimensions(canvas)
      stars = generateStars(canvas) // 调整大小时重新生成星星
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [setCanvasDimensions, generateStars, isVisible])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full -z-20 transition-opacity duration-300`}
        style={{
          pointerEvents: "none",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* 添加网格背景层 */}
      <div
        className={`fixed inset-0 w-full h-full -z-19 transition-opacity duration-300`}
        style={{
          pointerEvents: "none",
          opacity: isVisible ? 0.14 : 0,
          backgroundImage:
            "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "center center",
        }}
      />
    </>
  )
}
