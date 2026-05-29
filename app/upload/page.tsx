export default function Upload() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-green-400 mb-2">Subir archivo</h1>
      <p className="text-gray-400 mb-8">Sube un video o imagen para analizar</p>

      <div className="border-2 border-dashed border-gray-700 rounded-xl p-16 flex flex-col items-center justify-center gap-4 hover:border-green-500 transition cursor-pointer">
        <p className="text-5xl">📁</p>
        <p className="text-gray-400 text-lg">Arrastra tu archivo aquí</p>
        <p className="text-gray-600 text-sm">o</p>
        <button className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition">
          Seleccionar archivo
        </button>
      </div>
    </main>
  )
}