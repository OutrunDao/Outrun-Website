"use client"

import { useState, useRef, useCallback, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, RefreshCw, Settings, ArrowDownUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TokenIcon } from "@/components/ui/token-icon"
import { TokenSelectionModal } from "@/components/token-selection-modal"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { RouteModal } from "@/components/route-modal"
import { useTokenSwap } from "@/hooks/use-token-swap"
import { formatCurrency, formatDollarValue, getPriceImpactColor } from "@/utils/format"
import { COMMON_TOKENS } from "@/constants/tokens"
import { useWallet } from "@/contexts/wallet-context"
import { GradientBackgroundCard } from "@/components/ui/gradient-background-card"

// Mock token data
const tokens = COMMON_TOKENS

export function EnhancedSwapInterface() {
  // Use our custom hook for token swap logic
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    exchangeRate,
    priceImpact,
    isRateReversed,
    setFromToken,
    setToToken,
    handleSwapTokens,
    handleFromAmountChange,
    handleToAmountChange,
    handleMaxClick,
    getMinReceived,
    toggleRateDirection,
  } = useTokenSwap({
    initialFromToken: tokens[0], // ETH
    initialToToken: tokens[2], // USDC
  })

  const [showFromTokenModal, setShowFromTokenModal] = useState(false)
  const [showToTokenModal, setShowToTokenModal] = useState(false)
  const [slippage, setSlippage] = useState("0.5")
  const [showSettings, setShowSettings] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [swapDeadline, setSwapDeadline] = useState("10")
  const [antiMEV, setAntiMEV] = useState(false)
  const [showRouteModal, setShowRouteModal] = useState(false)

  // Use useWallet hook
  const { isConnected, isConnecting, connectWallet } = useWallet()

  // Mock route data
  const routeData = useMemo(
    () => ({
      pools: [
        {
          tokenA: fromToken.symbol,
          tokenB: "WETH",
          fee: "0.05%",
        },
        {
          tokenA: "WETH",
          tokenB: toToken.symbol,
          fee: "0.3%",
        },
      ],
    }),
    [fromToken.symbol, toToken.symbol],
  )

  const settingsPanelRef = useRef<HTMLDivElement>(null)

  // Add functionality to close settings panel when clicking outside
  useEffect(() => {
    if (!showSettings) return

    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside the settings panel
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node) &&
        // Make sure it's not clicking the settings button itself
        !(event.target as Element).closest('[title="Settings"]')
      ) {
        setShowSettings(false)
      }
    }

    // Add global click event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSettings])

  // Get exchange rate display
  const getExchangeRateDisplay = useCallback(() => {
    if (!fromToken.price || !toToken.price) return null

    const rate = isRateReversed ? toToken.price / fromToken.price : fromToken.price / toToken.price
    const baseToken = isRateReversed ? toToken : fromToken
    const quoteToken = isRateReversed ? fromToken : toToken

    // Calculate dollar value - always based on 1 unit of the base token
    const dollarValue = isRateReversed ? 1 * toToken.price : 1 * fromToken.price

    return (
      <div className="flex justify-between items-center py-0.5">
        <div className="flex items-center text-xs text-zinc-400">
          <span>
            1 {baseToken.symbol} = {formatCurrency(rate.toString())} {quoteToken.symbol} (
            {formatDollarValue(dollarValue)})
          </span>
          <button
            className="ml-1 text-zinc-400 hover:text-white flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              toggleRateDirection()
            }}
          >
            <RefreshCw size={12} />
          </button>
        </div>
        <button
          className="text-xs text-zinc-400 hover:text-white flex-shrink-0"
          onClick={() => setShowDetails(!showDetails)}
        >
          <ChevronDown size={14} className={`transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`} />
        </button>
      </div>
    )
  }, [fromToken, toToken, isRateReversed, showDetails, toggleRateDirection])

  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          transform: "scale(0.9)",
          transformOrigin: "center center",
        }}
      >
        <GradientBackgroundCard shadow border borderColor="rgba(236,72,153,0.3)" shadowColor="rgba(236,72,153,0.4)">
          <div className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center h-8">
                <InfoTooltip
                  content={
                    <div>
                      Enable AntiMEV when the input is greater than 0.5% of reserves.
                      <br />
                      Anti-MEV cannot be enabled during the initial liquidity protection period.
                      <br />
                      <a
                        href="https://outrun.gitbook.io/doc/outswap/mev-guard/working-principle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-1"
                      >
                        Learn more
                      </a>
                    </div>
                  }
                  position="top"
                  className="mr-1"
                  iconClassName="text-purple-400 hover:text-purple-300 transition-colors"
                />
                <span className="text-sm font-medium mr-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                  AntiMEV
                </span>
                <button
                  className={`w-8 h-5 rounded-md p-0.5 transition-colors duration-300 ${antiMEV ? "bg-gradient-to-r from-purple-600/70 to-pink-600/70" : "bg-white/10"}`}
                  onClick={() => setAntiMEV(!antiMEV)}
                >
                  <div
                    className={`w-4 h-4 rounded-md bg-white transition-transform duration-300 ${antiMEV ? "translate-x-3" : "translate-x-0"} my-auto`}
                  />
                </button>
              </div>

              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] uppercase absolute left-1/2 top-5 -translate-x-1/2">
                Swap
              </h2>

              <button
                className="p-2 text-purple-300 relative"
                onClick={() => setShowSettings(!showSettings)}
                title="Settings"
              >
                <Settings size={18} />
              </button>
            </div>

            {/* Settings Panel Dropdown */}
            {showSettings && (
              <div className="absolute top-16 right-0 z-50 w-64">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg overflow-visible"
                  style={{
                    boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
                    border: "1px solid rgba(236,72,153,0.3)",
                  }}
                  ref={settingsPanelRef}
                >
                  <div className="bg-gradient-to-br from-[#0f0326]/95 via-[#1a0445]/95 to-[#0f0326]/95 backdrop-blur-xl p-4 rounded-xl relative">
                    {/* Grid background */}
                    <div
                      className="absolute inset-0 opacity-10 rounded-xl pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "center center",
                      }}
                    />
                    <div className="space-y-5 relative z-10">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-sm text-white">Max slippage</span>
                            <InfoTooltip
                              content="Your transaction will revert if the price changes more than the slippage percentage."
                              position="top"
                              className="ml-1"
                              iconClassName="text-purple-400 hover:text-purple-300 transition-colors scale-90"
                            />
                          </div>
                          <span className="text-white text-sm">{slippage}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className={`px-2 py-1 rounded-lg text-xs ${slippage === "0.1" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent event bubbling
                              setSlippage("0.1")
                            }}
                          >
                            0.1%
                          </button>
                          <button
                            className={`px-2 py-1 rounded-lg text-xs ${slippage === "0.5" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent event bubbling
                              setSlippage("0.5")
                            }}
                          >
                            0.5%
                          </button>
                          <button
                            className={`px-2 py-1 rounded-lg text-xs ${slippage === "1.0" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent event bubbling
                              setSlippage("1.0")
                            }}
                          >
                            1.0%
                          </button>
                          <div className="relative flex-1">
                            <input
                              type="text"
                              id="slippage-input"
                              name="slippage"
                              value={slippage}
                              onChange={(e) => setSlippage(e.target.value.replace(/[^0-9.]/g, ""))}
                              onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                              className="w-full px-2 py-1 rounded-lg text-xs bg-black/40 text-white border border-pink-500/20 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-sm text-white">Swap deadline</span>
                            <InfoTooltip
                              content="Your transaction will revert if it is pending for more than this period of time."
                              position="top"
                              className="ml-1"
                              iconClassName="text-purple-400 hover:text-purple-300 transition-colors scale-90"
                            />
                          </div>
                          <span className="text-white text-sm">{swapDeadline} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className={`px-2 py-1 rounded-lg text-xs ${swapDeadline === "10" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent event bubbling
                              setSwapDeadline("10")
                            }}
                          >
                            10
                          </button>
                          <button
                            className={`px-2 py-1 rounded-lg text-xs ${swapDeadline === "20" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent event bubbling
                              setSwapDeadline("20")
                            }}
                          >
                            20
                          </button>
                          <button
                            className={`px-2 py-1 rounded-lg text-xs ${swapDeadline === "30" ? "bg-purple-600/30 text-purple-300" : "bg-black/30 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent event bubbling
                              setSwapDeadline("30")
                            }}
                          >
                            30
                          </button>
                          <div className="relative flex-1">
                            <input
                              type="text"
                              id="deadline-input"
                              name="deadline"
                              value={swapDeadline}
                              onChange={(e) => setSwapDeadline(e.target.value.replace(/[^0-9]/g, ""))}
                              onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                              className="w-full px-2 py-1 rounded-lg text-xs bg-black/40 text-white border border-pink-500/20 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* From Token */}
            <div
              className="mb-1 p-3 rounded-lg bg-black/40 border border-pink-500/20"
              style={{ boxShadow: "0 0 10px rgba(236,72,153,0.1) inset" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <button
                    className="inline-flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 rounded-md transition-all duration-300 border border-pink-500/30 group hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-pink-900/30 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.25),inset_0_0_10px_rgba(168,85,247,0.2)]"
                    style={{
                      background: "linear-gradient(to right, rgba(15, 3, 38, 0.8), rgba(26, 4, 69, 0.8))",
                      boxShadow: "0 0 10px rgba(236, 72, 153, 0.15), inset 0 0 8px rgba(168, 85, 247, 0.1)",
                      width: "fit-content", // Make sure button width fits content
                    }}
                    onClick={() => setShowFromTokenModal(true)}
                  >
                    <TokenIcon symbol={fromToken.symbol} size={20} />
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {fromToken.symbol}
                    </span>
                    <ChevronDown size={16} className="text-zinc-400 group-hover:text-purple-300 transition-colors" />
                  </button>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-zinc-400">Balance: {fromToken.balance}</span>
                    <button
                      className="ml-2 text-xs text-purple-400 hover:text-purple-300 font-medium"
                      onClick={handleMaxClick}
                    >
                      Max
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <input
                    type="text"
                    id="from-amount"
                    name="from-amount"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-lg font-medium text-white focus:outline-none text-right w-full max-w-[120px]"
                  />
                  <span className="text-xs text-zinc-400 mt-1">~$1.00</span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center z-10 relative" style={{ marginTop: "-16px", marginBottom: "-10px" }}>
              <button
                className="p-2 rounded-md bg-black/80 border border-pink-500/30 hover:bg-black/90 transition-colors"
                onClick={handleSwapTokens}
                style={{ boxShadow: "0 0 12px rgba(236,72,153,0.3)" }}
              >
                <ArrowDownUp size={16} className="text-purple-400" />
              </button>
            </div>

            {/* To Token */}
            <div
              className="mb-3 p-3 rounded-lg bg-black/40 border border-pink-500/20"
              style={{ boxShadow: "0 0 10px rgba(236,72,153,0.1) inset" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <button
                    className="inline-flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 rounded-md transition-all duration-300 border border-pink-500/30 group hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-pink-900/30 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.25),inset_0_0_10px_rgba(168,85,247,0.2)]"
                    style={{
                      background: "linear-gradient(to right, rgba(15, 3, 38, 0.8), rgba(26, 4, 69, 0.8))",
                      boxShadow: "0 0 10px rgba(236, 72, 153, 0.15), inset 0 0 8px rgba(168, 85, 247, 0.1)",
                      width: "fit-content", // Make sure button width fits content
                    }}
                    onClick={() => setShowToTokenModal(true)}
                  >
                    <TokenIcon symbol={toToken.symbol} size={20} />
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {toToken.symbol}
                    </span>
                    <ChevronDown size={16} className="text-zinc-400 group-hover:text-purple-300 transition-colors" />
                  </button>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-zinc-400">Balance: {toToken.balance}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <input
                    type="text"
                    id="to-amount"
                    name="to-amount"
                    value={toAmount}
                    onChange={(e) => handleToAmountChange(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-lg font-medium text-white focus:outline-none text-right w-full max-w-[120px]"
                  />
                  <span className="text-xs text-zinc-400 mt-1">~$1.00 ({`-${priceImpact}%`})</span>
                </div>
              </div>
            </div>

            {/* Price Info */}
            {fromAmount && toAmount && (
              <div
                className="mb-3 p-2 rounded-lg bg-black/40 border border-pink-500/20"
                style={{ boxShadow: "0 0 10px rgba(236,72,153,0.1) inset" }}
              >
                {getExchangeRateDisplay()}

                {showDetails && (
                  <>
                    {/* Divider line */}
                    <div className="w-full h-px bg-zinc-700/50 my-2"></div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-xs text-zinc-400">Price Impact:</span>
                      <span className={`text-xs ${getPriceImpactColor(priceImpact)}`}>{priceImpact}%</span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-xs text-zinc-400">Min. Receive:</span>
                      <span className="text-xs text-white">
                        {getMinReceived(slippage)} {toToken.symbol}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-xs text-zinc-400">Max. Slippage:</span>
                      <span className="text-xs text-white">{slippage}%</span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-xs text-zinc-400">Route:</span>
                      <button
                        className="text-xs text-zinc-300 hover:text-white"
                        onClick={() => setShowRouteModal(true)}
                      >
                        View Route
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Swap Button */}
            {isConnected ? (
              <Button
                className="w-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-md h-10 text-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                disabled={!fromAmount || !toAmount}
                style={{
                  opacity: !fromAmount || !toAmount ? 0.8 : 1,
                  boxShadow: "0 0 15px rgba(168,85,247,0.4), 0 0 30px rgba(236,72,153,0.2)",
                }}
              >
                Swap
              </Button>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl h-10 text-sm"
                style={{
                  boxShadow: "0 0 15px rgba(168,85,247,0.4), 0 0 30px rgba(236,72,153,0.2)",
                }}
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
            )}
          </div>
        </GradientBackgroundCard>
      </motion.div>

      {/* Token Selection Modals */}
      <TokenSelectionModal
        isOpen={showFromTokenModal}
        onClose={() => setShowFromTokenModal(false)}
        onSelectToken={setFromToken}
        excludeToken={toToken.symbol}
        tokens={tokens}
      />

      <TokenSelectionModal
        isOpen={showToTokenModal}
        onClose={() => setShowToTokenModal(false)}
        onSelectToken={setToToken}
        excludeToken={fromToken.symbol}
        tokens={tokens}
      />

      {/* Route Modal */}
      <RouteModal
        isOpen={showRouteModal}
        onClose={() => setShowRouteModal(false)}
        fromToken={fromToken}
        toToken={toToken}
        route={routeData}
        antiMEV={antiMEV}
      />
    </div>
  )
}
