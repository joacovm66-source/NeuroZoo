"use client"
import { useRef, useState, type DragEvent, type ChangeEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Status = "Pending" | "Processing" | "Complete"
type QueueItem = { id: string; name: string; size: number; status: Status }

const ACCEPTED = ".mp4,.mov,.avi,.jpg,.jpeg,.png"
const MAX_BYTES = 500 * 1024 * 1024

function formatSize(b: number) {
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1)} MB`
  return `${(b / 1024 / 1024 / 1024).toFixed(2)} GB`
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Pending: "border border-gray-700 text-gray-400 bg-transparent",
    Processing: "border border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
    Complete: "border border-green-500/40 text-green-400 bg-green-500/10",
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  )
}

export default function UploadPage() {
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const next: QueueItem[] = []
    for (const f of Array.from(files)) {
      if (f.size > MAX_BYTES) continue
      next.push({ id: crypto.randomUUID(), name: f.name, size: f.size, status: "Pending" })
    }
    if (next.length) setQueue((q) => [...next, ...q])
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

  const startAnalysis = () => {
    setQueue((q) => q.map((it) => it.status === "Pending" ? { ...it, status: "Processing" } : it))
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
          <path d="M12 16V4" />
          <path d="m6 10 6-6 6 6" />
          <path d="M4 20h16" />
        </svg>
        <p className="text-sm text-white">Drag and drop your file here or click to browse</p>
        <p className="text-xs text-gray-400">MP4, MOV, AVI, JPG, PNG — Max 500MB</p>
        <input ref={inputRef} type="file" accept={ACCEPTED} multiple onChange={onChange} className="hidden" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-base font-medium">File Queue</h2>
        <Button
          onClick={startAnalysis}
          disabled={queue.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
        >
          Start Analysis
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
    </main>
  )
}