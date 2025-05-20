import type React from "react"
// 通用类型定义

export type Token = {
  symbol: string
  name: string
  description?: string
  balance: string
  price?: number
  address?: string
}

export type ModuleType = "outswap" | "outstake" | "fflaunch" | "memeverse"

export type TooltipPosition = "top" | "bottom" | "left" | "right"

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  position?: TooltipPosition
  className?: string
  contentClassName?: string
  showArrow?: boolean
  delay?: number
  maxWidth?: number
}

export interface SimpleTooltipProps {
  content: React.ReactNode
  position?: TooltipPosition
  children: React.ReactNode
  className?: string
  maxWidth?: number
}

export interface InfoTooltipProps {
  content: React.ReactNode
  position?: TooltipPosition
  className?: string
  iconSize?: number
  maxWidth?: number
}

export interface TokenCardProps {
  title: string
  description: string
  formula: string
  gradient: string
  delay?: number
}

export interface ModuleCardProps {
  title: string
  description: string
  icon: "Coins" | "ArrowLeftRight" | "Rocket" | "Stars"
  href: string
  gradient: string
  learnMoreUrl?: string
}

export interface EnhancedModuleCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; size?: number }>
  href: string
  module: ModuleType
  learnMoreUrl?: string
}

export interface GradientCardProps {
  title: string
  description: string
  gradient: string
  delay?: number
}

export interface FeatureCardProps {
  title: string
  description: string
  bulletPoints?: string[]
  icon?: React.ReactNode
  color?: string
  className?: string
  delay?: number
}

export interface UseCaseCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  steps?: string[]
  color?: string
  className?: string
  delay?: number
}

export interface TechSpecItem {
  label: string
  value: string
  icon?: React.ReactNode
}

export interface TechSpecCardProps {
  title: string
  specs: TechSpecItem[]
  color?: string
  className?: string
  delay?: number
}

export interface SectionHeadingProps {
  title: string
  description?: string
  badge?: string
  gradient?: string
  align?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  badgeClassName?: string
}

export interface TokenSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectToken: (token: Token) => void
  excludeToken?: string
  tokens: Token[]
}

export interface RouteModalProps {
  isOpen: boolean
  onClose: () => void
  fromToken: {
    symbol: string
  }
  toToken: {
    symbol: string
  }
  route: {
    pools: Array<{
      tokenA: string
      tokenB: string
      fee: string
    }>
  }
  antiMEV?: boolean
}

export interface TokenIconProps {
  symbol: string
  size?: number
  className?: string
}

export interface ParticleCanvasProps {
  className?: string
}

export type GeometricShapesProps = {
  className?: string
}

// 推荐返佣相关类型
export interface ReferralStats {
  totalEarned: string
  pendingRewards: string
  referralsCount: number
  activeTraders: number
  tier: number
}

export interface ReferralHistoryItem {
  id: number
  date: string
  user: string
  amount: string
  status: "Claimed" | "Pending"
}

export interface ReferredFriend {
  id: number
  joinDate: string
  address: string
  volume: string
  earned: string
}

export interface ReferralTier {
  level: number
  rebate: string
  requirement: string
}
