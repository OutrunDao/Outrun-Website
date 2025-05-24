"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface DAOTabProps {
  project: any
}

export function DAOTab({ project }: DAOTabProps) {
  const [activeSection, setActiveSection] = useState("proposals")

  // Mock DAO data
  const daoData = {
    totalVotingPower: 25000000,
    yourVotingPower: 50000,
    contractAddress: "0x3d9d22ce8e205de5f3d0e9e0b258accde1d33a0b", // Add DAO Governor contract address
    proposals: [
      {
        id: 1,
        title: "Increase Yield Vault APR",
        description:
          "Proposal to increase the Yield Vault APR from 42.5% to 50% by allocating more tokens from the treasury.",
        status: "Active",
        votes: { for: 12500000, against: 5000000, abstain: 2500000 },
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      },
      {
        id: 2,
        title: "Add New Liquidity Pool",
        description: "Proposal to add a new liquidity pool for WBTC pairing with allocation from the treasury.",
        status: "Passed",
        votes: { for: 15000000, against: 3000000, abstain: 1000000 },
        endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        id: 3,
        title: "Reduce Unlock Period",
        description: "Proposal to reduce the token unlock period from 180 days to 150 days.",
        status: "Failed",
        votes: { for: 8000000, against: 12000000, abstain: 1500000 },
        endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
    ],
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate voting percentages
  const calculatePercentage = (votes: any) => {
    const total = votes.for + votes.against + votes.abstain
    return {
      for: ((votes.for / total) * 100).toFixed(2),
      against: ((votes.against / total) * 100).toFixed(2),
      abstain: ((votes.abstain / total) * 100).toFixed(2),
    }
  }

  return (
    <div className="space-y-6">
      {/* DAO概览 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <h3 className="text-lg font-semibold text-pink-300 mb-4">DAO Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Total Voting Power</div>
            <div className="text-xl font-bold text-white">
              {daoData.totalVotingPower.toLocaleString()} {project.symbol}
            </div>
          </div>

          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="text-sm text-pink-300/80 mb-1">Your Voting Power</div>
            <div className="text-xl font-bold text-white">
              {daoData.yourVotingPower.toLocaleString()} {project.symbol}
            </div>
            <div className="text-sm text-pink-300/80 mt-1">
              {((daoData.yourVotingPower / daoData.totalVotingPower) * 100).toFixed(4)}% of total
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)] mt-6">
        <h3 className="text-lg font-semibold text-pink-300 mb-4">DAO Governor Contract</h3>
        <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
          <div className="text-sm text-pink-300/80 mb-1">Contract Address</div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-mono text-white truncate">{daoData.contractAddress}</div>
            <button
              className="ml-2 p-1.5 bg-purple-500/20 hover:bg-purple-500/30 rounded-md transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(daoData.contractAddress)
                // Can add a copy success notification
              }}
              title="Copy to clipboard"
            >
              <Copy size={16} className="text-pink-300" />
            </button>
          </div>
        </div>
      </div>

      {/* DAO content selector */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
        <div className="flex border-b border-purple-500/20 mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === "proposals"
                ? "text-white border-b-2 border-pink-500"
                : "text-pink-300/80 hover:text-pink-300"
            }`}
            onClick={() => setActiveSection("proposals")}
          >
            Proposals
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === "create"
                ? "text-white border-b-2 border-pink-500"
                : "text-pink-300/80 hover:text-pink-300"
            }`}
            onClick={() => setActiveSection("create")}
          >
            Create Proposal
          </button>
        </div>

        {activeSection === "proposals" ? (
          <div className="space-y-4">
            {daoData.proposals.map((proposal) => {
              const percentages = calculatePercentage(proposal.votes)
              return (
                <div
                  key={proposal.id}
                  className="bg-black/40 rounded-lg border border-purple-500/30 p-4 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-white">{proposal.title}</h4>
                    <div
                      className={`px-2 py-1 text-xs rounded-full ${
                        proposal.status === "Active"
                          ? "bg-blue-600"
                          : proposal.status === "Passed"
                            ? "bg-green-600"
                            : "bg-red-600"
                      }`}
                    >
                      {proposal.status}
                    </div>
                  </div>

                  <p className="text-sm text-pink-300/80 mb-4">{proposal.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-pink-300/80 mb-1">
                      <span>Voting ends: {formatDate(proposal.endTime)}</span>
                      <span>
                        Total votes:{" "}
                        {(proposal.votes.for + proposal.votes.against + proposal.votes.abstain).toLocaleString()}
                      </span>
                    </div>

                    {/* Voting progress bar */}
                    <div className="h-4 bg-black/60 rounded-full overflow-hidden">
                      <div className="flex h-full">
                        <div className="bg-green-600 h-full" style={{ width: `${percentages.for}%` }}></div>
                        <div className="bg-red-600 h-full" style={{ width: `${percentages.against}%` }}></div>
                        <div className="bg-gray-600 h-full" style={{ width: `${percentages.abstain}%` }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-green-500">For: {percentages.for}%</span>
                      <span className="text-red-500">Against: {percentages.against}%</span>
                      <span className="text-gray-500">Abstain: {percentages.abstain}%</span>
                    </div>
                  </div>

                  {proposal.status === "Active" && (
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Vote For</Button>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">Vote Against</Button>
                      <Button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white">Abstain</Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-black/40 rounded-lg border border-purple-500/30 p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-pink-300/80 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full bg-black/60 border border-purple-500/30 rounded-lg p-2 text-white"
                  placeholder="Enter proposal title"
                />
              </div>

              <div>
                <label className="block text-sm text-pink-300/80 mb-1">Description</label>
                <textarea
                  className="w-full bg-black/60 border border-purple-500/30 rounded-lg p-2 text-white min-h-[100px]"
                  placeholder="Enter detailed proposal description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-pink-300/80 mb-1">Voting Period (days)</label>
                <input
                  type="number"
                  className="w-full bg-black/60 border border-purple-500/30 rounded-lg p-2 text-white"
                  placeholder="7"
                  min="1"
                  max="30"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
                Create Proposal
              </Button>

              <div className="text-xs text-pink-300/80">
                Note: Creating a proposal requires at least 1% of the total voting power. Your current voting power is{" "}
                {((daoData.yourVotingPower / daoData.totalVotingPower) * 100).toFixed(4)}%.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
