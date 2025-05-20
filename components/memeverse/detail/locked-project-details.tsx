"use client"
import { MemeversePriceChart } from "./memeverse-price-chart"
import { CompactSwapInterface } from "./compact-swap-interface"

interface LockedProjectDetailsProps {
  project: any
  stageStyle: any
}

// 修改容器结构，确保两侧高度一致
export function LockedProjectDetails({ project, stageStyle }: LockedProjectDetailsProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* 左侧：价格图表 */}
      <div className="w-full lg:w-2/3">
        <MemeversePriceChart project={project} />
      </div>

      {/* 右侧：Swap界面 - 移除高度限制，让它自然适应内容 */}
      <div className="w-full lg:w-1/3">
        <CompactSwapInterface project={project} />
      </div>
    </div>
  )
}
