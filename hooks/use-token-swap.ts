"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { COMMON_TOKENS } from "@/constants/tokens"
import type { Token } from "@/types"

interface UseTokenSwapProps {
  initialFromToken: Token
  initialToToken: Token
}

interface UseTokenSwapReturn {
  fromToken: Token
  toToken: Token
  fromAmount: string
  toAmount: string
  exchangeRate: number
  priceImpact: string
  isRateReversed: boolean
  setFromToken: (token: Token) => void
  setToToken: (token: Token) => void
  handleSwapTokens: () => void
  handleFromAmountChange: (value: string) => void
  handleToAmountChange: (value: string) => void
  handleMaxClick: () => void
  getMinReceived: (slippage: string) => string
  toggleRateDirection: () => void
  calculateSwap: (fromToken: Token, toToken: Token, amount: number) => number
}

export function useTokenSwap(
  { initialFromToken, initialToToken }: UseTokenSwapProps = {
    initialFromToken: COMMON_TOKENS[0],
    initialToToken: COMMON_TOKENS[1],
  },
): UseTokenSwapReturn {
  const [fromToken, setFromToken] = useState<Token>(initialFromToken)
  const [toToken, setToToken] = useState<Token>(initialToToken)
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [exchangeRate, setExchangeRate] = useState(0)
  const [priceImpact, setPriceImpact] = useState("0.2")
  const [isRateReversed, setIsRateReversed] = useState(false)

  // Use useMemo to calculate exchange rate to avoid unnecessary recalculations
  const calculatedExchangeRate = useMemo(() => {
    if (fromToken.price && toToken.price) {
      return fromToken.price / toToken.price
    }
    return 0
  }, [fromToken.price, toToken.price])

  // Update state when calculated exchange rate changes
  useEffect(() => {
    setExchangeRate(calculatedExchangeRate)
  }, [calculatedExchangeRate])

  // Use useCallback to optimize functions
  const handleSwapTokens = useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }, [fromToken, toToken, fromAmount, toAmount])

  const handleFromAmountChange = useCallback(
    (value: string) => {
      const cleanValue = value.replace(/[^0-9.]/g, "")
      setFromAmount(cleanValue)

      if (cleanValue && !isNaN(Number(cleanValue)) && exchangeRate) {
        const calculatedAmount = (Number(cleanValue) * exchangeRate).toFixed(6)
        setToAmount(calculatedAmount)
      } else {
        setToAmount("")
      }
    },
    [exchangeRate],
  )

  const handleToAmountChange = useCallback(
    (value: string) => {
      const cleanValue = value.replace(/[^0-9.]/g, "")
      setToAmount(cleanValue)

      if (cleanValue && !isNaN(Number(cleanValue)) && exchangeRate) {
        const calculatedAmount = (Number(cleanValue) / exchangeRate).toFixed(6)
        setFromAmount(calculatedAmount)
      } else {
        setFromAmount("")
      }
    },
    [exchangeRate],
  )

  const handleMaxClick = useCallback(() => {
    const balance = fromToken.balance.replace(/,/g, "")
    setFromAmount(balance)
    if (exchangeRate) {
      const calculatedAmount = (Number(balance) * exchangeRate).toFixed(6)
      setToAmount(calculatedAmount)
    }
  }, [fromToken.balance, exchangeRate])

  const getMinReceived = useCallback(
    (slippage: string): string => {
      if (!toAmount) return "0"
      const amount = Number.parseFloat(toAmount)
      const slippagePercent = Number.parseFloat(slippage) / 100
      return (amount * (1 - slippagePercent)).toFixed(6)
    },
    [toAmount],
  )

  const toggleRateDirection = useCallback(() => {
    setIsRateReversed((prev) => !prev)
  }, [])

  // Add function to calculate swap
  const calculateSwap = useCallback((fromToken: Token, toToken: Token, amount: number): number => {
    if (!fromToken.price || !toToken.price) return 0
    const rate = fromToken.price / toToken.price
    return amount * rate
  }, [])

  return {
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
    calculateSwap,
  }
}
