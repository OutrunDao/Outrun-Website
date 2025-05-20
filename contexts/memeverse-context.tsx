"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { MemeProject, ProjectMode, SortDirection, ChainFilter, StageFilter, SortOption } from "@/types/memeverse"
import { MOCK_PROJECTS } from "@/data/memeverse-projects"

// 定义常量
const CHAIN_FILTERS: ChainFilter[] = [
  { id: "all", label: "All Chains" },
  { id: "ethereum", label: "Ethereum", icon: "/networks/ethereum.svg" },
  { id: "base", label: "Base", icon: "/networks/base.svg" },
  { id: "arbitrum", label: "Arbitrum", icon: "/networks/arbitrum.svg" },
  { id: "polygon", label: "Polygon", icon: "/networks/polygon.svg" },
  { id: "bnb", label: "BNB Chain", icon: "/networks/bnb.svg" },
]

const STAGE_FILTERS: StageFilter[] = [
  { id: "genesis", label: "Genesis" },
  { id: "refund", label: "Refund" },
  { id: "locked", label: "Locked" },
  { id: "unlocked", label: "Unlocked" },
]

const SORT_OPTIONS: any = {
  genesis: {
    normal: [
      { id: "createdAt", label: "Creation Time" },
      { id: "genesisEndTime", label: "Genesis Endtime" },
      { id: "raisedAmount", label: "Total Raised" },
      { id: "population", label: "Population" },
    ],
    flash: [
      { id: "createdAt", label: "Creation Time" },
      { id: "genesisEndTime", label: "Genesis Endtime" },
      { id: "raisedAmount", label: "Total Raised" },
      { id: "population", label: "Population" },
      { id: "progress", label: "Progress" },
    ],
  },
  refund: [],
  locked: [
    { id: "createdAt", label: "Creation Time" },
    { id: "unlockTime", label: "Unlock Time" },
    { id: "marketCap", label: "Trading Volume" },
    { id: "stakingApy", label: "Staking APY" },
    { id: "treasuryFund", label: "Treasury Fund" },
  ],
  unlocked: [
    { id: "createdAt", label: "Creation Time" },
    { id: "marketCap", label: "Trading Volume" },
    { id: "stakingApy", label: "Staking APY" },
  ],
}

// 每页项目数
const PROJECTS_PER_PAGE = 15

// Context类型定义
interface MemeVerseContextType {
  // 项目数据
  projects: MemeProject[]
  filteredProjects: MemeProject[]
  currentProjects: MemeProject[]

  // 过滤和排序状态
  activeChainFilter: string
  activeStageFilter: string
  searchQuery: string
  selectedMode: ProjectMode
  showListedOnOutSwap: boolean
  sortOption: string
  sortDirection: SortDirection
  currentPage: number
  totalPages: number

  // 下拉菜单状态
  isChainDropdownOpen: boolean
  isStageDropdownOpen: boolean
  isSortDropdownOpen: boolean
  activeDropdown: string | null

  // 常量
  CHAIN_FILTERS: ChainFilter[]
  STAGE_FILTERS: StageFilter[]
  SORT_OPTIONS: any

  // 方法
  setActiveChainFilter: (filter: string) => void
  setActiveStageFilter: (filter: string) => void
  setSearchQuery: (query: string) => void
  setSelectedMode: (mode: ProjectMode) => void
  setShowListedOnOutSwap: (show: boolean) => void
  setSortOption: (option: string) => void
  toggleSortDirection: () => void
  handlePageChange: (page: number) => void
  toggleChainDropdown: () => void
  toggleStageDropdown: () => void
  toggleSortDropdown: () => void
  closeAllDropdowns: () => void
  getSortOptions: () => SortOption[]
  getCurrentSortLabel: () => string
}

// 创建Context
const MemeVerseContext = createContext<MemeVerseContextType | undefined>(undefined)

