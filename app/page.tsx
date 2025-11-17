export default function LandingPage() {
  return (
    <div className="min-h-screen bg-aura-black text-white">
      {/* Navigation */}
      <nav className="border-b border-aura-azure/20 py-6">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔷</div>
            <div className="text-xl font-bold text-aura-azure">AURA</div>
          </div>
          <div className="flex items-center space-x-4">
          <a 
            href="/login"
            className="bg-aura-azure text-aura-black px-6 py-2 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all"
          >
            Sign In
          </a>
          <a 
            href="/signup" 
            className="border border-aura-azure text-aura-azure px-6 py-2 rounded-lg font-semibold hover:bg-aura-azure/10 transition-all"
          >
            Sign Up
          </a>
        </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl font-bold text-aura-azure mb-6">
          Your Intelligent Workflow OS
        </h1>
        <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Stop context switching between tools. AURA unifies your work apps into one intelligent interface that anticipates your next move.
        </p>
        
        <div className="flex justify-center gap-6 mb-20">
        <a 
          href="/signup"
          className="bg-aura-azure text-aura-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-aura-azure/90 transition-all"
        >
          🚀 Start Building
        </a>
        <a 
          href="/login"
          className="border border-aura-azure text-aura-azure px-8 py-4 rounded-xl font-bold text-lg hover:bg-aura-azure/10 transition-all"
        >
          📺 Live Demo
        </a>
      </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass p-6 rounded-2xl border border-aura-azure/20">
            <div className="text-3xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold text-aura-azure mb-2">Save 2+ Hours Daily</h3>
            <p className="text-gray-400">Eliminate context switching between development tools</p>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-aura-purple/20">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-aura-purple mb-2">Focus on What Matters</h3>
            <p className="text-gray-400">AI-powered prioritization for developers and teams</p>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-aura-green/20">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-aura-green mb-2">Ship Faster</h3>
            <p className="text-gray-400">Reduce cognitive load and increase team velocity</p>
          </div>
        </div>
      </div>
    </div>
  )
}