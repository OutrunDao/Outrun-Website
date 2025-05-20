"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { ReferralStats } from "@/components/referral/referral-stats"
import { ReferralLink } from "@/components/referral/referral-link"
import { ReferralHistory } from "@/components/referral/referral-history"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

export default function ReferralPage() {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState("overview")

  // 模拟数据 - 实际应用中应从API获取
  // Mock data - In real applications, it should be obtained from the API
  const referralData = {
    totalEarned: "1,245.32",
    referralsCount: 28,
    code: "OUTRUN123",
    link: "https://outrun.network/outswap/ref/OUTRUN123",
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl py-8 md:py-12 mt-16 sm:mt-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
        <SectionHeading
          title="Referral Program"
          description="Invite friends to trade on Outrun and earn rewards from their trading fees"
          gradient="from-purple-400 to-pink-500"
          className="mb-8"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {/* Stats and links */}
        <div className="space-y-6">
          <ReferralStats data={referralData} />
          <ReferralLink code={referralData.code} link={referralData.link} />
        </div>
      </div>

      {/* History and detailed data */}
      <div className="mt-8">
        {isMobile ? (
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="history" className="text-sm">
                History
              </TabsTrigger>
              <TabsTrigger value="friends" className="text-sm">
                Friends
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <ReferralHistory view="history" />
            </TabsContent>
            <TabsContent value="friends">
              <ReferralHistory view="friends" />
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="history">Referral Transactions</TabsTrigger>
              <TabsTrigger value="friends">Referred Friends</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <ReferralHistory view="history" />
            </TabsContent>
            <TabsContent value="friends">
              <ReferralHistory view="friends" />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
