"use client"

import { Navbar } from "@/components/navbar"
import { GeometricShapes } from "@/components/geometric-shapes"

export function NavbarWrapper() {
  return (
    <div className="relative">
      <GeometricShapes />
      <Navbar />
    </div>
  )
}
