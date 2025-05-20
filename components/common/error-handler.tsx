"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, ChevronLeft } from "lucide-react"

export type ErrorType = "network" | "notFound" | "server" | "unauthorized" | "forbidden" | "generic"

export interface ErrorHandlerProps {
  error?: Error | null
  errorType?: ErrorType
  message?: string
  onRetry?: () => void
  onBack?: () => void
  backPath?: string
  className?: string
}

export function ErrorHandler({
  error,
  errorType = "generic",
  message,
  onRetry,
  onBack,
  backPath,
  className,
}: ErrorHandlerProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  // 错误类型映射到相应的消息和图标颜色
  const errorConfig = {
    network: {
      title: "Network Error",
      defaultMessage: "Unable to connect to the server. Please check your internet connection.",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
      glowColor: "shadow-[0_0_15px_rgba(245,158,11,0.4)]",
    },
    notFound: {
      title: "Not Found",
      defaultMessage: "The resource you are looking for does not exist.",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      glowColor: "shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    },
    server: {
      title: "Server Error",
      defaultMessage: "Something went wrong on our server. Please try again later.",
      iconColor: "text-red-500",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      glowColor: "shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    },
    unauthorized: {
      title: "Unauthorized",
      defaultMessage: "You need to be logged in to access this resource.",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      glowColor: "shadow-[0_0_15px_rgba(249,115,22,0.4)]",
    },
    forbidden: {
      title: "Access Denied",
      defaultMessage: "You don't have permission to access this resource.",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      glowColor: "shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    },
    generic: {
      title: "Error",
      defaultMessage: "An unexpected error occurred. Please try again.",
      iconColor: "text-pink-500",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-500/30",
      glowColor: "shadow-[0_0_15px_rgba(236,72,153,0.4)]",
    },
  }

  const config = errorConfig[errorType]
  const errorMessage = message || (error?.message ? error.message : config.defaultMessage)

  const handleRetry = async () => {
    if (!onRetry) return

    setIsRetrying(true)
    try {
      await onRetry()
    } catch (e) {
      console.error("Retry failed:", e)
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <div className={`min-h-[300px] flex items-center justify-center p-4 ${className}`}>
      <div
        className={`max-w-md w-full p-6 rounded-xl ${config.bgColor} backdrop-blur-lg border ${config.borderColor} ${config.glowColor}`}
      >
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.bgColor} mb-4`}>
            <AlertTriangle className={`${config.iconColor} h-8 w-8`} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{config.title}</h2>
          <p className="text-zinc-300 mb-6">{errorMessage}</p>

          {error && (
            <div className="bg-black/40 p-4 rounded-lg mb-6 overflow-auto max-h-40 text-left">
              <p className="text-red-400 text-sm font-mono">{error.toString()}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-6 py-2 text-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                )}
              </Button>
            )}

            {(onBack || backPath) && (
              <Button
                onClick={onBack}
                className="bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-full px-6 py-2 text-sm"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
