"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { AlertCircle, ChevronDown, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  formData: any
  logoPreview: string | null
  isGenesisDurationValid: boolean
  isLiquidityLockDurationValid: boolean
  minGenesisDuration: number
  maxGenesisDuration: number
  minLockupDays: number
  maxLockupDays: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  openModal: (modalType: "network" | "omniChains" | "fundType") => void
}

// 使用React.memo优化渲染性能
export const FormSection = React.memo(
  ({
    formData,
    logoPreview,
    isGenesisDurationValid,
    isLiquidityLockDurationValid,
    minGenesisDuration,
    maxGenesisDuration,
    minLockupDays,
    maxLockupDays,
    handleChange,
    handleLogoUpload,
    openModal,
  }: FormSectionProps) => {
    return (
      <>
        {/* 顶部区域：Token Logo、Name和Symbol */}
        <div className="flex flex-col md:flex-row mb-6">
          {/* Token Logo - 在移动设备上居中，在桌面上左对齐 */}
          <div className="w-full md:w-48 md:mr-6 mb-6 md:mb-0 flex justify-center md:justify-start">
            <div className="flex flex-col items-center md:items-start">
              <Label className="text-pink-300 mb-2 block">Token Logo</Label>
              <div
                className="w-48 h-48 rounded-lg bg-black/30 border border-purple-500/30 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => document.getElementById("logo-upload")?.click()}
                title="Click to upload image"
              >
                {logoPreview ? (
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-pink-300/50 mb-2" />
                    <span className="text-xs text-pink-300/70">Click to upload</span>
                  </>
                )}
              </div>
              <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </div>
          </div>

          {/* Name和Symbol - 右侧 */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row mb-4 md:mb-6">
              <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                <Label htmlFor="name" className="text-pink-300 mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter token name"
                  className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 w-full h-10"
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="symbol" className="text-pink-300 mb-2 block">
                  Symbol
                </Label>
                <Input
                  id="symbol"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  placeholder="Enter token symbol"
                  className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 w-full h-10"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Genesis Duration和Liquidity Lock Duration */}
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                <div className="flex items-center mb-2">
                  <Label htmlFor="genesisDuration" className="text-pink-300">
                    Genesis Duration
                  </Label>
                  <div className="inline-flex items-center">
                    <InfoTooltip
                      content="Duration of fundraising in the Genesis Stage"
                      iconClassName="ml-1.5 text-pink-300/70 hover:text-pink-300"
                      iconSize={14}
                    />
                  </div>
                </div>
                <div className="relative w-full">
                  <Input
                    id="genesisDuration"
                    name="genesisDuration"
                    value={formData.genesisDuration}
                    onChange={handleChange}
                    placeholder="Enter duration"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={minGenesisDuration}
                    max={maxGenesisDuration}
                    className={cn(
                      "bg-black/30 border text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pr-16 w-full h-10",
                      isGenesisDurationValid ? "border-purple-500/30" : "border-red-500 focus:border-red-500",
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-pink-300">
                    Days
                  </div>
                </div>
                <div
                  className={cn(
                    "flex items-center mt-1 transition-all duration-300",
                    !isGenesisDurationValid && formData.genesisDuration !== ""
                      ? "text-red-500 animate-flash"
                      : "text-pink-300/70",
                  )}
                >
                  {!isGenesisDurationValid && formData.genesisDuration !== "" && (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  <p className="text-xs">
                    Must be between {minGenesisDuration} and {maxGenesisDuration} days
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Label htmlFor="liquidityLockDuration" className="text-pink-300">
                    Liquidity Lock Duration
                  </Label>
                  <div className="inline-flex items-center">
                    <InfoTooltip
                      content="Duration of liquidity pool lockup in the liquidity Locked Stage"
                      iconClassName="ml-1.5 text-pink-300/70 hover:text-pink-300"
                      iconSize={14}
                    />
                  </div>
                </div>
                <div className="relative w-full">
                  <Input
                    id="liquidityLockDuration"
                    name="liquidityLockDuration"
                    value={formData.liquidityLockDuration}
                    onChange={handleChange}
                    placeholder="Enter duration"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={minLockupDays}
                    max={maxLockupDays}
                    className={cn(
                      "bg-black/30 border text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pr-16 w-full h-10",
                      isLiquidityLockDurationValid ? "border-purple-500/30" : "border-red-500 focus:border-red-500",
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-pink-300">
                    Days
                  </div>
                </div>
                <div
                  className={cn(
                    "flex items-center mt-1 transition-all duration-300",
                    !isLiquidityLockDurationValid && formData.liquidityLockDuration !== ""
                      ? "text-red-500 animate-flash"
                      : "text-pink-300/70",
                  )}
                >
                  {!isLiquidityLockDurationValid && formData.liquidityLockDuration !== "" && (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  <p className="text-xs">
                    Must be between {minLockupDays} and {maxLockupDays} days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 三个选择器放在同一排，在移动设备上变成垂直排列 */}
        <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0">
          {/* Genesie Fund Type */}
          <div className="w-full md:w-48 md:mr-6">
            <div className="flex items-center mb-2">
              <Label className="text-pink-300">Genesie Fund Type</Label>
              <div className="inline-flex items-center">
                <InfoTooltip
                  content="Type of token for the genesis funds raised"
                  iconClassName="ml-1.5 text-pink-300/70 hover:text-pink-300"
                  iconSize={14}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full h-[38px] bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 justify-between"
              onClick={() => openModal("fundType")}
            >
              <span>{formData.genesieFundType}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row space-y-4 md:space-y-0">
            {/* Governance Chain */}
            <div className="flex-1 md:mr-6">
              <div className="flex items-center mb-2">
                <Label className="text-pink-300">Governance Chain</Label>
                <div className="inline-flex items-center">
                  <InfoTooltip
                    content="DAO governor, yield vault, and DAO treasury contract will be deployed on the governance chain"
                    iconClassName="ml-1.5 text-pink-300/70 hover:text-pink-300"
                    iconSize={14}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-[38px] bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 justify-between"
                onClick={() => openModal("network")}
              >
                <div className="flex items-center">
                  {formData.governanceChain && (
                    <img
                      src={`/networks/${formData.governanceChain.toLowerCase().replace(/\s+/g, "")}.svg`}
                      alt={formData.governanceChain}
                      className="w-5 h-5 mr-2"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/networks/ethereum.svg"
                      }}
                    />
                  )}
                  {formData.governanceChain}
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* OmniChains */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Label className="text-pink-300">OmniChains</Label>
                <div className="inline-flex items-center">
                  <InfoTooltip
                    content="Additional blockchains where the token will be accessible "
                    iconClassName="ml-1.5 text-pink-300/70 hover:text-pink-300"
                    iconSize={14}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-[38px] bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 justify-between"
                onClick={() => openModal("omniChains")}
              >
                <span>
                  {formData.omniChains.length > 0 ? `${formData.omniChains.length} chains selected` : "Select Chains"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="description" className="text-pink-300">
              Description
            </Label>
            <span className="text-xs text-pink-300/70">{formData.description.length}/255</span>
          </div>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter text here..."
            maxLength={255}
            className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 min-h-[120px] w-full"
          />
        </div>
      </>
    )
  },
)

FormSection.displayName = "FormSection"
