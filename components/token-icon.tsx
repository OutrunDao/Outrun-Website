"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"

interface TokenIconProps {
  symbol: string
  size?: number
  className?: string
}

const TokenIcon: React.FC<TokenIconProps> = ({ symbol, size = 24, className }) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  // Cache icon URL and background color using useMemo
  const memoizedValues = useMemo(() => {
    const url = `https://assets.coingecko.com/coins/images/1/thumb/${symbol.toLowerCase()}.png`
    const backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}` // Generate a random background color
    return { url, backgroundColor }
  }, [symbol])

  useEffect(() => {
    setIconUrl(null)
    setLoading(true)
    setError(false)

    const loadImage = async () => {
      try {
        const img = new Image()
        img.src = memoizedValues.url

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
        })

        setIconUrl(memoizedValues.url)
        setLoading(false)
      } catch (e) {
        setError(true)
        setLoading(false)
      }
    }

    loadImage()
  }, [symbol, memoizedValues.url])

  // Show fallback icon if no URL or load error
  let content
  if (loading) {
    content = <div style={{ width: size, height: size, backgroundColor: "lightgray", borderRadius: "50%" }} />
  } else if (error || !iconUrl) {
    content = (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: memoizedValues.backgroundColor,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: size * 0.6,
        }}
      >
        {symbol.charAt(0).toUpperCase()}
      </div>
    )
  } else {
    content = <img src={iconUrl || "/placeholder.svg"} alt={symbol} width={size} height={size} />
  }

  return <div className={className}>{content}</div>
}

export default TokenIcon
