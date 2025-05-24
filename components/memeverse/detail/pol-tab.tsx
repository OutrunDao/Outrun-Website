"use client"

import { Button } from "@/components/ui/button"
import { formatMarketCap } from "@/utils/format"

interface POLTabProps {
  project: any
}

export function POLTab({ project }: POLTabProps) {
  // Mock POL data
  const polData = {
    totalPOL: 1000000,
    yourPOL: 5000,
    polPrice: 0.12,
    polMarketCap: 120000,
    polCirculatingSupply: 1000000,
    polTotalSupply: 10000000,
    contractAddress: "0x7c3275529694a91eeea2cb8176c2a7e9e6961d24", // Add POL contract address
    polDistribution: [
      { name: "Genesis Users", percentage: 30 },
      { name: "Treasury", percentage: 40 },
      { name: "Team", percentage: 10 },
      { name: "Ecosystem", percentage: 20 },
    ],
    polVesting: [
      { group: "Genesis Users", schedule: "25% at TGE, 25% monthly for 3 months" },
      { group: "Treasury", schedule: "10% at TGE, 5% monthly for 18 months" },
      { group: "Team", schedule: "0% at TGE, 6-month cliff, 10% monthly for 10 months" },
      { group: "Ecosystem", schedule: "5% at TGE, 5% monthly for 19 months" },
    ],
  }

  return (
    <div className="space-y-6">
      {/* POL概览 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-pink-300">POL Overview</h3>
          <div className="flex-1 flex justify-center">
            <div className="text-center">
              <span className="text-pink-300 mr-2">Contract Address:</span>
              <span className="font-mono text-white/90">{polData.contractAddress}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">POL Market Price</div>
            <div className="text-xl font-bold text-white">${polData.polPrice.toFixed(4)}</div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">POL Nominal Price</div>
            <div className="text-xl font-bold text-white">${(polData.polPrice * 1.25).toFixed(4)}</div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Market Cap</div>
            <div className="text-xl font-bold text-white">{formatMarketCap(polData.polMarketCap)}</div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Total Supply</div>
            <div className="text-xl font-bold text-white">{polData.polTotalSupply.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Your POL */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <h3 className="text-lg font-semibold text-pink-300 mb-4">Your POL</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Your POL Balance</div>
            <div className="text-xl font-bold text-white">{polData.yourPOL.toLocaleString()} POL</div>
            <div className="text-sm text-pink-300/80 mt-1">
              ${(polData.yourPOL * polData.polPrice).toLocaleString()}
            </div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Claimable POL</div>
            <div className="text-xl font-bold text-white">0 POL</div>
            <Button
              className="mt-2 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
              disabled={true}
            >
              Claim POL
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
