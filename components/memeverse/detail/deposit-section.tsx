"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

interface Token {
  symbol: string
  name: string
  icon: string
  balance: number
}

interface Provider {
  id: string
  name: string
}

interface DepositSectionProps {
  availableTokens: Token[]
  providers: Provider[]
  myGenesisFunds: number
  onDeposit: (amount: string, token: Token, provider: Provider) => void
}

export function DepositSection({ availableTokens, providers, myGenesisFunds, onDeposit }: DepositSectionProps) {
  // Define the tokens we want to show
  const requiredTokens = ["ETH", "weETH", "stETH", "UETH"]

  // Ensure we have all required tokens, or create placeholders if missing
  const filteredTokens = requiredTokens.map((symbol) => {
    const found = availableTokens.find((t) => t.symbol === symbol)
    if (found) return found

    // Create placeholder if token not found
    return {
      symbol,
      name: symbol,
      icon: "/placeholder.svg",
      balance: 0,
    }
  })

  // Filter providers to only show weETH and stETH
  const filteredProviders = ["weETH (Etherfi)", "stETH (Lido)"].map((name) => {
    const found = providers.find((p) => p.name === name)
    if (found) return found

    // Create placeholder if provider not found
    return {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, ""),
      name,
    }
  })

  // Find providers for specific tokens
  const weETHProvider = filteredProviders.find((p) => p.name === "weETH (Etherfi)") || filteredProviders[0]
  const stETHProvider = filteredProviders.find((p) => p.name === "stETH (Lido)") || filteredProviders[0]

  // Find default provider for selection
  const defaultProvider = stETHProvider

  const [selectedToken, setSelectedToken] = useState(filteredTokens[0])
  const [tokenAmount, setTokenAmount] = useState("")
  const [selectedProvider, setSelectedProvider] = useState(defaultProvider)
  const [showTokenList, setShowTokenList] = useState(false)
  const [showProviderList, setShowProviderList] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const tokenButtonRef = useRef<HTMLButtonElement>(null)
  const tokenDropdownRef = useRef<HTMLDivElement>(null)
  const providerButtonRef = useRef<HTMLButtonElement>(null)
  const providerDropdownRef = useRef<HTMLDivElement>(null)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Check if provider selection should be enabled
  const isUETH = selectedToken.symbol === "UETH"
  const isWeETH = selectedToken.symbol === "weETH"
  const isStETH = selectedToken.symbol === "stETH"
  const isProviderSelectionDisabled = isUETH || isWeETH || isStETH

  // Update provider when token changes
  useEffect(() => {
    if (isWeETH) {
      setSelectedProvider(weETHProvider)
    } else if (isStETH) {
      setSelectedProvider(stETHProvider)
    }
  }, [selectedToken, isWeETH, isStETH, weETHProvider, stETHProvider])

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setTokenAmount(value)
  }

  // Handle token selection
  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token)
    setShowTokenList(false)
    setShowProviderList(false) // 确保关闭 Provider 下拉框
  }

  // Handle provider selection
  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider)
    setShowProviderList(false)
    setShowTokenList(false) // 确保关闭代币下拉框
  }

  // Handle max button click
  const handleMaxClick = () => {
    setTokenAmount(selectedToken.balance.toString())
  }

  // Handle deposit button click
  function handleDeposit() {
    if (!tokenAmount || isNaN(Number.parseFloat(tokenAmount)) || Number.parseFloat(tokenAmount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    // If it's a special token, use the corresponding provider
    let providerToUse = selectedProvider
    if (isUETH) {
      providerToUse = defaultProvider
    } else if (isWeETH) {
      providerToUse = weETHProvider
    } else if (isStETH) {
      providerToUse = stETHProvider
    }

    onDeposit(tokenAmount, selectedToken, providerToUse)
    setTokenAmount("") // Clear input
  }

  // Handle Provider selection box click
  const handleProviderClick = () => {
    if (!isProviderSelectionDisabled) {
      setShowProviderList(!showProviderList)
      if (!showProviderList) setShowTokenList(false) // 如果要打开 Provider 列表，确保关闭代币列表
    }
  }

  // Get Provider display content
  const getProviderContent = () => {
    if (isUETH) {
      return (
        <div className="flex items-center justify-center w-full text-gray-400 text-xs">
          <InfoTooltip
            content="Staked yield-bearing assets can mint UPT."
            iconSize={14}
            iconClassName="text-pink-400 mr-1.5"
          />
          <span>UETH is already staked</span>
        </div>
      )
    } else if (isWeETH) {
      return (
        <div className="flex items-center justify-between w-full">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{weETHProvider.name}</span>
          <InfoTooltip
            content="weETH must use Etherfi as provider"
            iconSize={14}
            iconClassName="text-pink-400 ml-1.5"
          />
        </div>
      )
    } else if (isStETH) {
      return (
        <div className="flex items-center justify-between w-full">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{stETHProvider.name}</span>
          <InfoTooltip content="stETH must use Lido as provider" iconSize={14} iconClassName="text-pink-400 ml-1.5" />
        </div>
      )
    } else {
      return (
        <>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{selectedProvider.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 ml-1" />
        </>
      )
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (
        tokenButtonRef.current &&
        !tokenButtonRef.current.contains(target) &&
        tokenDropdownRef.current &&
        !tokenDropdownRef.current.contains(target)
      ) {
        setShowTokenList(false)
      }

      if (
        providerButtonRef.current &&
        !providerButtonRef.current.contains(target) &&
        providerDropdownRef.current &&
        !providerDropdownRef.current.contains(target)
      ) {
        setShowProviderList(false)
      }
    }

    if (showTokenList || showProviderList) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showTokenList, showProviderList])

  // 更精细的响应式布局控制
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType("mobile")
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = deviceType === "mobile"
  const isTablet = deviceType === "tablet"
  const isDesktop = deviceType === "desktop"

  return (
    <div className="w-full lg:w-1/4 flex-shrink-0 deposit-section-container" style={{ overflow: "visible" }}>
      {/* 主容器 - 创建一个新的堆叠上下文 */}
      <div
        className="bg-[#0f0326]/90 rounded-lg border border-purple-500/40 flex flex-col shadow-[0_4px_20px_-4px_rgba(168,85,247,0.25)]"
        style={{
          aspectRatio: !isDesktop ? "auto" : "1/1",
          height: "auto",
          position: "relative", // 创建新的堆叠上下文
          overflow: "visible", // 确保溢出内容可见
        }}
      >
        {/* 内容容器 */}
        <div className={`p-3 flex flex-col h-full ${isDesktop ? "justify-between" : ""}`}>
          {/* 所有内容区域，包括按钮 */}
          <div className="flex flex-col space-y-3">
            {/* Token selection and amount input */}
            <div className="w-full bg-[#1a0f3d]/90 rounded-lg border border-purple-500/40 p-2">
              <div className="flex justify-between mb-1">
                {/* 代币选择容器 - 设置更高的z-index */}
                <div className="relative" style={{ zIndex: 6 }}>
                  <button
                    ref={tokenButtonRef}
                    onClick={() => {
                      setShowTokenList(!showTokenList)
                      if (!showTokenList) setShowProviderList(false)
                    }}
                    className="group flex items-center gap-1.5 bg-gradient-to-r from-[#1a0f3d] to-[#0f0326] rounded-md px-2.5 py-1 hover:from-[#2a1a5d] hover:to-[#1a0f3d] transition-all duration-300 h-7 border border-purple-500/30 shadow-sm shadow-purple-500/20"
                  >
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={selectedToken.icon || "/placeholder.svg"}
                        alt={selectedToken.symbol}
                        className="w-4 h-4 object-contain"
                        style={{ marginTop: "1px" }}
                      />
                    </div>
                    <span className="text-white text-sm font-medium">{selectedToken.symbol}</span>
                    <ChevronDown className="w-4.5 h-4.5 text-pink-400" />
                  </button>

                  {/* 代币下拉菜单 */}
                  {showTokenList && (
                    <div
                      ref={tokenDropdownRef}
                      className="absolute top-full left-0 mt-1 w-44 bg-[#0f0326]/95 border border-purple-500/40 rounded-lg shadow-lg"
                      style={{ maxHeight: "200px", overflowY: "auto", zIndex: 6 }}
                    >
                      <div className="py-1">
                        {filteredTokens.map((token, index) => (
                          <React.Fragment key={token.symbol}>
                            <button
                              className="w-full flex items-center justify-between px-3 py-2 hover:bg-purple-900/50 transition-colors"
                              onClick={() => handleTokenSelect(token)}
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center">
                                  <img
                                    src={token.icon || "/placeholder.svg"}
                                    alt={token.symbol}
                                    className="w-4 h-4 object-contain"
                                    style={{ marginTop: "1px" }}
                                  />
                                </div>
                                <span className="text-white text-sm">{token.symbol}</span>
                              </div>
                              <span className="text-gray-400 text-xs">{token.balance.toFixed(2)}</span>
                            </button>
                            {/* Add divider except after the last item */}
                            {index < filteredTokens.length - 1 && (
                              <div className="border-t border-purple-500/20 mx-2"></div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Amount input */}
                <div className="w-full max-w-[120px]">
                  <input
                    type="text"
                    id="tokenAmount"
                    name="tokenAmount"
                    value={tokenAmount}
                    onChange={handleAmountChange}
                    placeholder="0.0"
                    className="w-full bg-transparent text-right text-white text-base font-medium focus:outline-none"
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Balance row inside the input container */}
              <div className="flex items-center justify-between text-[11px]">
                <div className="text-gray-400">Balance: {selectedToken.balance.toFixed(2)}</div>
                <button onClick={handleMaxClick} className="text-pink-400 hover:text-pink-300 transition-colors">
                  Max
                </button>
              </div>
            </div>

            {/* Genesis Fund display box */}
            <div className="w-full bg-[#1a0f3d]/90 rounded-lg border border-purple-500/40 py-1.5 px-2 flex justify-between items-center">
              <div className="text-xs text-gray-400">My Genesis Fund:</div>
              <div className="text-xs text-pink-300 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]">
                {myGenesisFunds.toFixed(2)} UETH
              </div>
            </div>

            {/* Outstake Provider selection */}
            <div style={{ position: "relative", zIndex: 5, overflow: "visible" }}>
              <div className="text-xs text-gray-400 mb-1">Outstake Provider:</div>
              <div className="relative provider-dropdown-container" style={{ overflow: "visible" }}>
                <button
                  ref={providerButtonRef}
                  onClick={handleProviderClick}
                  className={`w-full bg-[#1a0f3d]/90 border border-purple-500/40 rounded-lg h-7 flex items-center justify-between px-2.5 text-white text-xs ${
                    isProviderSelectionDisabled ? "cursor-default" : "hover:bg-purple-900/30"
                  }`}
                  style={{ position: "relative", zIndex: 5 }}
                >
                  {getProviderContent()}
                </button>

                {/* Provider list dropdown */}
                {!isProviderSelectionDisabled && showProviderList && (
                  <div
                    ref={providerDropdownRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-[#0f0326]/95 border border-purple-500/40 rounded-lg shadow-lg provider-dropdown"
                    style={{
                      maxHeight: "144px",
                      overflowY: "auto",
                      zIndex: 50, // 提高z-index确保显示在其他元素之上
                      overflow: "visible",
                      boxShadow:
                        "0 8px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(168, 85, 247, 0.2), 0 0 20px rgba(236, 72, 153, 0.1)",
                    }}
                  >
                    <div className="py-1">
                      {filteredProviders.map((provider, index) => (
                        <React.Fragment key={provider.id}>
                          <button
                            className="w-full flex items-center justify-between px-3 py-2 hover:bg-purple-900/40 transition-colors text-sm"
                            onClick={() => handleProviderSelect(provider)}
                          >
                            <span className="text-white overflow-hidden text-ellipsis whitespace-nowrap">
                              {provider.name}
                            </span>
                          </button>
                          {/* Add divider except after the last item */}
                          {index < filteredProviders.length - 1 && (
                            <div className="border-t border-purple-500/20 mx-2"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 移动端和平板端的Deposit按钮 */}
            {(isMobile || isTablet) && (
              <div className="mt-3">
                <button
                  onClick={handleDeposit}
                  disabled={
                    !tokenAmount || isNaN(Number.parseFloat(tokenAmount)) || Number.parseFloat(tokenAmount) <= 0
                  }
                  className="w-full h-10 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium flex items-center justify-center transition-all duration-300 shadow-[0_4px_10px_-2px_rgba(168,85,247,0.4)]"
                  style={{ position: "relative", zIndex: 3 }}
                >
                  {Number.parseFloat(tokenAmount) > 0 ? "Genesis" : "Please Input"}
                </button>
              </div>
            )}
          </div>

          {/* 仅桌面端的Deposit按钮 */}
          {isDesktop && (
            <div className="mt-3 mb-3">
              <button
                onClick={handleDeposit}
                disabled={!tokenAmount || isNaN(Number.parseFloat(tokenAmount)) || Number.parseFloat(tokenAmount) <= 0}
                className="w-full h-8 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium flex items-center justify-center transition-all duration-300 shadow-[0_4px_10px_-2px_rgba(168,85,247,0.4)]"
                style={{ position: "relative", zIndex: 3 }}
              >
                {Number.parseFloat(tokenAmount) > 0 ? "Genesis" : "Please Input"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
