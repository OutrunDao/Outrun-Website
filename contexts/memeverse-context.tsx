"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { MemeProject, ProjectMode, SortDirection, ChainFilter, StageFilter, SortOption } from "@/types/memeverse"
import { MOCK_PROJECTS } from "@/data/memeverse-projects"

// Define constants
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

// Projects per page
const PROJECTS_PER_PAGE = 15

// Context type definition
interface MemeVerseContextType {
  // Project data
  projects: MemeProject[]
  filteredProjects: MemeProject[]
  currentProjects: MemeProject[]

  // Filter and sort state
  activeChainFilter: string
  activeStageFilter: string
  searchQuery: string
  selectedMode: ProjectMode
  showListedOnOutSwap: boolean
  sortOption: string
  sortDirection: SortDirection
  currentPage: number
  totalPages: number

  // Dropdown menu state
  isChainDropdownOpen: boolean
  isStageDropdownOpen: boolean
  isSortDropdownOpen: boolean
  activeDropdown: string | null

  // Constants
  CHAIN_FILTERS: ChainFilter[]
  STAGE_FILTERS: StageFilter[]
  SORT_OPTIONS: any

  // Methods
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

// Create Context
const MemeVerseContext = createContext<MemeVerseContextType | undefined>(undefined)

// Provider component
export function MemeVerseProvider({ children }: { children: ReactNode }) {
  // State
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

  // Initialize project data
  useEffect(() => {
    setProjects(MOCK_PROJECTS)
  }, [])

  // Filter projects
  useEffect(() => {
    let result = [...projects]

    // Apply stage filter
    const stageMap: Record<string, string> = {
      genesis: "Genesis",
      refund: "Refund",
      locked: "Locked",
      unlocked: "Unlocked",
    }
    result = result.filter((project) => project.stage === stageMap[activeStageFilter])

    // Apply mode filter (only in Genesis stage)
    if (activeStageFilter === "genesis") {
      result = result.filter((project) => project.mode === selectedMode)
    }

    // Apply OutSwap list filter (only in Genesis stage)
    if (activeStageFilter === "genesis" && showListedOnOutSwap) {
      result = result.filter((project) => project.listedOnOutSwap)
    }

    // Apply chain filter
    if (activeChainFilter !== "all") {
      result = result.filter((project) => project.chain?.toLowerCase() === activeChainFilter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.symbol.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    if (sortOption) {
      result.sort((a, b) => {
        let valueA = a[sortOption as keyof MemeProject]
        let valueB = b[sortOption as keyof MemeProject]

        // Handle date strings
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
    // Reset to first page
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

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)

  // Get current page projects
  const currentProjects = filteredProjects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    // Ensure page number is within valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // Toggle chain dropdown
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

  // Toggle stage dropdown
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

  // Toggle sort dropdown
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

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setActiveDropdown(null)
    setIsChainDropdownOpen(false)
    setIsStageDropdownOpen(false)
    setIsSortDropdownOpen(false)
  }

  // Get sort options applicable to current stage and mode
  const getSortOptions = () => {
    if (activeStageFilter === "genesis") {
      return SORT_OPTIONS.genesis[selectedMode] || []
    }
    return SORT_OPTIONS[activeStageFilter] || []
  }

  // Get label of current sort option
  const getCurrentSortLabel = () => {
    const options = getSortOptions()
    const option = options.find((opt: SortOption) => opt.id === sortOption)
    return option ? option.label : "Creation Time"
  }

  // Click outside to close dropdowns
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

  // Context value
  const value = {
    // Project data
    projects,
    filteredProjects,
    currentProjects,

    // Filter and sort state
    activeChainFilter,
    activeStageFilter,
    searchQuery,
    selectedMode,
    showListedOnOutSwap,
    sortOption,
    sortDirection,
    currentPage,
    totalPages,

    // Dropdown menu state
    isChainDropdownOpen,
    isStageDropdownOpen,
    isSortDropdownOpen,
    activeDropdown,

    // Constants
    CHAIN_FILTERS,
    STAGE_FILTERS,
    SORT_OPTIONS,

    // Methods
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

// Custom Hook
export function useMemeVerse() {
  const context = useContext(MemeVerseContext)
  if (context === undefined) {
    throw new Error("useMemeVerse must be used within a MemeVerseProvider")
  }
  return context
}
