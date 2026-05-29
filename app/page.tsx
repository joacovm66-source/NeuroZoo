import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold text-green-400">NeuroZoo 🧠🦁</h1>
      <p className="text-gray-400 text-lg">AI-powered animal analytics platform</p>
      <Link
        href="/dashboard"
        className="mt-4 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition"
      >
        Ir al Dashboard →
      </Link>
    </main>
  )
}
