"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Rocket, Users, Shield, CheckCircle, Clock, Coins } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"

export default function FFLaunchPage() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

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
                    Risk-Free LaunchPad
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                FFLaunch
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                A revolutionary fair and risk-free token financing paradigm that protects investors from fraud, helps
                fundraisers secure continuous funding, and achieves a win-win for both.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-30 blur-[2px] group-hover:opacity-50 transition duration-300"></div>
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base w-full shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  Explore Projects
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
          description="FFLaunch represents a truly community-driven fundraising paradigm that ensures fairness and accessibility for all participants."
          gradient="from-purple-400 to-pink-500"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            title="Fair and Free Launches"
            description="FFLaunch sets a new standard for fair and free launches, ensuring that all participants have equal opportunities."
            bulletPoints={[
              "Equal access for all participants",
              "Transparent launch process",
              "No hidden fees or privileges",
            ]}
            icon={<Shield className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.1}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="Community-Driven Paradigm"
            description="FFLaunch represents a truly community-driven fundraising paradigm where investors can receive project tokens for free."
            bulletPoints={["Free tokens for investors", "Protect investors from fraud", "Liquidity risk control"]}
            icon={<Users className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.2}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="Additional Benefits For Fundraisers"
            description="Projects using FFLaunch for fundraising gain greater freedom and additional benefits."
            bulletPoints={[
              "Custom launch logic(More scalability)",
              "Continuous and uncapped funding support",
              "Easier to build a sustainable community",
            ]}
            icon={<Rocket className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.3}
            className="bg-black/60 backdrop-blur-sm"
          />
        </div>
      </section>

      {/* How It Works - COMPLETELY REDESIGNED */}
      <section className="py-10 md:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0 opacity-50" />

        <div className="container px-4 md:px-6 mx-auto relative">
          <SectionHeading
            title="How FFLaunch Works"
            description="FFLaunch provides a secure, transparent, and efficient platform for projects to raise funds and for investors to participate in launches."
            gradient="from-blue-400 to-cyan-500"
            align="center"
            className="mb-10"
          />

          {/* Timeline Component */}
          <div className="relative mt-20">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transform md:-translate-x-1/2"></div>

            {/* Stage 1: Apply Stage */}
            <div className="relative mb-20">
              <div className="flex flex-col md:flex-row items-start">
                <div className="hidden md:flex items-center md:w-1/2 md:justify-end md:pr-8">
                  <div className="relative z-10 md:text-right">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold mb-3 shadow-glow-purple">
                      1
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Apply Stage</h3>
                    <p className="text-zinc-300 text-sm md:text-base max-w-md">
                      Project teams develop smart contracts and apply to the Outrun Audit Team with detailed project
                      information.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 pl-12 w-full">
                  <div className="md:hidden mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold mb-3 shadow-glow-purple">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Apply Stage</h3>
                    <p className="text-zinc-300 text-sm max-w-md">
                      Project teams develop smart contracts and apply to the Outrun Audit Team with detailed project
                      information.
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 shadow-glow-sm">
                    <h4 className="text-base font-semibold text-purple-400 mb-2">Key Actions</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          Develop TokenGenerator, Token, and TimeLockVault contracts
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Submit detailed project and team information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Maintain communication with the Outrun Audit Team</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Circle on timeline */}
              <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 bg-purple-600 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-glow-purple z-10"></div>
            </div>

            {/* Stage 2: Audit Stage */}
            <div className="relative mb-20">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-8 order-2 md:order-1 pl-12 md:pl-0">
                  <div className="md:hidden mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 text-white font-bold mb-3 shadow-glow-pink">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Audit Stage</h3>
                    <p className="text-zinc-300 text-sm max-w-md">
                      The Outrun Audit Team thoroughly reviews the project and audits all contracts to ensure safety and
                      compliance.
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-pink-500/20 shadow-glow-sm">
                    <h4 className="text-base font-semibold text-pink-400 mb-2">Key Actions</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Review project team materials and audit contracts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Verify token release conditions for safety</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Register new LaunchPool upon successful audit</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hidden md:flex items-center md:w-1/2 md:justify-start md:pl-8 order-1 md:order-2">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 text-white font-bold mb-3 shadow-glow-pink">
                      2
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Audit Stage</h3>
                    <p className="text-zinc-300 text-sm md:text-base max-w-md">
                      The Outrun Audit Team thoroughly reviews the project and audits all contracts to ensure safety and
                      compliance.
                    </p>
                  </div>
                </div>
              </div>
              {/* Circle on timeline */}
              <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 bg-pink-600 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-glow-pink z-10"></div>
            </div>

            {/* Stage 3: Genesis Stage */}
            <div className="relative mb-20">
              <div className="flex flex-col md:flex-row items-start">
                <div className="hidden md:flex items-center md:w-1/2 md:justify-end md:pr-8">
                  <div className="relative z-10 md:text-right">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mb-3 shadow-glow-blue">
                      3
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Genesis Stage</h3>
                    <p className="text-zinc-300 text-sm md:text-base max-w-md">
                      Investors deposit UPT tokens into the LaunchPool, with funds allocated for both liquidity and
                      token generation.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 pl-12 w-full">
                  <div className="md:hidden mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mb-3 shadow-glow-blue">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Genesis Stage</h3>
                    <p className="text-zinc-300 text-sm max-w-md">
                      Investors deposit UPT tokens into the LaunchPool, with funds allocated for both liquidity and
                      token generation.
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 shadow-glow-sm">
                    <h4 className="text-base font-semibold text-blue-400 mb-2">Fund Allocation</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <Coins className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          <span className="font-semibold text-blue-400">1/3</span> of funds used for POL (Protocol-Owned
                          Liquidity)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Coins className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          <span className="font-semibold text-blue-400">2/3</span> of funds used for memecoin token
                          generation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          Occurs between startTime and endTime of the LaunchPool
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Circle on timeline */}
              <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 bg-blue-600 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-glow-blue z-10"></div>
            </div>

            {/* Stage 4: Liquidity Lock Stage */}
            <div className="relative mb-20">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-8 order-2 md:order-1 pl-12 md:pl-0">
                  <div className="md:hidden mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white font-bold mb-3 shadow-glow-cyan">
                      4
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Liquidity Lock Stage</h3>
                    <p className="text-zinc-300 text-sm max-w-md">
                      Project tokens are minted and paired with UPT to form trading pairs. Liquidity is locked until the
                      unlockTime.
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 shadow-glow-sm">
                    <h4 className="text-base font-semibold text-cyan-400 mb-2">Key Actions</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          Project tokens minted according to totalTokenFunds
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Trading pairs deployed on OutrunAMM</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">POL tokens minted with 1/4 forming trading pairs</span>
                      </li>
                      <li className="flex items-start">
                        <Coins className="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          Project team earns market-making fees as continuous funding
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hidden md:flex items-center md:w-1/2 md:justify-start md:pl-8 order-1 md:order-2">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white font-bold mb-3 shadow-glow-cyan">
                      4
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Liquidity Lock Stage</h3>
                    <p className="text-zinc-300 text-sm md:text-base max-w-md">
                      Project tokens are minted and paired with UPT to form trading pairs. Liquidity is locked until the
                      unlockTime.
                    </p>
                  </div>
                </div>
              </div>
              {/* Circle on timeline */}
              <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 bg-cyan-600 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-glow-cyan z-10"></div>
            </div>

            {/* Stage 5: Liquidity Unlock Stage */}
            <div className="relative mb-20">
              <div className="flex flex-col md:flex-row items-start">
                <div className="hidden md:flex items-center md:w-1/2 md:justify-end md:pr-8">
                  <div className="relative z-10 md:text-right">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold mb-3 shadow-glow-green">
                      5
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Liquidity Unlock Stage</h3>
                    <p className="text-zinc-300 text-sm md:text-base max-w-md">
                      After the unlockTime is reached, investors can redeem their liquidity proportional to their
                      initial deposits.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 pl-12 w-full">
                  <div className="md:hidden mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold mb-3 shadow-glow-green">
                      5
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Liquidity Unlock Stage</h3>
                    <p className="text-zinc-300 text-sm max-w-md">
                      After the unlockTime is reached, investors can redeem their liquidity proportional to their
                      initial deposits.
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-green-500/20 shadow-glow-sm">
                    <h4 className="text-base font-semibold text-green-400 mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Investors can redeem POL/UPT liquidity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          Burn POL tokens to redeem ProjectToken/UPT liquidity
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">24-hour Liquidity Protection Period implemented</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Circle on timeline */}
              <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 bg-green-600 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-glow-green z-10"></div>
            </div>

            {/* Stage 6: Remaining Token Generation */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-8 order-2 md:order-1 pl-12 md:pl-0">
                  <div className="md:hidden mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600 text-white font-bold mb-3 shadow-glow-yellow">
                      6
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Remaining Token Generation</h3>
                    <p className="text-zinc-300 text-sm max-w-md">
                      After 14 days in the unlock stage, the project team can generate any remaining tokens to the
                      TimeLockVault contract.
                    </p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20 shadow-glow-sm">
                    <h4 className="text-base font-semibold text-yellow-400 mb-2">Final Stage</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">Occurs 14 days after liquidity unlock stage</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          Project team can mint remaining tokens to TimeLockVault
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">
                          No additional tokens can be minted if fully circulating
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hidden md:flex items-center md:w-1/2 md:justify-start md:pl-8 order-1 md:order-2">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600 text-white font-bold mb-3 shadow-glow-yellow">
                      6
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Remaining Token Generation</h3>
                    <p className="text-zinc-300 text-sm md:text-base max-w-md">
                      After 14 days in the unlock stage, the project team can generate any remaining tokens to the
                      TimeLockVault contract.
                    </p>
                  </div>
                </div>
              </div>
              {/* Circle on timeline */}
              <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 bg-yellow-600 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-glow-yellow z-10"></div>
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
                    Ready to Launch or Invest?
                  </h2>

                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    Join FFLaunch today to launch your project or invest in the next generation of innovative blockchain
                    projects.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    >
                      Launch App
                    </Button>

                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
                      <Button
                        size="lg"
                        variant="outline"
                        className="relative bg-black/50 backdrop-blur-sm border-0 text-white rounded-full px-8 h-12 text-base w-full 
      group-hover:bg-black/70 transition-all duration-300"
                        onClick={() =>
                          window.open("https://outrun.gitbook.io/doc/fflaunch", "_blank", "noopener,noreferrer")
                        }
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
