"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Stars, Coins, Gavel, Rocket, Shield, Unlock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"
import { UseCaseCard } from "@/components/ui/use-case-card"
import { useRouter } from "next/navigation"

export default function MemeversePage() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
        {/* Hero overlay - UPDATED to match main page */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/40 via-[#1a0445]/40 to-[#000000]/30 opacity-30" />

        <div className="container px-4 md:px-6 mx-auto py-24">
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="space-y-6 max-w-4xl">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-70 rounded-full" />
                  <div className="relative px-6 py-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white">
                    Memecoin × DeFi × DAO
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Memeverse
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                A disruptive innovation platform for Memecoin launch, staking and DAO governance, built around the
                'sustainability' ethos and based on the FFLaunch philosophy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative group cursor-pointer" onClick={() => router.push("/memeverse/board")}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-30 blur-[2px] group-hover:opacity-50 transition duration-300"></div>
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base w-full shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  Explore Memeverse
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Bottom gradient - UPDATED to match main page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f0326] to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 container px-4 md:px-6 mx-auto relative z-10">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-5" />

        <SectionHeading
          title="Key Features"
          description="Memeverse provides a platform for creating, launching, and managing memecoins with integrated staking and DAO governance."
          gradient="from-purple-400 to-pink-500"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            title="Omnichain Interoperability"
            description="Memeverse is a omnichain module powered by LayerZero and FFLaunch, allowing users to interact on any blockchain."
            bulletPoints={["Omnichain compatibility", "Participation risk protection", "Community-driven approach"]}
            icon={<Stars className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.1}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="Memecoin Staking"
            description="Memeverse features memecoin staking, allowing users to stake their memecoins and earn yields."
            bulletPoints={[
              "Stake memecoins for yields",
              "Composable ERC4626 Staked Memecoin",
              "Gain governance voting rights",
            ]}
            icon={<Coins className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.2}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="DAO Governance"
            description="Memeverse includes DAO governance, allowing memecoin communities to make decisions collectively."
            bulletPoints={[
              "Decentralized decision-making",
              "Transparent governance process",
              "Community treasury allocation",
            ]}
            icon={<Gavel className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.3}
            className="bg-black/60 backdrop-blur-sm"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 md:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0 opacity-50" />

        <div className="container px-4 md:px-6 mx-auto relative">
          <SectionHeading
            title="How Memeverse Works"
            description="Memeverse operates through a streamlined 4-stage lifecycle that ensures security, transparency, and fair participation for all users."
            gradient="from-blue-400 to-cyan-500"
            align="center"
            className="mb-16"
          />

          {/* Lifecycle Diagram */}
          <div className="relative mb-16 overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 p-6">
            <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
            <div className="relative">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">Memeverse Event Lifecycle</h3>
                  <p className="text-zinc-300">
                    A simplified 4-stage process with only 2 entities: Creators and Investors
                  </p>
                </div>
              </div>

              {/* Lifecycle Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Stage 1: Preparation */}
                <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 mt-2">Preparation Stage</h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Creator inputs information via website UI</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Sets rules and selects blockchains</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Pays cross-chain fees and gas fees</span>
                    </li>
                  </ul>
                  <div className="absolute bottom-4 right-4">
                    <Rocket className="h-6 w-6 text-purple-500/40" />
                  </div>
                </div>

                {/* Stage 2: Genesis */}
                <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 mt-2">Genesis Stage</h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2">•</span>
                      <span>Investors deposit UPT tokens</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2">•</span>
                      <span>1/3 funds for POL liquidity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2">•</span>
                      <span>2/3 funds for memecoin liquidity</span>
                    </li>
                  </ul>
                  <div className="absolute bottom-4 right-4">
                    <Coins className="h-6 w-6 text-pink-500/40" />
                  </div>
                </div>

                {/* Stage 3: Liquidity Locking */}
                <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 mt-2">Liquidity Locking</h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Deploy related contracts if minimum funds reached</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Trading pairs deployed on OutrunAMM</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Genesis participants can mint POL tokens</span>
                    </li>
                  </ul>
                  <div className="absolute bottom-4 right-4">
                    <Shield className="h-6 w-6 text-blue-500/40" />
                  </div>
                </div>

                {/* Stage 4: Liquidity Unlocking */}
                <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 mt-2">Liquidity Unlocking</h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Occurs after unlockTime is reached</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>Users can burn POL to redeem liquidity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span>24-hour Liquidity Protection Period</span>
                    </li>
                  </ul>
                  <div className="absolute bottom-4 right-4">
                    <Unlock className="h-6 w-6 text-cyan-500/40" />
                  </div>
                </div>
              </div>

              {/* Alternative Path */}
              <div className="mt-8 bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                <h4 className="text-lg font-semibold text-white mb-3">Alternative: Refund Stage</h4>
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                    <span className="text-red-400 font-medium">If minimum funds not reached</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    If genesis funds are less than minTotalFunds, the project enters refund stage where investors can
                    redeem all deposited UPT tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 to-pink-600" />
              <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
              <div className="relative p-6 md:p-8">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Memeverse Ecosystem Benefits</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white mr-3">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-white">FFLaunch Paradigm</h4>
                        <p className="text-sm text-zinc-300">
                          Fundamentally eliminate fraud risks such as insider trading and rug pulls.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white mr-3">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Memecoin DAO Treasury</h4>
                        <p className="text-sm text-zinc-300">
                          UPT portion of market-making earnings from trading pairs support the Memecoin community
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white mr-3">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Memecoin Yield Vaults</h4>
                        <p className="text-sm text-zinc-300">
                          Memecoin portion of market-making earnings enter yield vaults on respective chains for
                          continuous staking yields
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <div>
              <UseCaseCard
                title="Why Choose Memeverse?"
                description="Memeverse provides a secure, transparent, and fair platform for creating and managing memecoins with built-in sustainability mechanisms."
                steps={[
                  "Simplified creation process with no coding knowledge required - just use our intuitive UI to launch your memecoin.",
                  "Multi-chain deployment with universal token templates and fair distribution mechanisms across multiple blockchains.",
                  "Built-in staking and DAO governance to ensure long-term sustainability and community-driven development.",
                  "Liquidity protection mechanisms that prevent rug pulls and ensure fair participation for all users.",
                ]}
                color="#a855f7"
                delay={0.1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0" />

        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-grid-pattern bg-center opacity-20" />

              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6">
                    Ready to Join the Memeverse?
                  </h2>

                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    Create, launch, and manage your memecoin with Memeverse's intuitive platform and community-driven
                    approach.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="relative group cursor-pointer" onClick={() => router.push("/memeverse/board")}>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-30 blur-[2px] group-hover:opacity-50 transition duration-300"></div>
                      <Button
                        size="lg"
                        className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base w-full shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                      >
                        Launch App
                      </Button>
                    </div>

                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-30 blur-[2px] group-hover:opacity-50 transition duration-300"></div>
                      <Button
                        size="lg"
                        variant="outline"
                        className="relative bg-black/50 backdrop-blur-sm border-0 text-white rounded-full px-8 h-12 text-base w-full 
      group-hover:bg-black/70 transition-all duration-300"
                        onClick={() => window.open("https://outrun.gitbook.io/doc/memeverse", "_blank")}
                      >
                        Read Documentation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
