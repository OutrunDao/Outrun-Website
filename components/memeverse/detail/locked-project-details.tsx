"use client"
import { MemeversePriceChart } from "./memeverse-price-chart"
import { CompactSwapInterface } from "./compact-swap-interface"

interface LockedProjectDetailsProps {
  project: any
  stageStyle: any
}

// Modify container structure to ensure consistent height on both sides
export function LockedProjectDetails({ project, stageStyle }: LockedProjectDetailsProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* Left side: price chart */}
      <div className="w-full lg:w-2/3">
        <MemeversePriceChart project={project} />
      </div>

      {/* Right side: Swap interface - remove height restriction, let it adapt naturally to content */}
      <div className="w-full lg:w-1/3">
        <CompactSwapInterface project={project} />
      </div>
    </div>
  )
}
