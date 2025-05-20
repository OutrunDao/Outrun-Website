import type { ElementType, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const neonTextVariants = cva("font-bold tracking-tight", {
  variants: {
    color: {
      purple: "text-purple-300 text-shadow-purple",
      pink: "text-pink-300 text-shadow-pink",
      blue: "text-blue-300 text-shadow-blue",
      cyan: "text-cyan-300 text-shadow-cyan",
    },
  },
  defaultVariants: {
    color: "purple",
  },
})

export interface NeonTextProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof neonTextVariants> {
  as?: ElementType
}

export function NeonText({ className, color, as: Component = "h2", ...props }: NeonTextProps) {
  return <Component className={cn(neonTextVariants({ color, className }))} {...props} />
}
