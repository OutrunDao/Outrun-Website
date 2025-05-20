"use client"

import { useEffect, useRef } from "react"

export function Grid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Grid parameters
    const gridSpacing = 50
    const gridWidth = canvas.width * 3
    const gridHeight = canvas.height * 2
    const gridOffsetX = (canvas.width - gridWidth) / 2
    const gridOffsetY = canvas.height * 0.6
    const gridDepth = canvas.height * 2

    // Animation
    let animationFrameId: number
    let time = 0

    const render = () => {
      time += 0.01

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(120, 0, 170, 0.3)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = 0; y <= gridHeight; y += gridSpacing) {
        const perspectiveScale = 1 - y / gridDepth

        ctx.beginPath()
        ctx.moveTo(gridOffsetX, gridOffsetY + y + Math.sin(time + y * 0.01) * 5)
        ctx.lineTo(gridOffsetX + gridWidth, gridOffsetY + y + Math.sin(time + y * 0.01) * 5)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x <= gridWidth; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(gridOffsetX + x + Math.sin(time + x * 0.01) * 5, gridOffsetY)
        ctx.lineTo(gridOffsetX + x + Math.sin(time + x * 0.01) * 5, gridOffsetY + gridHeight)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      style={{ background: "linear-gradient(to bottom, #170b3b, #2c0b56)" }}
    />
  )
}
