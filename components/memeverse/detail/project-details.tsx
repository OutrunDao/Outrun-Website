"use client"

import { formatMarketCap } from "@/utils/format"
import { useMemo, useCallback } from "react"
// 更新导入路径
import { ChainTooltip } from "@/components/memeverse/common/chain-tooltip"
import React from "react"

interface ProjectDetailsProps {
  project: any
  stageStyle: any
  onBackClick: () => void
}

// Custom date time formatting function using local timezone
function useLocalTimeZoneFormatter() {
  const timeZoneOffset = useMemo(() => {
    // Get current timezone offset (minutes)
    const offsetMinutes = new Date().getTimezoneOffset()
    // Convert to hours and minutes
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60))
    const offsetMinutesPart = Math.abs(offsetMinutes % 60)

    // Format as UTC+X:XX or UTC-X:XX
    const sign = offsetMinutes <= 0 ? "+" : "-"
    return `UTC${sign}${offsetHours.toString().padStart(1, "0")}${
      offsetMinutesPart > 0 ? `:${offsetMinutesPart.toString().padStart(2, "0")}` : ""
    }`
  }, [])

  return useCallback(
    (date: Date | number | string): string => {
      if (!date) return "N/A"

      const d = new Date(date)

      // Format to local time
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const day = String(d.getDate()).padStart(2, "0")
      const hours = String(d.getHours()).padStart(2, "0")
      const minutes = String(d.getMinutes()).padStart(2, "0")

      // Return formatted date time string with timezone info
      return `${year}-${month}-${day} ${hours}:${minutes} ${timeZoneOffset}`
    },
    [timeZoneOffset],
  )
}

export const ProjectDetails = React.memo(({ project, stageStyle, onBackClick }: ProjectDetailsProps) => {
  // Use custom hook to get formatting function
  const formatCustomDateTime = useLocalTimeZoneFormatter()

  return (
    <>
      {/* Project image - keep square */}
      <div className="w-full lg:w-1/4 flex-shrink-0">
        <div
          className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] border border-purple-500/40"
          style={{
            aspectRatio: "1/1",
            width: "100%",
          }}
        >
          <img src="/placeholder.svg" alt={project.name} className="w-full h-full object-cover relative z-10" />

          {/* Stage label */}
          <div className="absolute top-3 right-3 z-20">
            <div
              className={`text-sm px-3 py-1 rounded-md bg-gradient-to-r ${stageStyle.gradient} ${stageStyle.text} ${stageStyle.glow} transition-all duration-300`}
            >
              {project.stage}
            </div>
          </div>
        </div>
      </div>

      {/* Project information - adjust height to match image */}
      <div className="w-full lg:w-[46%] flex-shrink-0 flex flex-col p-0 overflow-hidden" style={{ height: "100%" }}>
        {/* Title area - adjust to top alignment */}
        <div className="h-[38px] flex p-0 m-0 overflow-visible">
          {/* Use top-aligned span to display text directly - increase font size */}
          <div className="flex p-0 m-0 overflow-visible">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-xl font-bold leading-none mt-[-2px]">
              {project.symbol}
            </span>
            <span className="max-w-[300px] truncate text-pink-300 text-xl font-bold leading-none ml-1 mt-[-2px]">
              {project.name}
            </span>
          </div>
        </div>

        {/* Project statistics - directly connect to title area without any gap */}
        <div
          className="w-full relative rounded-lg p-2 flex flex-col justify-between bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] border border-purple-500/30"
          style={{
            height: "calc(100% - 38px)",
            marginBottom: "0",
            marginTop: "-3px",
          }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10 rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "center center",
            }}
          ></div>

          {/* Use flex-1 to ensure each row occupies equal space */}
          <div className="flex gap-2 flex-1 relative z-10">
            {/* Omnichain card */}
            <div className="flex-1 bg-black/20 rounded-lg border border-purple-500/30 flex flex-col justify-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="px-3 py-2">
                <div className="text-xs text-pink-300/80 font-medium">Omnichain</div>
                <div className="text-sm font-semibold text-pink-100 overflow-hidden text-ellipsis whitespace-nowrap flex flex-row gap-1 items-center h-6">
                  {project.omnichain?.map((network, index) => (
                    <ChainTooltip key={index} chainName={network.name} chainIcon={network.icon || "/placeholder.svg"} />
                  )) || <span>-</span>}
                </div>
              </div>
            </div>

            {/* Genesis Fund card */}
            <div className="flex-1 bg-black/20 rounded-lg border border-purple-500/30 flex flex-col justify-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="px-3 py-2">
                <div className="text-xs text-pink-300/80 font-medium">Genesis Fund</div>
                <div className="text-sm font-semibold text-pink-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  {project.raisedAmount.toFixed(2)} {project.raisedToken}
                </div>
              </div>
            </div>
          </div>

          {/* Second row info cards */}
          <div className="flex gap-2 flex-1 my-2 relative z-10">
            {/* Market Cap card */}
            <div className="flex-1 bg-black/20 rounded-lg border border-purple-500/30 flex flex-col justify-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="px-3 py-2">
                <div className="text-xs text-pink-300/80 font-medium">Market Cap</div>
                <div className="text-sm font-semibold text-pink-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  {formatMarketCap(project.marketCap)}
                </div>
              </div>
            </div>

            {/* Population card */}
            <div className="flex-1 bg-black/20 rounded-lg border border-purple-500/30 flex flex-col justify-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="px-3 py-2">
                <div className="text-xs text-pink-300/80 font-medium">Population</div>
                <div className="text-sm font-semibold text-pink-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  {project.population.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Third row: time information */}
          <div className="flex flex-col md:flex-row gap-2 flex-1 relative z-10">
            {/* Genesis End Time / Created At card */}
            <div className="flex-1 bg-black/20 rounded-lg border border-purple-500/30 flex flex-col justify-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="px-3 py-2">
                <div className="text-xs text-pink-300/80 font-medium">Genesis End Time</div>
                <div className="text-sm font-semibold text-pink-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  {formatCustomDateTime(project.genesisEndTime || project.createdAt || new Date())}
                </div>
              </div>
            </div>

            {/* Unlock Time card */}
            <div className="flex-1 bg-black/20 rounded-lg border border-purple-500/30 flex flex-col justify-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="px-3 py-2">
                <div className="text-xs text-pink-300/80 font-medium">Unlock Time</div>
                <div className="text-sm font-semibold text-pink-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  {formatCustomDateTime(
                    project.unlockTime ||
                      new Date(project.createdAt).setMonth(new Date(project.createdAt).getMonth() + 3),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

ProjectDetails.displayName = "ProjectDetails"
