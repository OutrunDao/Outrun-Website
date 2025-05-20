import type React from "react"
import ClientComponent from "./client"

export const metadata = {
  title: "Outrun - Pioneer the Next Generation of DeFi and Web3",
  description:
    "Outrun is committed to becoming a pioneer in the next generation of DeFi and Web3 industries through innovative yield tokenization, fair launch models, and sustainable Memecoin development.",
    generator: 'v0.dev'
}

// Update CSP headers to ensure they don't cause issues
export const headers = () => {
  return [
    {
      key: "Content-Security-Policy",
      value:
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*; font-src 'self' data:; connect-src 'self' blob: data: https://*; frame-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; object-src 'none';",
    },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientComponent>{children}</ClientComponent>
}


import './globals.css'