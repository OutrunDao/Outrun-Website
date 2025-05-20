import { cn } from "@/lib/utils"
import type { SectionHeadingProps } from "@/types"

export function SectionHeading({
  title,
  description,
  badge,
  gradient = "from-purple-400 to-pink-500",
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
  badgeClassName,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={cn("w-fit", alignmentClasses[align], className)}>
      {badge && (
        <div className={cn("inline-block mb-4", badgeClassName)}>
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-zinc-300 border border-white/5">
            {badge}
          </div>
        </div>
      )}
      <h2
        className={cn(
          "text-[1.7rem] md:text-[2.1rem] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r",
          gradient,
          "mb-4",
          titleClassName,
        )}
      >
        {title}
      </h2>
    </div>
  )
}
