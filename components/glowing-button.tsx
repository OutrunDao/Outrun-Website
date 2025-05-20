import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-white border",
        outline: "border text-white bg-transparent hover:bg-accent/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      color: {
        purple: "border-purple-500 shadow-glow-purple",
        pink: "border-pink-500 shadow-glow-pink",
        blue: "border-blue-500 shadow-glow-blue",
        cyan: "border-cyan-500 shadow-glow-cyan",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "purple",
    },
    compoundVariants: [
      {
        variant: "default",
        color: "purple",
        className: "bg-purple-600/20 hover:bg-purple-600/30 border-purple-500",
      },
      {
        variant: "default",
        color: "pink",
        className: "bg-pink-600/20 hover:bg-pink-600/30 border-pink-500",
      },
      {
        variant: "default",
        color: "blue",
        className: "bg-blue-600/20 hover:bg-blue-600/30 border-blue-500",
      },
      {
        variant: "default",
        color: "cyan",
        className: "bg-cyan-600/20 hover:bg-cyan-600/30 border-cyan-500",
      },
      {
        variant: "outline",
        color: "purple",
        className: "border-purple-500 hover:bg-purple-900/20",
      },
      {
        variant: "outline",
        color: "pink",
        className: "border-pink-500 hover:bg-pink-900/20",
      },
      {
        variant: "outline",
        color: "blue",
        className: "border-blue-500 hover:bg-blue-900/20",
      },
      {
        variant: "outline",
        color: "cyan",
        className: "border-cyan-500 hover:bg-cyan-900/20",
      },
    ],
  },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const GlowingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, color, className }))} ref={ref} {...props} />
  },
)
GlowingButton.displayName = "GlowingButton"

export { GlowingButton, buttonVariants }
