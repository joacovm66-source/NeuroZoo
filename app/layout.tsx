import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeuroZoo",
  description: "AI-powered animal analytics platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-black text-white min-h-screen`}>
        <nav className="border-b border-gray-800 px-8 py-4 flex items-center gap-8">
          <span className="text-green-400 font-bold text-xl">NeuroZoo</span>
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link>
          <Link href="/upload" className="text-gray-400 hover:text-white transition">Subir</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}