"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, ArrowRight, Coins, BarChart3, PieChart } from "lucide-react"
import { formatUSD } from "@/utils/memeverse"

interface MemeverseTreasuryProps {
  project: any
}

export function MemeverseTreasury({ project }: MemeverseTreasuryProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "allocations" | "proposals">("overview")

  // Calculate treasury fund - estimate based on market cap if project doesn't have treasuryFund property
  const treasuryFund = project.treasuryFund || project.marketCap * 0.1

  // Mock fund allocation
  const allocations = [
    { category: "Development", percentage: 40, amount: treasuryFund * 0.4 },
    { category: "Marketing", percentage: 25, amount: treasuryFund * 0.25 },
    { category: "Liquidity", percentage: 20, amount: treasuryFund * 0.2 },
    { category: "Community", percentage: 10, amount: treasuryFund * 0.1 },
    { category: "Reserve", percentage: 5, amount: treasuryFund * 0.05 },
  ]

  // Mock proposals
  const proposals = [
    {
      id: 1,
      title: "Increase Marketing Budget",
      description: "Allocate additional funds for marketing campaigns to increase project visibility.",
      requestedAmount: treasuryFund * 0.05,
      votes: { for: 65, against: 35 },
      status: "Active",
      endTime: "2023-07-15T12:00:00Z",
    },
    {
      id: 2,
      title: "Community Events Funding",
      description: "Fund community-driven events and competitions to boost engagement.",
      requestedAmount: treasuryFund * 0.02,
      votes: { for: 82, against: 18 },
      status: "Passed",
      endTime: "2023-06-30T12:00:00Z",
    },
    {
      id: 3,
      title: "Developer Grants Program",
      description: "Establish a grants program to support developers building on the ecosystem.",
      requestedAmount: treasuryFund * 0.08,
      votes: { for: 45, against: 55 },
      status: "Rejected",
      endTime: "2023-06-15T12:00:00Z",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Tab navigation */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-1">
        <div className="flex">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "allocations"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            onClick={() => setActiveTab("allocations")}
          >
            Allocations
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "proposals"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            onClick={() => setActiveTab("proposals")}
          >
            Proposals
          </button>
        </div>
      </div>

      {/* Overview tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Treasury overview */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Treasury Overview</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total funds */}
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Total Treasury</span>
                </div>
                <div className="text-2xl font-bold text-white">{formatUSD(treasuryFund)}</div>
                <div className="text-xs text-zinc-400 mt-1">Last updated: Today</div>
              </div>

              {/* Monthly income */}
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Monthly Income</span>
                </div>
                <div className="text-2xl font-bold text-white">{formatUSD(treasuryFund * 0.05)}</div>
                <div className="text-xs text-zinc-400 mt-1">From trading fees & staking rewards</div>
              </div>

              {/* Monthly expenses */}
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Monthly Expenses</span>
                </div>
                <div className="text-2xl font-bold text-white">{formatUSD(treasuryFund * 0.03)}</div>
                <div className="text-xs text-zinc-400 mt-1">Based on approved proposals</div>
              </div>
            </div>

            {/* Fund growth chart */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Treasury Growth</h4>
              <div className="h-64 bg-black/40 rounded-lg border border-white/5 p-4 flex items-end">
                {[10, 20, 35, 25, 40, 30, 45, 55, 65, 60, 75, 90].map((height, index) => (
                  <div key={index} className="flex-1 flex items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="w-2/3 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-zinc-500">
                <div>Jan</div>
                <div>Feb</div>
                <div>Mar</div>
                <div>Apr</div>
                <div>May</div>
                <div>Jun</div>
                <div>Jul</div>
                <div>Aug</div>
                <div>Sep</div>
                <div>Oct</div>
                <div>Nov</div>
                <div>Dec</div>
              </div>
            </div>
          </div>

          {/* Recent transactions */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Transactions</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">Trading Fee Revenue</td>
                    <td className="py-3 px-4 text-green-400">+{formatUSD(treasuryFund * 0.01)}</td>
                    <td className="py-3 px-4 text-zinc-300">Jun 10, 2023</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Income</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">Marketing Campaign</td>
                    <td className="py-3 px-4 text-red-400">-{formatUSD(treasuryFund * 0.005)}</td>
                    <td className="py-3 px-4 text-zinc-300">Jun 8, 2023</td>
                    <td className="py-3 px-4">
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">Expense</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">Staking Rewards</td>
                    <td className="py-3 px-4 text-green-400">+{formatUSD(treasuryFund * 0.008)}</td>
                    <td className="py-3 px-4 text-zinc-300">Jun 5, 2023</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Income</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white">Developer Payments</td>
                    <td className="py-3 px-4 text-red-400">-{formatUSD(treasuryFund * 0.012)}</td>
                    <td className="py-3 px-4 text-zinc-300">Jun 1, 2023</td>
                    <td className="py-3 px-4">
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">Expense</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Community Event Funding</td>
                    <td className="py-3 px-4 text-red-400">-{formatUSD(treasuryFund * 0.003)}</td>
                    <td className="py-3 px-4 text-zinc-300">May 28, 2023</td>
                    <td className="py-3 px-4">
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">Expense</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Fund allocation tab */}
      {activeTab === "allocations" && (
        <div className="space-y-6">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Treasury Allocations</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pie chart */}
              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <PieChart className="w-full h-full text-zinc-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{formatUSD(treasuryFund)}</div>
                      <div className="text-sm text-zinc-400">Total Treasury</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allocation list */}
              <div>
                <div className="space-y-4">
                  {allocations.map((allocation, index) => (
                    <div key={index} className="bg-black/40 rounded-lg p-4 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{allocation.category}</span>
                        <span className="text-zinc-300">{allocation.percentage}%</span>
                      </div>
                      <div className="w-full bg-black/60 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                          style={{ width: `${allocation.percentage}%` }}
                        />
                      </div>
                      <div className="text-right text-sm text-zinc-400">{formatUSD(allocation.amount)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fund usage details */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Allocation Details</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-3">Development (40%)</h4>
                <p className="text-zinc-300 mb-4">
                  Funds allocated for core protocol development, smart contract audits, and technical infrastructure.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="text-sm text-zinc-400 mb-1">Core Development</div>
                    <div className="text-white font-medium">{formatUSD(treasuryFund * 0.25)}</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="text-sm text-zinc-400 mb-1">Security Audits</div>
                    <div className="text-white font-medium">{formatUSD(treasuryFund * 0.1)}</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="text-sm text-zinc-400 mb-1">Infrastructure</div>
                    <div className="text-white font-medium">{formatUSD(treasuryFund * 0.05)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-white mb-3">Marketing (25%)</h4>
                <p className="text-zinc-300 mb-4">
                  Funds allocated for promotional campaigns, partnerships, and community growth initiatives.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="text-sm text-zinc-400 mb-1">Campaigns</div>
                    <div className="text-white font-medium">{formatUSD(treasuryFund * 0.15)}</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="text-sm text-zinc-400 mb-1">Partnerships</div>
                    <div className="text-white font-medium">{formatUSD(treasuryFund * 0.1)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proposals tab */}
      {activeTab === "proposals" && (
        <div className="space-y-6">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Governance Proposals</h3>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-4 py-2 rounded-lg">
                Create Proposal
              </button>
            </div>

            <div className="space-y-6">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="bg-black/40 rounded-lg p-5 border border-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-medium text-white">{proposal.title}</h4>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        proposal.status === "Active"
                          ? "bg-blue-500/20 text-blue-400"
                          : proposal.status === "Passed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {proposal.status}
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm mb-4">{proposal.description}</p>

                  <div className="flex justify-between items-center text-sm text-zinc-400 mb-4">
                    <div>Requested: {formatUSD(proposal.requestedAmount)}</div>
                    {proposal.status === "Active" && <div>Ends: {new Date(proposal.endTime).toLocaleDateString()}</div>}
                  </div>

                  {/* Voting progress bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-green-400">For: {proposal.votes.for}%</span>
                      <span className="text-red-400">Against: {proposal.votes.against}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400"
                        style={{ width: `${proposal.votes.for}%` }}
                      />
                    </div>
                  </div>

                  {/* Voting buttons - only show for active proposals */}
                  {proposal.status === "Active" && (
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm py-2 rounded-lg transition-colors">
                        Vote For
                      </button>
                      <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm py-2 rounded-lg transition-colors">
                        Vote Against
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Voting weight */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your Voting Power</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Staked {project.symbol}</span>
                </div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-xs text-zinc-400 mt-1">Stake tokens to gain voting power</div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Voting Power</span>
                </div>
                <div className="text-2xl font-bold text-white">0%</div>
                <div className="text-xs text-zinc-400 mt-1">Of total voting power</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/5">
              <p className="text-zinc-300 text-sm">
                Stake your {project.symbol} tokens to participate in governance. Each staked token grants you voting
                power proportional to your share of the total staked supply.
              </p>
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-4 py-2 rounded-lg">
                Stake to Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
