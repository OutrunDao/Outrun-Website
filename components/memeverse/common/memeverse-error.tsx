"use client"

import { useRouter } from "next/navigation"
import { ErrorHandler, type ErrorType } from "@/components/common/error-handler"

interface MemeVerseErrorProps {
  error?: Error | null
  errorType?: ErrorType
  message?: string
  onRetry?: () => void
  showBackButton?: boolean
  backPath?: string
}

export function MemeVerseError({
  error,
  errorType = "generic",
  message,
  onRetry,
  showBackButton = true,
  backPath = "/memeverse/board",
}: MemeVerseErrorProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push(backPath)
  }

  return (
    <ErrorHandler
      error={error}
      errorType={errorType}
      message={message}
      onRetry={onRetry}
      onBack={showBackButton ? handleBack : undefined}
      className="min-h-[50vh]"
    />
  )
}
