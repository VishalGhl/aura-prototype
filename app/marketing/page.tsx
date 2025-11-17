export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-aura-black text-white">
      <div className="container mx-auto px-8 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-aura-azure mb-6">
            🔷 AURA
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Your Intelligent Workflow OS
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stop context switching. Start building. AURA unifies your tools into one 
            intelligent interface that anticipates your next move.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass p-6 rounded-2xl border border-aura-azure/20 text-center">
            <div className="text-3xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold text-aura-azure mb-2">Save 2+ Hours Weekly</h3>
            <p className="text-gray-400">Eliminate context switching between Slack, Linear, GitHub, and more</p>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-aura-purple/20 text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-aura-purple mb-2">Focus on What Matters</h3>
            <p className="text-gray-400">AI-powered prioritization shows you exactly what to work on next</p>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-aura-green/20 text-center">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-aura-green mb-2">Ship Faster</h3>
            <p className="text-gray-400">Reduce cognitive load and increase team velocity</p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/"
            className="bg-aura-azure text-aura-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-aura-azure/90 transition-all inline-block shadow-lg shadow-aura-azure/20"
          >
            🚀 Launch AURA
          </a>
          <p className="text-gray-400 mt-4">
            Join the beta - Free during testing period
          </p>
        </div>
      </div>
    </div>
  )
}