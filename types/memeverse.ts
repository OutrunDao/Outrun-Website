// Memeverse项目的阶段类型
export type ProjectStage = "Genesis" | "Refund" | "Locked" | "Unlocked"

// 项目模式类型
export type ProjectMode = "normal" | "flash"

// 排序方向类型
export type SortDirection = "asc" | "desc"

// 链信息类型
export interface ChainInfo {
  id: string
  name: string
  icon: string
}

// Omnichain支持的链类型
export interface OmniChain {
  name: string
  icon: string
}

// 阶段样式类型
export interface StageStyle {
  bg: string
  text: string
  glow: string
  gradient: string
}

// 排序选项类型
export interface SortOption {
  id: string
  label: string
}

// 链过滤器选项类型
export interface ChainFilter {
  id: string
  label: string
  icon?: string
}

// 阶段过滤器选项类型
export interface StageFilter {
  id: string
  label: string
}

// Memeverse项目类型
export interface MemeProject {
  id: number | string
  name: string
  symbol: string
  description: string
  stage: ProjectStage
  mode: ProjectMode
  chain?: string
  omnichain?: OmniChain[]
  raisedAmount: number
  raisedToken: string
  population: number
  marketCap: number
  progress?: number
  createdAt: string
  genesisEndTime?: string
  unlockTime?: string
  stakingApy?: number
  treasuryFund?: number
  listedOnOutSwap?: boolean
  image?: string
}

// 代币类型
export interface Token {
  symbol: string
  name: string
  icon: string
  balance?: number
  price?: number
  address?: string
}

// 提供者类型
export interface Provider {
  id: string
  name: string
  icon?: string
}

// 阶段颜色映射类型
export interface StageColorMap {
  [key: string]: StageStyle
}

// 排序选项映射类型
export interface SortOptionsMap {
  [key: string]: {
    [key: string]: SortOption[]
  }
}
