"use client"

import { useRouter } from "next/navigation"
import { MemeVerseError } from "@/components/memeverse/common/memeverse-error"

interface ErrorStateProps {
  error: string
  onBackClick: () => void
}

export function ErrorState({ error, onBackClick }: ErrorStateProps) {
  const router = useRouter()

  return (
    <MemeVerseError
      message={error}
      errorType="notFound"
      onRetry={undefined}
      showBackButton={true}
      backPath="/memeverse/board"
    />
  )
}
