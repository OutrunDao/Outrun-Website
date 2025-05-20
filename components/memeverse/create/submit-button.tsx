import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SubmitButtonProps {
  isSubmitting: boolean
}

export const SubmitButton = React.memo(({ isSubmitting }: SubmitButtonProps) => {
  return (
    <div className="flex justify-center items-center pt-2">
      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "relative overflow-hidden px-12 py-2 rounded-full min-w-[200px]",
          "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600",
          "font-extrabold text-lg tracking-wide",
          "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
          "hover:shadow-[0_0_20px_rgba(236,72,153,0.7)]",
          "transition-all duration-300",
          "disabled:opacity-70 disabled:cursor-not-allowed",
        )}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_1px_rgba(236,72,153,0.4)] font-semibold">
              Creating...
            </span>
          </div>
        ) : (
          <span className="bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_1px_rgba(236,72,153,0.4)] font-semibold">
            Create
          </span>
        )}
      </Button>
    </div>
  )
})

SubmitButton.displayName = "SubmitButton"
