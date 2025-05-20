import type { Token } from "@/types"

// Token icons mapping
export const TOKEN_ICONS: Record<string, string> = {
  ETH: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  WETH: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  USDC: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  USDT: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  DAI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  BTC: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  WBTC: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
}

// Background colors for fallback display
export const TOKEN_COLORS: Record<string, string> = {
  ETH: "#627EEA",
  WETH: "#627EEA",
  USDC: "#2775CA",
  USDT: "#26A17B",
  DAI: "#F5AC37",
  BTC: "#F7931A",
  WBTC: "#F7931A",
}

// Define common token list
export const TOKENS: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "0.42",
    price: 3500,
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  },
  {
    symbol: "WETH",
    name: "Wrapped ETH",
    description: "Wrapped Ethereum",
    balance: "0.00",
    price: 3500,
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "1,250.00",
    price: 1,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: "500.00",
    price: 1,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    balance: "750.00",
    price: 1,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: "0.015",
    price: 62000,
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
]

export const COMMON_TOKENS = TOKENS
