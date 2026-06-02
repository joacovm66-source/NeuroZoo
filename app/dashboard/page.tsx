"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

type Analysis = {
  id: string
  filename: string
  total_detections: number
  detections: any
  status: string
  created_at: string
}

export default function DashboardPage() {
  const [bannerOpen, setBannerOpen] = useState(true)
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("analyses")
        .select("*")
        .order("created_at", { ascending: false })
      if (data) setAnalyses(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const totalAnimals = analyses.reduce((acc, a) => acc + (a.total_detections || 0), 0)
  const totalVideos = analyses.length
  const totalAnomalies = analyses.filter(a => a.detections?.anomalies && a.detections.anomalies !== "None detected").length

  const kpis = [
    { label: "Animals Detected", value: totalAnimals },
    { label: "Videos Analyzed", value: totalVideos },
    { label: "Anomalies Detected", value: totalAnomalies },
    { label: "Reports Generated", value: totalVideos },
  ]

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {bannerOpen && (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-yellow-400">
              {totalAnomalies > 0 ? `${totalAnomalies} anomalies detected!` : "No anomalies detected yet"}
            </p>
            <p className="text-xs text-gray-400">Real-time alerts from your analyses.</p>
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
              <p className="mt-3 text-3xl font-semibold">{loading ? "..." : k.value}</p>
              <p className="mt-1 text-xs text-gray-400">Updated in real-time</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="mt-6">
        <CardContent>
          <p className="text-base font-medium text-white mb-4">Recent Analyses</p>
          {loading ? (
            <p className="text-center text-gray-400 py-8">Loading...</p>
          ) : analyses.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No analyses found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">File Name</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Species</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Anomalies</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((a) => (
                    <tr key={a.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                      <td className="px-4 py-3 text-white truncate max-w-[200px]">{a.filename}</td>
                      <td className="px-4 py-3 text-white">{a.detections?.species || "Unknown"}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full border border-green-500/40 text-green-400 bg-green-500/10">
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {a.detections?.anomalies && a.detections.anomalies !== "None detected" ? (
                          <span className="text-xs px-2 py-1 rounded-full border border-red-500/40 text-red-400 bg-red-500/10">
                            {a.detections.anomalies}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {new Date(a.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}