// Provider组件
export function MemeVerseProvider({ children }: { children: ReactNode }) {
  // 状态
  const [projects, setProjects] = useState<MemeProject[]>([])
  const [activeChainFilter, setActiveChainFilter] = useState("all")
  const [activeStageFilter, setActiveStageFilter] = useState("genesis")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState<MemeProject[]>([])
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)
  const [isStageDropdownOpen, setIsStageDropdownOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState<ProjectMode>("normal")
  const [showListedOnOutSwap, setShowListedOnOutSwap] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<string>("createdAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // 初始化项目数据
  useEffect(() => {
    setProjects(MOCK_PROJECTS)
  }, [])

  // 过滤项目
  useEffect(() => {
    let result = [...projects]

    // 应用阶段过滤
    const stageMap: Record<string, string> = {
      genesis: "Genesis",
      refund: "Refund",
      locked: "Locked",
      unlocked: "Unlocked",
    }
    result = result.filter((project) => project.stage === stageMap[activeStageFilter])

    // 应用模式过滤（仅在Genesis阶段）
    if (activeStageFilter === "genesis") {
      result = result.filter((project) => project.mode === selectedMode)
    }

    // 应用OutSwap列表过滤（仅在Genesis阶段）
    if (activeStageFilter === "genesis" && showListedOnOutSwap) {
      result = result.filter((project) => project.listedOnOutSwap)
    }

    // 应用链过滤
    if (activeChainFilter !== "all") {
      result = result.filter((project) => project.chain?.toLowerCase() === activeChainFilter)
    }

    // 应用搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.symbol.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query),
      )
    }

    // 应用排序
    if (sortOption) {
      result.sort((a, b) => {
        let valueA = a[sortOption as keyof MemeProject]
        let valueB = b[sortOption as keyof MemeProject]

        // 处理日期字符串
        if (
          typeof valueA === "string" &&
          (sortOption === "createdAt" || sortOption === "genesisEndTime" || sortOption === "unlockTime")
        ) {
          valueA = new Date(valueA).getTime()
          valueB = new Date(valueB as string).getTime()
        }

        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1
        } else {
          return valueA < valueB ? 1 : -1
        }
      })
    }

    setFilteredProjects(result)
    // 重置到第一页
    setCurrentPage(1)
  }, [
    activeChainFilter,
    activeStageFilter,
    searchQuery,
    selectedMode,
    showListedOnOutSwap,
    sortOption,
    sortDirection,
    projects,
  ])

  // 计算总页数
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)

  // 获取当前页面项目
  const currentProjects = filteredProjects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE)

  // 处理页码变更
  const handlePageChange = (pageNumber: number) => {
    // 确保页码在有效范围内
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      // 滚动到页面顶部
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // 切换排序方向
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // 切换链下拉菜单
  const toggleChainDropdown = () => {
    if (activeDropdown === "chain") {
      setActiveDropdown(null)
      setIsChainDropdownOpen(false)
    } else {
      setActiveDropdown("chain")
      setIsChainDropdownOpen(true)
      setIsStageDropdownOpen(false)
      setIsSortDropdownOpen(false)
    }
  }

  // 切换阶段下拉菜单
  const toggleStageDropdown = () => {
    if (activeDropdown === "stage") {
      setActiveDropdown(null)
      setIsStageDropdownOpen(false)
    } else {
      setActiveDropdown("stage")
      setIsStageDropdownOpen(true)
      setIsChainDropdownOpen(false)
      setIsSortDropdownOpen(false)
    }
  }

  // 切换排序下拉菜单
  const toggleSortDropdown = () => {
    if (activeDropdown === "sort") {
      setActiveDropdown(null)
      setIsSortDropdownOpen(false)
    } else {
      setActiveDropdown("sort")
      setIsSortDropdownOpen(true)
      setIsChainDropdownOpen(false)
      setIsStageDropdownOpen(false)
    }
  }

  // 关闭所有下拉菜单
  const closeAllDropdowns = () => {
    setActiveDropdown(null)
    setIsChainDropdownOpen(false)
    setIsStageDropdownOpen(false)
    setIsSortDropdownOpen(false)
  }

  // 获取适用于当前阶段和模式的排序选项
  const getSortOptions = () => {
    if (activeStageFilter === "genesis") {
      return SORT_OPTIONS.genesis[selectedMode] || []
    }
    return SORT_OPTIONS[activeStageFilter] || []
  }

  // 获取当前排序选项的标签
  const getCurrentSortLabel = () => {
    const options = getSortOptions()
    const option = options.find((opt: SortOption) => opt.id === sortOption)
    return option ? option.label : "Creation Time"
  }

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const target = event.target as HTMLElement
        if (!target.closest(".dropdown-container")) {
          closeAllDropdowns()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  // Context值
  const value = {
    // 项目数据
    projects,
    filteredProjects,
    currentProjects,

    // 过滤和排序状态
    activeChainFilter,
    activeStageFilter,
    searchQuery,
    selectedMode,
    showListedOnOutSwap,
    sortOption,
    sortDirection,
    currentPage,
    totalPages,

    // 下拉菜单状态
    isChainDropdownOpen,
    isStageDropdownOpen,
    isSortDropdownOpen,
    activeDropdown,

    // 常量
    CHAIN_FILTERS,
    STAGE_FILTERS,
    SORT_OPTIONS,

    // 方法
    setActiveChainFilter,
    setActiveStageFilter,
    setSearchQuery,
    setSelectedMode,
    setShowListedOnOutSwap,
    setSortOption,
    toggleSortDirection,
    handlePageChange,
    toggleChainDropdown,
    toggleStageDropdown,
    toggleSortDropdown,
    closeAllDropdowns,
    getSortOptions,
    getCurrentSortLabel,
  }

  return <MemeVerseContext.Provider value={value}>{children}</MemeVerseContext.Provider>
}

// 自定义Hook
export function useMemeVerse() {
  const context = useContext(MemeVerseContext)
  if (context === undefined) {
    throw new Error("useMemeVerse must be used within a MemeVerseProvider")
  }
  return context
}
