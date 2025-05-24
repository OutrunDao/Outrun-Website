"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { ArrowLeft, Settings, ChevronDown, ChevronUp, ArrowRightLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TokenIcon } from "@/components/ui/token-icon"
import { TokenSelectionModal } from "@/components/token-selection-modal"
import { COMMON_TOKENS } from "@/constants/tokens"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { useMobile } from "@/hooks/use-mobile"
import { useMemo } from "react"
import { GradientBackgroundCard } from "@/components/ui/gradient-background-card"

export default function AddLiquidityPage() {
  // State management
  const [token1, setToken1] = useState(COMMON_TOKENS[0]) // ETH
  const [token2, setToken2] = useState(COMMON_TOKENS[2]) // USDC
  const [token1Amount, setToken1Amount] = useState<string>("")
  const [token2Amount, setToken2Amount] = useState<string>("")
  const [showToken1Modal, setShowToken1Modal] = useState(false)
  const [showToken2Modal, setShowToken2Modal] = useState(false)
  const [showFeeTierDropdown, setShowFeeTierDropdown] = useState(false)
  const [selectedFeeTier, setSelectedFeeTier] = useState("0.30%")
  const [hoveredFeeTier, setHoveredFeeTier] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [slippage, setSlippage] = useState("0.5")
  const [swapDeadline, setSwapDeadline] = useState("10")
  const [isNewPool, setIsNewPool] = useState(true) // Whether it's a new pool
  const [startingPrice, setStartingPrice] = useState<string>("") // Starting price
  const [isPriceReversed, setIsPriceReversed] = useState(false) // Whether price is reversed
  const isMobile = useMobile() // Detect if mobile device

  // Mock price data
  const mockPrices = {
    ETH: 3450.78,
    USDC: 1.0,
    USDT: 1.0,
    DAI: 1.0,
    WBTC: 62150.25,
  }

  // Fee tier options
  const feeTiers = ["0.30%", "1.00%"]

  // References
  const feeTierRef = useRef<HTMLDivElement>(null)
  const settingsPanelRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Wallet connection
  const { isConnected } = useWallet()

  // Calculate USD value - using thousands separator
  const calculateUsdValue = (amount: string, symbol: string) => {
    if (!amount || isNaN(Number(amount))) return "--"
    const price = mockPrices[symbol as keyof typeof mockPrices] || 0
    const value = Number(amount) * price
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // Calculate starting price
  useEffect(() => {
    if (
      token1Amount &&
      token2Amount &&
      !isNaN(Number(token1Amount)) &&
      !isNaN(Number(token2Amount)) &&
      Number(token1Amount) > 0 &&
      Number(token2Amount) > 0
    ) {
      // Fix calculation logic: token2Amount / token1Amount
      const ratio = Number(token2Amount) / Number(token1Amount)
      setStartingPrice(ratio.toFixed(6))
    } else {
      setStartingPrice("")
    }
  }, [token1Amount, token2Amount])

  // Handle clicking outside to close the fee tier dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (feeTierRef.current && !feeTierRef.current.contains(event.target as Node)) {
        setShowFeeTierDropdown(false)
      }

      if (
        showSettings &&
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[title="Settings"]')
      ) {
        setShowSettings(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFeeTierDropdown, showSettings])

  // Enhanced input validation and sanitization function
  const sanitizeAndValidateNumberInput = useCallback(
    (value: string, maxDecimals = 6, maxLength = 20): string | null => {
      // 1. Length check - prevent overly long input
      if (value.length > maxLength) {
        return null
      }

      // 2. Allow empty string
      if (value === "") {
        return value
      }

      // 3. Basic format check - only allow numbers and decimal point
      if (!/^[\d.]+$/.test(value)) {
        return null
      }

      // 4. Check for multiple decimal points
      const decimalPoints = (value.match(/\./g) || []).length
      if (decimalPoints > 1) {
        return null
      }

      // 5. Check decimal places
      const parts = value.split(".")
      if (parts.length === 2 && parts[1].length > maxDecimals) {
        // If decimal places are too many, truncate instead of rejecting
        return `${parts[0]}.${parts[1].substring(0, maxDecimals)}`
      }

      // 6. Check if it's a valid number
      const num = Number(value)
      if (isNaN(num)) {
        return null
      }

      // 7. Check if it's non-negative
      if (num < 0) {
        return null
      }

      // 8. Check if it's finite
      if (!isFinite(num)) {
        return null
      }

      // 9. Remove leading zeros
      if (parts.length === 1 && parts[0].length > 1 && parts[0][0] === "0") {
        return parts[0].replace(/^0+/, "") || "0"
      }

      // 10. If decimal, ensure integer part doesn't start with multiple zeros
      if (parts.length === 2 && parts[0].length > 1 && parts[0][0] === "0") {
        return `${parts[0].replace(/^0+/, "") || "0"}.${parts[1]}`
      }

      return value
    },
    [],
  )

  // Functions to handle input changes
  const handleToken1Change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const sanitizedValue = sanitizeAndValidateNumberInput(rawValue)

      if (sanitizedValue !== null) {
        setToken1Amount(sanitizedValue)
      }
    },
    [sanitizeAndValidateNumberInput],
  )

  const handleToken2Change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const sanitizedValue = sanitizeAndValidateNumberInput(rawValue)

      if (sanitizedValue !== null) {
        setToken2Amount(sanitizedValue)
      }
    },
    [sanitizeAndValidateNumberInput],
  )

  // Handle slippage input
  const handleSlippageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const sanitizedValue = sanitizeAndValidateNumberInput(rawValue, 2, 5)

      if (sanitizedValue !== null) {
        setSlippage(sanitizedValue)
      }
    },
    [sanitizeAndValidateNumberInput],
  )

  // Handle swap deadline input
  const handleDeadlineChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    // 对于截止时间，我们只允许整数
    if (/^\d+$/.test(rawValue) && rawValue.length <= 3) {
      const num = Number.parseInt(rawValue, 10)
      if (num >= 0 && num <= 180) {
        setSwapDeadline(rawValue)
      }
    }
  }, [])

  // Safely parse numbers
  const safeParseFloat = useCallback((value: string): number => {
    try {
      const num = Number.parseFloat(value)
      return isNaN(num) || !isFinite(num) ? 0 : num
    } catch (e) {
      return 0
    }
  }, [])

  // Set maximum amount - remove all non-numeric characters
  const setMaxToken1 = useCallback(() => {
    if (!token1.balance) return

    // Safely clean balance string
    const cleanBalance = token1.balance.replace(/[^\d.]/g, "")
    const sanitizedValue = sanitizeAndValidateNumberInput(cleanBalance)

    if (sanitizedValue !== null) {
      setToken1Amount(sanitizedValue)
    }
  }, [token1.balance, sanitizeAndValidateNumberInput])

  const setMaxToken2 = useCallback(() => {
    if (!token2.balance) return

    // Safely clean balance string
    const cleanBalance = token2.balance.replace(/[^\d.]/g, "")
    const sanitizedValue = sanitizeAndValidateNumberInput(cleanBalance)

    if (sanitizedValue !== null) {
      setToken2Amount(sanitizedValue)
    }
  }, [token2.balance, sanitizeAndValidateNumberInput])

  // Reverse price display
  const handleReversePrice = () => {
    setIsPriceReversed(!isPriceReversed)
  }

  // Get display price
  const getDisplayPrice = () => {
    if (!startingPrice || startingPrice === "0") return "--"

    if (isPriceReversed) {
      // Reversed price: 1/startingPrice
      const reversedPrice = 1 / safeParseFloat(startingPrice)
      return (
        <>
          <span>1 {token2.symbol}</span>
          <span className="mx-1">=</span>
          <span>
            {reversedPrice.toLocaleString(undefined, { maximumFractionDigits: 6 })} {token1.symbol}
          </span>
        </>
      )
    } else {
      // Normal price
      return (
        <>
          <span>1 {token1.symbol}</span>
          <span className="mx-1">=</span>
          <span>
            {safeParseFloat(startingPrice).toLocaleString(undefined, { maximumFractionDigits: 6 })} {token2.symbol}
          </span>
        </>
      )
    }
  }

  // Safely check if liquidity can be added
  const canAddLiquidity = useMemo(() => {
    const amount1 = safeParseFloat(token1Amount)
    const amount2 = safeParseFloat(token2Amount)
    return token1Amount !== "" && token2Amount !== "" && amount1 > 0 && amount2 > 0
  }, [token1Amount, token2Amount, safeParseFloat])

  // Check if starting price should be displayed
  const shouldShowStartingPrice = useMemo(() => {
    const amount1 = safeParseFloat(token1Amount)
    const amount2 = safeParseFloat(token2Amount)
    return isNewPool && token1Amount && token2Amount && amount1 > 0 && amount2 > 0
  }, [isNewPool, token1Amount, token2Amount, safeParseFloat])

  // Back button component - renders different styles based on device type
  const BackButton = () => {
    // Don't render the back button on mobile devices as it will be rendered inside the card
    if (isMobile) {
      return null
    }

    // Back button for desktop
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-[-70px] z-10"
      >
        <Link
          href="/outswap/liquidity"
          className="flex items-center gap-1 text-pink-300 hover:text-pink-300 transition-colors"
          style={{ textShadow: "0 0 0px #ec4899" }}
          onMouseOver={(e) => (e.currentTarget.style.textShadow = "0 0 8px #ec4899")}
          onMouseOut={(e) => (e.currentTarget.style.textShadow = "0 0 0px #ec4899")}
        >
          <ArrowLeft size={14} />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </motion.div>
    )
  }

  // Function to handle adding liquidity
  const handleAddLiquidity = useCallback(() => {
    if (!canAddLiquidity) return

    // Here, we perform final data validation and sanitization before sending to API
    const sanitizedToken1Amount = sanitizeAndValidateNumberInput(token1Amount)
    const sanitizedToken2Amount = sanitizeAndValidateNumberInput(token2Amount)

    // If any value is invalid, don't continue
    if (sanitizedToken1Amount === null || sanitizedToken2Amount === null) {
      console.error("Invalid input values detected")
      return
    }

    // Convert strings to numbers for final validation
    const amount1 = safeParseFloat(sanitizedToken1Amount)
    const amount2 = safeParseFloat(sanitizedToken2Amount)

    if (amount1 <= 0 || amount2 <= 0) {
      console.error("Amount must be greater than 0")
      return
    }

    // Here, we can safely use these values for API calls
    console.log("Adding liquidity with validated inputs:", {
      token1: token1.symbol,
      token2: token2.symbol,
      amount1,
      amount2,
      feeTier: selectedFeeTier,
      slippage: safeParseFloat(slippage),
      deadline: Number.parseInt(swapDeadline, 10),
    })

    // Actual API call would be made here
    // ...
  }, [
    canAddLiquidity,
    token1Amount,
    token2Amount,
    token1.symbol,
    token2.symbol,
    selectedFeeTier,
    slippage,
    swapDeadline,
    sanitizeAndValidateNumberInput,
    safeParseFloat,
  ])

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative">
        <div className="w-full max-w-sm relative" ref={cardRef}>
          {/* Back button for desktop */}
          <BackButton />

          {/* Add liquidity card */}
          <GradientBackgroundCard
            shadow
            border
            borderColor="rgba(236,72,153,0.3)"
            shadowColor="rgba(236,72,153,0.4)"
            contentClassName="pt-3 pb-5 px-5"
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-4">
              {isMobile ? (
                <>
                  {/* Mobile layout - three-column layout to center the title */}
                  <Link
                    href="/outswap/liquidity"
                    className="text-pink-300 hover:text-pink-300 transition-colors"
                    style={{ textShadow: "0 0 0px #ec4899" }}
                    onMouseOver={(e) => (e.currentTarget.style.textShadow = "0 0 8px #ec4899")}
                    onMouseOut={(e) => (e.currentTarget.style.textShadow = "0 0 0px #ec4899")}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 12H3" />
                      <path d="m8 7-5 5 5 5" />
                    </svg>
                  </Link>
                  <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                    ADD LIQUIDITY
                  </h1>
                  <button
                    className="p-2 text-purple-300 relative"
                    onClick={() => setShowSettings(!showSettings)}
                    title="Settings"
                  >
                    <Settings size={18} />
                  </button>
                </>
              ) : (
                <>
                  {/* Original desktop layout */}
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                      ADD LIQUIDITY
                    </h1>
                  </div>
                  <button
                    className="p-2 text-purple-300 relative"
                    onClick={() => setShowSettings(!showSettings)}
                    title="Settings"
                  >
                    <Settings size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Settings Panel Dropdown */}
            {showSettings && (
              <div className="absolute top-16 right-0 z-50 w-64">
                <GradientBackgroundCard
                  className="rounded-lg overflow-visible"
                  shadow
                  border
                  borderColor="rgba(236,72,153,0.3)"
                  shadowColor="rgba(236,72,153,0.4)"
                  contentClassName="p-4 rounded-xl"
                  ref={settingsPanelRef}
                >
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-sm text-white">Max slippage</span>
                          <div
                            className="ml-1 text-zinc-400 hover:text-white cursor-help"
                            title="Your transaction will revert if the price changes more than the slippage percentage."
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 16v-4"></path>
                              <path d="M12 8h.01"></path>
                            </svg>
                          </div>
                        </div>
                        <span className="text-white text-sm">{slippage}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className={`px-2 py-1 rounded-lg text-xs ${slippage === "0.1" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                          onClick={() => setSlippage("0.1")}
                        >
                          0.1%
                        </button>
                        <button
                          className={`px-2 py-1 rounded-lg text-xs ${slippage === "0.5" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                          onClick={() => setSlippage("0.5")}
                        >
                          0.5%
                        </button>
                        <button
                          className={`px-2 py-1 rounded-lg text-xs ${slippage === "1.0" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                          onClick={() => setSlippage("1.0")}
                        >
                          1.0%
                        </button>
                        <div className="relative flex-1">
                          <input
                            type="text"
                            id="slippage-input"
                            name="slippage"
                            value={slippage}
                            onChange={handleSlippageChange}
                            className="w-full px-2 py-1 rounded-lg text-xs bg-black/40 text-white border border-pink-500/20 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-sm text-white">Transaction deadline</span>
                          <div
                            className="ml-1 text-zinc-400 hover:text-white cursor-help"
                            title="Your transaction will revert if it is pending for more than this period of time."
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 16v-4"></path>
                              <path d="M12 8h.01"></path>
                            </svg>
                          </div>
                        </div>
                        <span className="text-white text-sm">{swapDeadline} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className={`px-2 py-1 rounded-lg text-xs ${swapDeadline === "10" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                          onClick={() => setSwapDeadline("10")}
                        >
                          10
                        </button>
                        <button
                          className={`px-2 py-1 rounded-lg text-xs ${swapDeadline === "20" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                          onClick={() => setSwapDeadline("20")}
                        >
                          20
                        </button>
                        <button
                          className={`px-2 py-1 rounded-lg text-xs ${swapDeadline === "30" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                          onClick={() => setSwapDeadline("30")}
                        >
                          30
                        </button>
                        <div className="relative flex-1">
                          <input
                            type="text"
                            id="deadline-input"
                            name="deadline"
                            value={swapDeadline}
                            onChange={handleDeadlineChange}
                            className="w-full px-2 py-1 rounded-lg text-xs bg-black/40 text-white border border-pink-500/20 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GradientBackgroundCard>
              </div>
            )}

            {/* Token Pair */}
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">Token Pair</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="flex items-center justify-between bg-black/40 hover:bg-black/60 transition-colors border border-pink-500/20 rounded-lg p-2.5"
                  onClick={() => setShowToken1Modal(true)}
                >
                  <div className="flex items-center">
                    <TokenIcon symbol={token1.symbol} size={20} className="mr-2" />
                    <span className="text-white font-medium">{token1.symbol}</span>
                  </div>
                  <ChevronDown size={16} className="text-white/60" />
                </button>
                <button
                  className="flex items-center justify-between bg-black/40 hover:bg-black/60 transition-colors border border-pink-500/20 rounded-lg p-2.5"
                  onClick={() => setShowToken2Modal(true)}
                >
                  <div className="flex items-center">
                    <TokenIcon symbol={token2.symbol} size={20} className="mr-2" />
                    <span className="text-white font-medium">{token2.symbol}</span>
                  </div>
                  <ChevronDown size={16} className="text-white/60" />
                </button>
              </div>
            </div>

            {/* Fee Tier */}
            <div className="mb-4 relative" ref={feeTierRef}>
              <button
                className="w-full flex items-center justify-between bg-black/40 hover:bg-black/60 transition-colors border border-pink-500/20 rounded-lg p-2.5"
                onClick={() => setShowFeeTierDropdown(!showFeeTierDropdown)}
              >
                <span className="text-white font-medium">{selectedFeeTier} Fee Tier</span>
                {showFeeTierDropdown ? (
                  <ChevronUp size={16} className="text-white/60" />
                ) : (
                  <ChevronDown size={16} className="text-white/60" />
                )}
              </button>

              {/* Fee Tier Dropdown */}
              {showFeeTierDropdown && (
                <GradientBackgroundCard
                  className="absolute top-full left-0 right-0 mt-0 rounded-t-none rounded-b-lg overflow-hidden z-10 border border-pink-500/20"
                  contentClassName="relative"
                  showBottomGlow={false}
                >
                  <div className="relative" style={{ margin: 0, padding: 0 }}>
                    {feeTiers.map((tier) => (
                      <div
                        key={tier}
                        className="relative py-2.5 px-4"
                        style={{ marginBottom: 0 }}
                        onMouseEnter={() => setHoveredFeeTier(tier)}
                        onMouseLeave={() => setHoveredFeeTier(null)}
                      >
                        <div
                          className="text-white cursor-pointer relative z-10"
                          onClick={() => {
                            setSelectedFeeTier(tier)
                            setShowFeeTierDropdown(false)
                          }}
                        >
                          {tier} Fee Tier
                        </div>

                        {/* Hover effect box - only displayed on the currently hovered option */}
                        {hoveredFeeTier === tier && (
                          <div
                            className="absolute rounded"
                            style={{
                              top: "0px",
                              bottom: "0px",
                              left: "0px",
                              right: "0px",
                              background: "rgba(255, 255, 255, 0.06)",
                              pointerEvents: "none",
                            }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </GradientBackgroundCard>
              )}
            </div>

            {/* Supply Amount */}
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-2">Supply Amount</label>

              {/* Token 1 Input */}
              <div
                className="mb-3 p-3 rounded-lg bg-black/40 border border-pink-500/20"
                style={{ boxShadow: "0 0 10px rgba(236,72,153,0.1) inset" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <TokenIcon symbol={token1.symbol} size={20} className="mr-2" />
                    <span className="text-white font-medium">{token1.symbol}</span>
                  </div>
                  <input
                    type="text"
                    value={token1Amount}
                    onChange={handleToken1Change}
                    placeholder="0.00"
                    className="bg-transparent text-right text-white text-lg font-medium focus:outline-none w-1/2"
                    aria-label={`${token1.symbol} amount`}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-white/60">
                    <span>Balance: {token1.balance || "0.00"}</span>
                    <button
                      onClick={setMaxToken1}
                      className="ml-1 px-1.5 py-0.5 text-xs bg-white/10 hover:bg-white/20 transition-colors rounded text-white/80"
                    >
                      Max
                    </button>
                  </div>
                  <div className="text-white/60">
                    ~${token1Amount ? calculateUsdValue(token1Amount, token1.symbol) : "--"}
                  </div>
                </div>
              </div>

              {/* Token 2 Input */}
              <div
                className="p-3 rounded-lg bg-black/40 border border-pink-500/20"
                style={{ boxShadow: "0 0 10px rgba(236,72,153,0.1) inset" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <TokenIcon symbol={token2.symbol} size={20} className="mr-2" />
                    <span className="text-white font-medium">{token2.symbol}</span>
                  </div>
                  <input
                    type="text"
                    value={token2Amount}
                    onChange={handleToken2Change}
                    placeholder="0.00"
                    className="bg-transparent text-right text-white text-lg font-medium focus:outline-none w-1/2"
                    aria-label={`${token2.symbol} amount`}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-white/60">
                    <span>Balance: {token2.balance || "0.00"}</span>
                    <button
                      onClick={setMaxToken2}
                      className="ml-1 px-1.5 py-0.5 text-xs bg-white/10 hover:bg-white/20 transition-colors rounded text-white/80"
                    >
                      Max
                    </button>
                  </div>
                  <div className="text-white/60">
                    ~${token2Amount ? calculateUsdValue(token2Amount, token2.symbol) : "--"}
                  </div>
                </div>
              </div>
            </div>

            {/* Starting price - only displayed for new pools with input */}
            {shouldShowStartingPrice && (
              <div className="mb-4">
                <div
                  className="p-2 rounded-lg bg-black/40 border border-pink-500/20"
                  style={{ boxShadow: "0 0 10px rgba(236,72,153,0.1) inset" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white/60 text-xs">
                      <span>Starting price:</span>
                    </div>
                    <div className="flex items-center text-white text-xs">
                      {getDisplayPrice()}
                      <button
                        onClick={handleReversePrice}
                        className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
                        title="Reverse price"
                      >
                        <ArrowRightLeft size={16} className="text-white/70 hover:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add liquidity button */}
            <Button
              disabled={!canAddLiquidity}
              onClick={handleAddLiquidity}
              className={`w-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-md h-10 text-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]`}
              style={{
                opacity: !canAddLiquidity ? 0.8 : 1,
                boxShadow: "0 0 15px rgba(168,85,247,0.4), 0 0 30px rgba(236,72,153,0.2)",
              }}
            >
              {canAddLiquidity ? "Add Liquidity" : "Insufficient Balance"}
            </Button>
          </GradientBackgroundCard>
        </div>
      </div>

      {/* Token Selection Modals */}
      <TokenSelectionModal
        isOpen={showToken1Modal}
        onClose={() => setShowToken1Modal(false)}
        onSelectToken={(token) => {
          setToken1(token)
          setShowToken1Modal(false)
        }}
        excludeToken={token2.symbol}
        tokens={COMMON_TOKENS}
      />

      <TokenSelectionModal
        isOpen={showToken2Modal}
        onClose={() => setShowToken2Modal(false)}
        onSelectToken={(token) => {
          setToken2(token)
          setShowToken2Modal(false)
        }}
        excludeToken={token1.symbol}
        tokens={COMMON_TOKENS}
      />
    </div>
  )
}
