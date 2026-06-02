"use client"
import { useRef, useState, type DragEvent, type ChangeEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

type Status = "Pending" | "Processing" | "Complete" | "Error"
type QueueItem = { id: string; name: string; size: number; status: Status }
type Analysis = {
  species: string
  count: number
  behavior: string
  emotional_state: string
  health_indicators: string
  anomalies: string
  sleep_estimate: string
  environment: string
  confidence: number
  summary: string
}
type Result = { filename: string; analysis: Analysis }

const ACCEPTED = ".mp4,.mov,.avi,.jpg,.jpeg,.png"
const MAX_BYTES = 500 * 1024 * 1024

function formatSize(b: number) {
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
  return `${(b / 1024 / 1024).toFixed(1)} MB`
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Pending: "border border-gray-700 text-gray-400 bg-transparent",
    Processing: "border border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
    Complete: "border border-green-500/40 text-green-400 bg-green-500/10",
    Error: "border border-red-500/40 text-red-400 bg-red-500/10",
  }
  return <span className={`text-xs px-2 py-1 rounded-full ${map[status]}`}>{status}</span>
}

function EmotionBadge({ state }: { state: string }) {
  const map: Record<string, string> = {
    calm: "bg-green-500/10 text-green-400 border-green-500/40",
    anxious: "bg-yellow-500/10 text-yellow-400 border-yellow-500/40",
    stressed: "bg-orange-500/10 text-orange-400 border-orange-500/40",
    aggressive: "bg-red-500/10 text-red-400 border-red-500/40",
    playful: "bg-blue-500/10 text-blue-400 border-blue-500/40",
    depressed: "bg-purple-500/10 text-purple-400 border-purple-500/40",
    alert: "bg-cyan-500/10 text-cyan-400 border-cyan-500/40",
  }
  const key = state.toLowerCase()
  const cls = map[key] ?? "bg-gray-500/10 text-gray-400 border-gray-500/40"
  return <span className={`text-xs px-2 py-1 rounded-full border ${cls}`}>{state}</span>
}

export default function UploadPage() {
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const newItems: QueueItem[] = []
    const newFiles: File[] = []
    for (const f of Array.from(incoming)) {
      if (f.size > MAX_BYTES) continue
      newItems.push({ id: crypto.randomUUID(), name: f.name, size: f.size, status: "Pending" })
      newFiles.push(f)
    }
    if (newItems.length) {
      setQueue((q) => [...newItems, ...q])
      setFiles((f) => [...newFiles, ...f])
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files)
    e.target.value = ""
  }

  const startAnalysis = async () => {
    if (queue.length === 0 || loading) return
    setLoading(true)
    setQueue((q) => q.map((it) => it.status === "Pending" ? { ...it, status: "Processing" } : it))

    for (const file of files) {
      const formData = new FormData()
      formData.append("file", file)
      try {
        const res = await fetch("http://127.0.0.1:8000/analyze/image", {
          method: "POST",
          body: formData,
        })
        const data: Result = await res.json()

        await supabase.from("analyses").insert({
          filename: data.filename,
          total_detections: data.analysis.count,
          detections: data.analysis,
          status: "Complete",
        })

        setResults((prev) => [...prev, data])
        setQueue((q) => q.map((it) => it.name === file.name ? { ...it, status: "Complete" } : it))
      } catch (err) {
        console.error("Error:", err)
        setQueue((q) => q.map((it) => it.name === file.name ? { ...it, status: "Error" } : it))
      }
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-white mb-1">Upload Media</h1>
      <p className="text-gray-400 mb-8">Upload videos or images for AI analysis</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-16 text-center cursor-pointer transition-colors ${
          dragOver ? "border-green-500 bg-green-500/5" : "border-gray-700 bg-gray-900 hover:border-green-500/60"
        }`}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M12 16V4" /><path d="m6 10 6-6 6 6" /><path d="M4 20h16" />
        </svg>
        <p className="text-sm text-white">Drag and drop your file here or click to browse</p>
        <p className="text-xs text-gray-400">MP4, MOV, AVI, JPG, PNG — Max 500MB</p>
        <input ref={inputRef} type="file" accept={ACCEPTED} multiple onChange={onChange} className="hidden" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-base font-medium">File Queue</h2>
        <Button onClick={startAnalysis} disabled={queue.length === 0 || loading} className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50">
          {loading ? "Analyzing..." : "Start Analysis"}
        </Button>
      </div>

      <Card className="mt-3">
        <CardContent className="p-0">
          {queue.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">No files in queue</p>
          ) : (
            <ul className="divide-y divide-gray-800">
              {queue.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{f.name}</p>
                    <p className="text-xs text-gray-400">{formatSize(f.size)}</p>
                  </div>
                  <StatusBadge status={f.status} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="mt-8 space-y-6">
          <h2 className="text-base font-medium">Resultados del análisis</h2>
          {results.map((r, i) => (
            <Card key={i}>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-white">{r.filename}</p>
                  <EmotionBadge state={r.analysis.emotional_state} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Species", value: r.analysis.species },
                    { label: "Count", value: r.analysis.count },
                    { label: "Behavior", value: r.analysis.behavior },
                    { label: "Sleep estimate", value: r.analysis.sleep_estimate },
                    { label: "Environment", value: r.analysis.environment },
                    { label: "Confidence", value: `${(r.analysis.confidence * 100).toFixed(0)}%` },
                  ].map((f) => (
                    <div key={f.label} className="rounded-lg border border-gray-800 bg-black p-3">
                      <p className="text-xs text-gray-400">{f.label}</p>
                      <p className="text-sm text-white mt-1">{f.value}</p>
                    </div>
                  ))}
                </div>

                {r.analysis.anomalies !== "None detected" && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 mb-3">
                    <p className="text-xs text-red-400 font-medium">⚠ Anomaly detected</p>
                    <p className="text-xs text-red-300 mt-1">{r.analysis.anomalies}</p>
                  </div>
                )}

                <div className="rounded-lg border border-gray-800 bg-black p-3">
                  <p className="text-xs text-gray-400 mb-1">AI Summary</p>
                  <p className="text-sm text-white">{r.analysis.summary}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}