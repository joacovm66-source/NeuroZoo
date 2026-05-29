"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  const [search, setSearch] = useState("")
  const [species, setSpecies] = useState("all")
  const [status, setStatus] = useState("all")
  const [date, setDate] = useState("")

  const reports: Array<{
    id: string
    species: string
    date: string
    anomalies: number
    status: "Complete" | "Processing"
  }> = []

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-white mb-1">Analysis Reports</h1>
      <p className="text-gray-400 mb-8">AI-generated summaries of your analyses</p>

      <Card>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              placeholder="Search reports"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white focus:outline-none focus:border-green-500"
            />
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white focus:outline-none focus:border-green-500"
            >
              <option value="all">All species</option>
              <option value="primate">Primate</option>
              <option value="feline">Feline</option>
              <option value="canine">Canine</option>
              <option value="avian">Avian</option>
              <option value="reptile">Reptile</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white focus:outline-none focus:border-green-500"
            >
              <option value="all">All statuses</option>
              <option value="complete">Complete</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-gray-900">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-white">No reports yet</p>
              <p className="text-xs text-gray-400 max-w-sm">
                Upload media on the Upload page to generate your first analysis report.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((r) => (
              <Card key={r.id}>
                <div className="aspect-video w-full bg-gray-900 border-b border-gray-800" />
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{r.species}</p>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                      {r.anomalies} anomalies
                    </span>
                    <span className="rounded-md border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                      {r.status}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full">View Report</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}