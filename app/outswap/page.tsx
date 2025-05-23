"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowLeftRight, Shield, Users } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"
import { EnhancedSwapInterface } from "@/components/enhanced-swap-interface"

export default function OutSwapPage() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="hero-background fixed inset-0 w-full h-full -z-20"></div>
        <div className="hero-content-wrapper">
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
                    <div className="relative px-6 py-2 bg-black/65 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white">
                      Innovative AMM
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  OutSwap
                </h1>

                <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                  An innovative AMM with on-chain referral commission engine, offering real-time settlements and MEV
                  protection.
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
                  onClick={() => router.push("/outswap/swap")}
                >
                  Start Trading
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
        </div>
      </section>

      {/* Swap Interface Preview */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0 opacity-50" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading
                  title="Seamless Token Trading"
                  description="Experience the future of decentralized trading with our intuitive swap interface. Trade tokens with confidence, knowing you're protected from MEV attacks."
                  gradient="from-purple-400 to-pink-500"
                  align="left"
                  className="mb-8"
                />

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 mr-4 mt-1">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">MEV Protection</h3>
                      <p className="text-zinc-400">
                        Trade with confidence knowing your transactions are protected from front-running and sandwich
                        attacks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 mr-4 mt-1">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Earn Referral Commission</h3>
                      <p className="text-zinc-400">
                        Invite friends and earn a percentage of their trading fees through our on-chain referral
                        commission engine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <EnhancedSwapInterface />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 container px-4 md:px-6 mx-auto relative z-10">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-5" />

        <SectionHeading
          title="Key Features"
          description="OutSwap is built on the classic AMM model with several innovative improvements, including an on-chain referral commission engine."
          gradient="from-purple-400 to-pink-500"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            title="Classic AMM Model"
            description="OutSwap is built on the classic AMM model but includes several innovative improvements for better performance."
            bulletPoints={["Efficient price discovery", "Optimized liquidity pools", "Reduced slippage"]}
            icon={<ArrowLeftRight className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.1}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="On-Chain Referral Commission"
            description="The built-in on-chain referral commission engine offers real-time settlements and is highly composable."
            bulletPoints={[
              "Real-time settlements",
              "Refer others to earn commissions",
              "Develop your own referral services",
            ]}
            icon={<Users className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.2}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="Anti-MEV Protection"
            description="OutSwap integrates the first native on-chain anti-MEV module that doesn't require external systems."
            bulletPoints={[
              "Protection against front-running",
              "Protection against sandwich attack",
              "Operates entirely on-chain",
            ]}
            icon={<Shield className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.3}
            className="bg-black/60 backdrop-blur-sm"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-blue-600/40" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-25" />
              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6">
                    Ready to Start Trading with OutSwap?
                  </h2>
                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    Join OutSwap today and experience the benefits of our innovative AMM with on-chain referral
                    commissions and MEV protection.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/outswap/swap">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base w-40 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      >
                        Launch App
                      </Button>
                    </Link>
                    <Link href="https://outrun.gitbook.io/doc/outswap" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white border-0 rounded-full px-8 h-12 text-base w-40 flex items-center justify-center shadow-[0_0_15px_rgba(219,39,119,0.5)]"
                      >
                        Read Doc
                      </Button>
                    </Link>
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
