export default function LoginPage() {
  return (
    <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
      <div className="glass p-8 rounded-2xl border border-aura-azure/20 max-w-md w-full">
        <h1 className="text-3xl font-bold text-aura-azure mb-2">Welcome to AURA</h1>
        <p className="text-gray-400 mb-6">Sign in to your intelligent workflow OS</p>
        
        <div className="space-y-4">
          <a 
            href="/dashboard"
            className="block w-full bg-aura-azure text-aura-black py-3 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all text-center"
          >
            🚀 Get Started with AURA
          </a>
          
          <div className="text-center text-gray-400 text-sm">or connect existing account</div>
          
          <button className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:border-aura-azure hover:text-aura-azure transition-all flex items-center justify-center gap-3">
            <span>🔗</span>
            Continue with Google
          </button>
          
          <button className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:border-aura-purple hover:text-aura-purple transition-all flex items-center justify-center gap-3">
            <span>💻</span>
            Continue with GitHub
          </button>
          
          <div className="text-center text-gray-400 text-xs mt-6">
            By continuing, you agree to our Terms and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  )
}