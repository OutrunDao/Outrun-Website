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
        {/* Two column layout for smaller inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-pink-300 mb-2 block">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter token name"
              className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30"
            />
          </div>

          {/* Symbol */}
          <div>
            <Label htmlFor="symbol" className="text-pink-300 mb-2 block">
              Symbol
            </Label>
            <Input
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="Enter token symbol"
              className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30"
              maxLength={10}
            />
          </div>

          {/* Genesis Duration */}
          <div>
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
            <div className="relative">
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
                  "bg-black/30 border text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pr-16",
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
              {!isGenesisDurationValid && formData.genesisDuration !== "" && <AlertCircle className="h-3 w-3 mr-1" />}
              <p className="text-xs">
                Duration must be between {minGenesisDuration} and {maxGenesisDuration} days
              </p>
            </div>
          </div>

          {/* Liquidity Lock Duration */}
          <div>
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
            <div className="relative">
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
                  "bg-black/30 border text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 pr-16",
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
                Duration must be between {minLockupDays} and {maxLockupDays} days
              </p>
            </div>
          </div>

          {/* Token Logo */}
          <div>
            <Label className="text-pink-300 mb-2 block">Select Image</Label>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg bg-black/50 border border-dashed border-purple-500/50 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="h-6 w-6 text-pink-300/50" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-[38px] bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 flex items-center justify-between"
                    onClick={() => document.getElementById("logo-upload")?.click()}
                  >
                    <span>Select Image</span>
                  </Button>
                  <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <p className="text-xs text-pink-300/70 mt-1">
                    {formData.logoFile ? formData.logoFile.name : "No file selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Genesie Fund Type */}
          <div>
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

          {/* Governance Chain */}
          <div>
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
          <div>
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
            className="bg-black/30 border border-purple-500/30 text-white placeholder:text-pink-300/50 focus:border-pink-500/50 focus:bg-purple-950/50 focus:outline-none selection:bg-pink-500/30 min-h-[120px]"
          />
        </div>
      </>
    )
  },
)

FormSection.displayName = "FormSection"
