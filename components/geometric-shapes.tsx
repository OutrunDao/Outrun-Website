"use client"

import { useEffect, useRef } from "react"

type GeometricShapesProps = {
  className?: string
}

export function GeometricShapes({ className = "" }: GeometricShapesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = 80 // Height of the navbar
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create shapes
    const shapes = []
    const shapeCount = Math.min(window.innerWidth / 200, 8) // Reduced number of shapes

    for (let i = 0; i < shapeCount; i++) {
      const type = Math.random() > 0.5 ? "triangle" : "rectangle"
      shapes.push({
        type,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 4, // Smaller shapes
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005, // Slower rotation
        color: getRandomNeonColor(),
        opacity: Math.random() * 0.15 + 0.05, // More subtle opacity
      })
    }

    function getRandomNeonColor() {
      const colors = [
        "rgba(168, 85, 247, 0.5)", // Purple
        "rgba(236, 72, 153, 0.5)", // Pink
        "rgba(59, 130, 246, 0.5)", // Blue
        "rgba(6, 182, 212, 0.5)", // Cyan
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      for (const shape of shapes) {
        shape.rotation += shape.rotationSpeed

        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.globalAlpha = shape.opacity
        ctx.fillStyle = shape.color

        if (shape.type === "triangle") {
          ctx.beginPath()
          ctx.moveTo(0, -shape.size)
          ctx.lineTo(shape.size, shape.size)
          ctx.lineTo(-shape.size, shape.size)
          ctx.closePath()
          ctx.fill()
        } else {
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
        }

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />
}
