"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ErrorStateProps {
  error: string
  onBackClick: () => void
}

export function ErrorState({ error, onBackClick }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0326] p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">Memeverse Not Found</h1>
        <p className="text-pink-300 mb-8">{error}</p>
        <Button
          onClick={onBackClick}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to board
        </Button>
      </div>
    </div>
  )
}
