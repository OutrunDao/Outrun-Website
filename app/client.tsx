"use client"

import type React from "react"
import { NavbarWrapper } from "@/components/navbar-wrapper"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Montserrat } from "next/font/google"
import { GlobalBackground } from "@/components/global-background"
import { WalletProvider } from "@/contexts/wallet-context"
import { NetworkProvider } from "@/contexts/network-context"
import { BackgroundProvider } from "@/contexts/background-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap", // 添加字体交换策略
  preload: false, // 禁用自动预加载，改为按需加载
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Scroll to the top of the page when the path changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // 使用 'auto' 而不是 'smooth'，确保立即跳转而不是平滑滚动
    })
  }, [pathname])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ErrorBoundary>
            <BackgroundProvider>
              <NetworkProvider>
                <WalletProvider>
                  {/* Global background component - placed at the outermost layer to ensure consistency across all pages */}
                  <GlobalBackground />
                  <div className="relative flex min-h-screen flex-col">
                    <NavbarWrapper />
                    <main className="flex-1 page-transition">{children}</main>
                    <Footer />
                  </div>
                </WalletProvider>
              </NetworkProvider>
            </BackgroundProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
