"use client"
import Link from "next/link"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      <main>
        <Hero />
        <Philosophy />
        <Stats />
        <HowItWorks />
        <LiveDemo />
        <Contact />
        <Donation />
      </main>
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=2400&q=80"
        alt="Wildlife in its natural habitat"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Understanding Animals Through Artificial Intelligence
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
          NeuroZoo uses computer vision and AI to analyze animal behavior,
          detect anomalies, and generate automated scientific reports in real time.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/upload">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#philosophy">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Philosophy() {
  const items = [
    { title: "Science First", body: "Technology should serve nature, not the other way around." },
    { title: "Ethical AI", body: "Every model is trained responsibly with animal welfare in mind." },
    { title: "Open Insights", body: "Knowledge about animal behavior should be accessible to all researchers." },
  ]
  return (
    <section id="philosophy" className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Philosophy</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} className="transition-all hover:-translate-y-1 hover:border-green-500/40">
              <CardContent>
                <h3 className="text-lg font-medium text-white">{it.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{it.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); break }
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])
  return [ref, inView]
}

function Counter({ end, suffix = "", decimals = 0, start }: { end: number; suffix?: string; decimals?: number; start: boolean }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const duration = 1500
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(end * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, start])
  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US")
  return <span>{formatted}{suffix}</span>
}

function Stats() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const stats = [
    { end: 10000, suffix: "+", label: "Animals Analyzed" },
    { end: 98.7, suffix: "%", decimals: 1, label: "Detection Accuracy" },
    { end: 500, suffix: "+", label: "Video Hours Processed" },
    { end: 12, suffix: "", label: "Species Supported" },
  ]
  return (
    <section className="py-24 bg-gray-950">
      <div ref={ref} className="mx-auto max-w-7xl px-6 grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-4xl font-semibold text-green-500 sm:text-5xl">
              <Counter end={s.end} suffix={s.suffix} decimals={s.decimals ?? 0} start={inView} />
            </p>
            <p className="mt-2 text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Upload", body: "Submit your video or image footage." },
    { n: "02", title: "Analyze", body: "Our AI detects species, behavior and anomalies." },
    { n: "03", title: "Report", body: "Receive a complete AI-generated report." },
  ]
  return (
    <section className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n} className="transition-all hover:border-green-500/40">
              <CardContent>
                <p className="text-sm font-mono text-green-500">{s.n}</p>
                <h3 className="mt-3 text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const SPECIES = [
  { name: "African Elephant", behavior: "Foraging" },
  { name: "Bengal Tiger", behavior: "Patrolling" },
  { name: "Mountain Gorilla", behavior: "Resting" },
  { name: "Grey Wolf", behavior: "Hunting" },
  { name: "Red Fox", behavior: "Stalking" },
  { name: "Snow Leopard", behavior: "Climbing" },
]

function LiveDemo() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000)
    return () => clearInterval(id)
  }, [])
  const sp = SPECIES[tick % SPECIES.length]
  const rand = (seed: number) => {
    const x = Math.sin(tick * 9301 + seed * 49297) * 233280
    return x - Math.floor(x)
  }
  const x1 = Math.floor(80 + rand(1) * 200)
  const y1 = Math.floor(60 + rand(2) * 160)
  const x2 = Math.floor(x1 + 120 + rand(3) * 100)
  const y2 = Math.floor(y1 + 100 + rand(4) * 80)
  const confidence = (90 + rand(5) * 9.9).toFixed(1)

  return (
    <section className="py-24 bg-gray-950">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-semibold text-center mb-4">Live Analysis Feed</h2>
        <p className="text-center text-gray-400 mb-12 text-sm">A glimpse of NeuroZoo in action.</p>
        <Card className="mx-auto max-w-3xl">
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs uppercase tracking-wider text-gray-400">Live</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Species Detected", value: sp.name },
                { label: "Confidence Score", value: `${confidence}%` },
                { label: "Behavior Tag", value: sp.behavior },
              ].map((f) => (
                <div key={f.label} className="rounded-md border border-gray-800 bg-black p-4">
                  <p className="text-xs text-gray-400">{f.label}</p>
                  <p className="mt-1 text-sm font-medium text-white">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-md border border-gray-800 bg-black p-4 font-mono text-xs text-gray-400">
              <p className="text-green-500">{`> bbox: [${x1}, ${y1}, ${x2}, ${y2}]`}</p>
              <p>{`> frame: ${(tick * 24).toString().padStart(6, "0")}`}</p>
              <p>{`> model: nz-vision-v3.2`}</p>
              <p>{`> latency: ${(20 + rand(6) * 30).toFixed(0)}ms`}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    ;(e.currentTarget as HTMLFormElement).reset()
  }
  return (
    <section id="contact" className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-semibold text-center mb-4">Get in Touch</h2>
        <p className="text-center text-gray-400 mb-12 text-sm">Questions, collaboration, or research inquiries.</p>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">Email us directly</p>
            <a href="mailto:NeuroZoo@gmail.com" className="mt-1 inline-block text-lg font-medium text-green-500 hover:underline">
              NeuroZoo@gmail.com
            </a>
            <div className="mt-6 flex items-center gap-3">
              {[
                { label: "Instagram", href: "https://instagram.com", path: <><path d="M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5z"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1" fill="currentColor"/></> },
                { label: "LinkedIn", href: "https://linkedin.com", path: <><path d="M4 4h4v16H4zM6 2.5A1.5 1.5 0 1 1 6 5.5a1.5 1.5 0 0 1 0-3zM10 9h4v2c.7-1.2 2-2.2 4-2.2 3 0 4 2 4 5V20h-4v-5c0-1.5-.5-2.5-2-2.5s-2.2 1-2.2 2.5V20H10z"/></> },
                { label: "Twitter", href: "https://twitter.com", path: <path d="M4 4l7 9-7 7h2.5l5.7-5.7L16 20h4l-7.4-9.5L19 4h-2.5l-5 5L9 4z"/> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-800 text-gray-400 transition-colors hover:border-green-500/40 hover:text-green-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <input required name="name" placeholder="Name" className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500" />
            <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500" />
            <textarea required name="message" placeholder="Message" rows={5} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500" />
            <Button type="submit">{sent ? "Sent ✓" : "Send"}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Donation() {
  const [open, setOpen] = useState(false)
  return (
    <section className="py-16 bg-gray-950 border-t border-gray-800">
      <div className="mx-auto max-w-3xl text-center px-6">
        <p className="text-sm text-gray-400">
          NeuroZoo is an independent research project. If you find value in our work, consider supporting us.
        </p>
        <div className="mt-5">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Support NeuroZoo
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Support NeuroZoo</DialogTitle>
            <DialogDescription>
              You can support us voluntarily via Yape to the number{" "}
              <span className="font-medium text-white">947 184 028</span>.
              Every contribution helps us keep building.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-base font-semibold text-green-500">NeuroZoo</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/upload" className="hover:text-white">Upload</Link>
          <Link href="/reports" className="hover:text-white">Reports</Link>
        </nav>
        <p className="text-xs text-gray-400">© 2026 NeuroZoo. All rights reserved.</p>
      </div>
    </footer>
  )
}