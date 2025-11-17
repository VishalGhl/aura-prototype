'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement actual signup
    console.log('Signup attempt:', { email, password })
    setTimeout(() => {
      setIsLoading(false)
      // Temporary redirect - will implement real auth
      window.location.href = '/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
      <div className="glass p-8 rounded-2xl border border-aura-azure/20 max-w-md w-full">
        <h1 className="text-3xl font-bold text-aura-azure mb-2">Create Account</h1>
        <p className="text-gray-400 mb-6">Join AURA and transform your workflow</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
              required
            />
          </div>

          {/* CAPTCHA PLACEHOLDER */}
          <div className="bg-aura-black border border-aura-azure/20 rounded-lg p-4 text-center">
            <div className="text-gray-400 mb-2">🔒 Security Verification</div>
            <div className="bg-aura-azure/20 border border-aura-azure/30 rounded p-8 cursor-not-allowed">
              <div className="text-aura-azure">Drag puzzle pieces to verify</div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-aura-azure text-aura-black py-3 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : '🚀 Create Account'}
          </button>

          <div className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-aura-azure hover:underline">
              Sign in
            </Link>
          </div>

          <div className="text-center text-gray-400 text-xs mt-6">
            By creating an account, you agree to our Terms and Privacy Policy
          </div>
        </form>
      </div>
    </div>
  )
}