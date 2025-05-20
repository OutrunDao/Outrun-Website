"use client"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading memeverse details..." }: LoadingStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0326]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-pink-300">{message}</p>
      </div>
    </div>
  )
}
