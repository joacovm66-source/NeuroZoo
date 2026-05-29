"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [showPublic, setShowPublic] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [anomalyAlerts, setAnomalyAlerts] = useState(true)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [weeklySummary, setWeeklySummary] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="space-y-6 max-w-2xl">

        <Card>
          <CardContent>
            <h2 className="text-base font-medium text-white mb-1">Account</h2>
            <p className="text-xs text-gray-400 mb-4">Your profile information.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                placeholder="Full name"
                defaultValue="Jane Doe"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
              <input
                placeholder="Email"
                defaultValue="jane@example.com"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
            </div>
            <Button className="mt-4">Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-base font-medium text-white mb-1">API Keys</h2>
            <p className="text-xs text-gray-400 mb-4">Use these keys to access the NeuroZoo API.</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">Public key</p>
                <div className="flex gap-2">
                  <input
                    type={showPublic ? "text" : "password"}
                    defaultValue="pk_live_neurozoo_abc123"
                    className="flex-1 rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white focus:outline-none focus:border-green-500"
                  />
                  <Button variant="outline" onClick={() => setShowPublic(!showPublic)}>
                    {showPublic ? "Hide" : "Show"}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Secret key</p>
                <div className="flex gap-2">
                  <input
                    type={showSecret ? "text" : "password"}
                    defaultValue="sk_live_neurozoo_xyz789"
                    className="flex-1 rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white focus:outline-none focus:border-green-500"
                  />
                  <Button variant="outline" onClick={() => setShowSecret(!showSecret)}>
                    {showSecret ? "Hide" : "Show"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-base font-medium text-white mb-1">Notifications</h2>
            <p className="text-xs text-gray-400 mb-4">Choose what you want to be notified about.</p>
            <div className="space-y-4">
              {[
                { label: "Anomaly alerts", desc: "Email me when an anomaly is detected in an analysis.", value: anomalyAlerts, set: setAnomalyAlerts },
                { label: "Analysis complete", desc: "Notify me when a new report is ready.", value: analysisComplete, set: setAnalysisComplete },
                { label: "Weekly summary", desc: "Send a digest of all activity each week.", value: weeklySummary, set: setWeeklySummary },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{n.label}</p>
                    <p className="text-xs text-gray-400">{n.desc}</p>
                  </div>
                  <button
                    onClick={() => n.set(!n.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${n.value ? "bg-green-500" : "bg-gray-700"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${n.value ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20">
          <CardContent>
            <h2 className="text-base font-medium text-red-400 mb-1">Danger Zone</h2>
            <p className="text-xs text-gray-400 mb-4">Irreversible actions. Proceed with caution.</p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Delete Account
            </Button>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}
