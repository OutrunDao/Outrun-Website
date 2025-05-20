"use client"

import { useEffect, useRef } from "react"

export function RetroSun() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 1200
    canvas.height = 600

    // Sun parameters
    const centerX = canvas.width / 2
    const centerY = canvas.height * 1.2
    const outerRadius = canvas.height * 0.9
    const innerRadius = outerRadius * 0.7

    // Create gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius)
    gradient.addColorStop(0, "rgba(236, 72, 153, 1)") // Pink-600
    gradient.addColorStop(0.3, "rgba(192, 38, 211, 0.8)") // Purple-600
    gradient.addColorStop(0.7, "rgba(107, 33, 168, 0.4)") // Purple-800
    gradient.addColorStop(1, "rgba(88, 28, 135, 0)") // Purple-900

    // Draw sun
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
    ctx.fill()

    // Draw grid lines
    const lineCount = 24
    const angleStep = Math.PI / lineCount

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 1

    for (let i = 0; i <= lineCount; i++) {
      const angle = angleStep * i
      const x = centerX + Math.cos(angle) * outerRadius * 1.5

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, 0)
      ctx.stroke()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-auto" />
}
