"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TokenIcon } from "@/components/ui/token-icon"
import { Copy } from "lucide-react"

interface YieldVaultTabProps {
  project: any
}

export function YieldVaultTab({ project }: YieldVaultTabProps) {
  const [activeTab, setActiveTab] = useState("stake")
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  // Mock yield vault data
  const vaultData = {
    totalStaked: 25000000,
    yourStaked: 50000,
    apr: 42.5,
    rewards: 1250,
    lockPeriod: 7, // 天
    contractAddress: "0x9a67f1940164d0318612b497e8e6038f902a00a4", // Add Yield Vault contract address
  }

  return (
    <div className="space-y-6">
      {/* 收益库概览 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <h3 className="text-lg font-semibold text-pink-300 mb-4">Yield Vault Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Total Staked</div>
            <div className="text-xl font-bold text-white">
              {vaultData.totalStaked.toLocaleString()} {project.symbol}
            </div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">APR</div>
            <div className="text-xl font-bold text-white">{vaultData.apr.toFixed(2)}%</div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Lock Period</div>
            <div className="text-xl font-bold text-white">{vaultData.lockPeriod} days</div>
          </div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)] mt-6">
        <h3 className="text-lg font-semibold text-pink-300 mb-4">Yield Vault Contract</h3>
        <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
          <div className="text-sm text-pink-300/80 mb-1">Contract Address</div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-mono text-white truncate">{vaultData.contractAddress}</div>
            <button
              className="ml-2 p-1.5 bg-purple-500/20 hover:bg-purple-500/30 rounded-md transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(vaultData.contractAddress)
                // 可以添加一个复制成功的提示
              }}
              title="Copy to clipboard"
            >
              <Copy size={16} className="text-pink-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Your Staking */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <h3 className="text-lg font-semibold text-pink-300 mb-4">Your Staking</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Your Staked</div>
            <div className="text-xl font-bold text-white">
              {vaultData.yourStaked.toLocaleString()} {project.symbol}
            </div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Pending Rewards</div>
            <div className="text-xl font-bold text-white">
              {vaultData.rewards.toLocaleString()} {project.symbol}
            </div>
            <Button className="mt-2 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
              Claim Rewards
            </Button>
          </div>
        </div>
      </div>

      {/* Stake/Unstake interface */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <div className="flex border-b border-purple-500/20 mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "stake" ? "text-white border-b-2 border-pink-500" : "text-pink-300/80 hover:text-pink-300"
            }`}
            onClick={() => setActiveTab("stake")}
          >
            Stake
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "unstake" ? "text-white border-b-2 border-pink-500" : "text-pink-300/80 hover:text-pink-300"
            }`}
            onClick={() => setActiveTab("unstake")}
          >
            Unstake
          </button>
        </div>

        {activeTab === "stake" ? (
          <div>
            <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="text-sm text-gray-400">Balance: 100,000 {project.symbol}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                  placeholder="0.00"
                  className="w-full bg-transparent text-2xl font-medium text-white outline-none"
                />
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                  <TokenIcon symbol={project.symbol} className="w-5 h-5" />
                  <span className="text-white font-medium">{project.symbol}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button className="text-xs text-pink-300 hover:text-pink-200" onClick={() => setStakeAmount("25000")}>
                  25%
                </button>
                <button className="text-xs text-pink-300 hover:text-pink-200" onClick={() => setStakeAmount("50000")}>
                  50%
                </button>
                <button className="text-xs text-pink-300 hover:text-pink-200" onClick={() => setStakeAmount("75000")}>
                  75%
                </button>
                <button className="text-xs text-pink-300 hover:text-pink-200" onClick={() => setStakeAmount("100000")}>
                  Max
                </button>
              </div>
            </div>

            <Button
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium"
              disabled={!stakeAmount}
            >
              Stake {project.symbol}
            </Button>

            <div className="mt-4 text-xs text-pink-300/80">
              Note: Staked tokens will be locked for {vaultData.lockPeriod} days. During this period, you cannot unstake
              your tokens.
            </div>
          </div>
        ) : (
          <div>
            <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="text-sm text-gray-400">
                  Staked: {vaultData.yourStaked.toLocaleString()} {project.symbol}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                  placeholder="0.00"
                  className="w-full bg-transparent text-2xl font-medium text-white outline-none"
                />
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                  <TokenIcon symbol={project.symbol} className="w-5 h-5" />
                  <span className="text-white font-medium">{project.symbol}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="text-xs text-pink-300 hover:text-pink-200"
                  onClick={() => setUnstakeAmount((vaultData.yourStaked * 0.25).toString())}
                >
                  25%
                </button>
                <button
                  className="text-xs text-pink-300 hover:text-pink-200"
                  onClick={() => setUnstakeAmount((vaultData.yourStaked * 0.5).toString())}
                >
                  50%
                </button>
                <button
                  className="text-xs text-pink-300 hover:text-pink-200"
                  onClick={() => setUnstakeAmount((vaultData.yourStaked * 0.75).toString())}
                >
                  75%
                </button>
                <button
                  className="text-xs text-pink-300 hover:text-pink-200"
                  onClick={() => setUnstakeAmount(vaultData.yourStaked.toString())}
                >
                  Max
                </button>
              </div>
            </div>

            <Button
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium"
              disabled={!unstakeAmount}
            >
              Unstake {project.symbol}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
