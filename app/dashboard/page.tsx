export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-green-400 mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Bienvenido a NeuroZoo Analytics</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 text-sm">Animales detectados</p>
          <p className="text-4xl font-bold text-white mt-1">0</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 text-sm">Videos analizados</p>
          <p className="text-4xl font-bold text-white mt-1">0</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 text-sm">Anomalías detectadas</p>
          <p className="text-4xl font-bold text-white mt-1">0</p>
        </div>
      </div>
    </main>
  )
}