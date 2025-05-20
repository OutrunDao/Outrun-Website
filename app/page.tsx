"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RetroSun } from "@/components/retro-sun"
import { ModuleCard } from "@/components/module-card"
import { GradientCard } from "@/components/gradient-card"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  const sunScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5])
  const sunOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 0])

  return (
    <div ref={containerRef} className="relative">

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <motion.div
          style={{ scale: sunScale, opacity: sunOpacity }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-7xl -z-10"
        >
          <RetroSun />
        </motion.div>

        <div className="container px-4 md:px-6 mx-auto pt-24 pb-12">
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-4xl"
            >
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-70 rounded-full" />
                  <div className="relative px-6 py-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white">
                    Pioneering the Future of Web3
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                OUTRUN
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                Unlock higher, more flexible, and safer DeFi yields, Memecoin participation opportunities and a diverse
                range of Web3 experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              >
                Explore Ecosystem
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 w-full max-w-5xl"
            >
              <div className="relative h-12 md:h-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                  <p className="text-zinc-400 text-sm">Scroll to explore</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-zinc-300 border border-white/5">
                ECOSYSTEM
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
              The Outrun Ecosystem
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
              The Outrun ecosystem currently consists of four major modules, encompassing yield tokenization, liquid
              staking derivatives, RWAfi, decentralized exchange, a next-generation token financing paradigm, and
              Memecoin × DeFi × DAO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <ModuleCard
              title="OutStake"
              description="A protocol built entirely around yield-bearing tokens, introducing a new type of non-USD stablecoin model tied to yield rates."
              icon="Coins"
              href="/outstake"
              gradient="from-purple-500 to-indigo-600"
              learnMoreUrl="https://outrun.gitbook.io/doc/outstake"
            />

            <ModuleCard
              title="OutSwap"
              description="An innovative AMM with on-chain referral commission engine, offering real-time settlements and MEV protection."
              icon="ArrowLeftRight"
              href="/outswap"
              gradient="from-pink-500 to-purple-600"
              learnMoreUrl="https://outrun.gitbook.io/doc/outswap"
            />

            <ModuleCard
              title="FFLaunch"
              description="The first 'Risk-Free' LaunchPad that sets a new standard for fair and free launches with a truly community-driven approach."
              icon="Rocket"
              href="/fflaunch"
              gradient="from-blue-500 to-indigo-600"
              learnMoreUrl="https://outrun.gitbook.io/doc/fflaunch"
            />

            <ModuleCard
              title="Memeverse"
              description="An OmniChain memecoin launchpad built on the concept of FFLaunch, featuring memecoin staking and DAO governance."
              icon="Stars"
              href="/memeverse"
              gradient="from-cyan-500 to-blue-600"
              learnMoreUrl="https://outrun.gitbook.io/doc/memeverse"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <div className="inline-block mb-4">
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-zinc-300 border border-white/5">
                FEATURES
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 mb-6">
              Key Features
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
              Outrun combines innovative yield tokenization, fair launch models, and sustainable Memecoin development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <GradientCard
              title="Yield Tokenization"
              description="Innovative yield tokenization mechanism, through a new staking model, minting PT/YT tokens with eternal lifecycles, unlocking higher, more flexible DeFi yields."
              gradient="from-purple-500 to-blue-600"
              delay={0.1}
            />

            <GradientCard
              title="Universal Principal Token"
              description="Supported by LayerZero, UPT enables seamless cross-chain transfers, unifying the liquidity of interest-bearing tokens with the same underlying assets, amplifying network effects."
              gradient="from-blue-600 to-cyan-500"
              delay={0.2}
            />

            <GradientCard
              title="Decentralized Exchanges"
              description="A decentralized trading protocol integrated with innovative features such as a composable native on-chain referral commission engine and a native MEV protection module."
              gradient="from-purple-500 to-cyan-500"
              delay={0.3}
            />

            <GradientCard
              title="FFLaunch Model"
              description="A truly community-driven fundraising model, ensuring absolute fairness, security, and accessibility through an innovative risk-free launchpad mechanism, achieving a win-win for both fundraisers and investors."
              gradient="from-cyan-500 to-blue-600"
              delay={0.4}
            />

            <GradientCard
              title="Reshaping the Memecoin Space"
              description="By integrating Memecoin with DeFi and DAO governance, achieve sustainable development in the Memecoin space, transform user minds, and expand Memecoin adoption in the real world."
              gradient="from-purple-500 to-blue-600"
              delay={0.5}
            />

            <GradientCard
              title="Multi-Module Composability"
              description="Through innovative design, multi-module composability, and omnichain interoperability, a complete, closed-loop Outrun ecosystem is built, significantly enhancing network effects and ecological diversity."
              gradient="from-blue-600 to-cyan-500"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6">
                      Ready to Join the Next Generation of Web3?
                    </h2>
                    <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                      Explore the Outrun ecosystem and discover new opportunities for yield generation, liquidity
                      provision, and Memecoin participation.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        onClick={() => window.open("https://discord.gg/sEXfH7Am44", "_blank")}
                      >
                        Join Community
                        <svg
                          className="ml-2 h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-4 text-white">Stay Updated</h3>
                    <p className="text-zinc-300 mb-6">
                      Subscribe to our newsletter to receive the latest updates and announcements.
                    </p>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          id="newsletter-email"
                          name="newsletter-email"
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 rounded-full bg-black/30 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full h-12 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
