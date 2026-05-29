"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const kpis = [
  { label: "Animals Detected", value: 0 },
  { label: "Videos Analyzed", value: 0 },
  { label: "Anomalies Detected", value: 0 },
  { label: "Reports Generated", value: 0 },
]

export default function DashboardPage() {
  const [bannerOpen, setBannerOpen] = useState(true)

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {bannerOpen && (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-yellow-400">No anomalies detected yet</p>
            <p className="text-xs text-gray-400">You'll see real-time alerts here once analyses begin reporting unusual behavior.</p>
          </div>
          <button onClick={() => setBannerOpen(false)} className="text-gray-400 hover:text-white text-sm">
            Dismiss
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold text-white mb-1">Analytics Overview</h1>
      <p className="text-gray-400 mb-8">Real-time animal behavior monitoring</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{k.label}</p>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <p className="mt-3 text-3xl font-semibold">{k.value}</p>
              <p className="mt-1 text-xs text-gray-400">No change in last 24h</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="mt-6">
        <CardContent>
          <p className="text-base font-medium text-white mb-4">Detection Activity</p>
          <EmptyChart />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-0">
          <p className="text-base font-medium text-white p-6 pb-0">Recent Analyses</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">File Name</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Species</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Status</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Anomalies</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-16 text-center text-sm text-gray-400">
                    No analyses found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

function EmptyChart() {
  const w = 800
  const h = 260
  const padL = 40
  const padB = 28
  const rows = 5
  const cols = 7
  const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const innerW = w - padL - 10
  const innerH = h - padB - 10

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[260px]">
        {Array.from({ length: rows + 1 }).map((_, i) => {
          const y = 10 + (innerH / rows) * i
          return <line key={`h${i}`} x1={padL} x2={w - 10} y1={y} y2={y} stroke="#1f2937" strokeWidth={1} />
        })}
        {Array.from({ length: cols + 1 }).map((_, i) => {
          const x = padL + (innerW / cols) * i
          return <line key={`v${i}`} x1={x} x2={x} y1={10} y2={h - padB} stroke="#1f2937" strokeWidth={1} />
        })}
        {Array.from({ length: rows + 1 }).map((_, i) => {
          const y = 10 + (innerH / rows) * i
          return <text key={`yl${i}`} x={padL - 8} y={y + 4} textAnchor="end" fill="#6b7280" fontSize={10}>{(rows - i) * 20}</text>
        })}
        {xLabels.map((lbl, i) => {
          const x = padL + (innerW / cols) * i + innerW / cols / 2
          return <text key={`xl${i}`} x={x} y={h - 8} textAnchor="middle" fill="#6b7280" fontSize={10}>{lbl}</text>
        })}
        <text x={w / 2} y={h / 2} textAnchor="middle" fill="#6b7280" fontSize={12}>No detection activity yet</text>
      </svg>
    </div>
  )
}