'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement actual login
    console.log('Login attempt:', { email, password })
    setTimeout(() => {
      setIsLoading(false)
      // Temporary redirect - will implement real auth
      window.location.href = '/dashboard'
    }, 1000)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement password reset
    console.log('Password reset for:', email)
    setTimeout(() => {
      setIsLoading(false)
      alert('Password reset email sent! Check your inbox.')
      setShowForgotPassword(false)
    }, 1000)
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
        <div className="glass p-8 rounded-2xl border border-aura-azure/20 max-w-md w-full">
          <h1 className="text-3xl font-bold text-aura-azure mb-2">Reset Password</h1>
          <p className="text-gray-400 mb-6">Enter your email to receive reset instructions</p>
          
          <form onSubmit={handleForgotPassword} className="space-y-4">
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
              {isLoading ? 'Sending...' : '📧 Send Reset Link'}
            </button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full border border-aura-azure text-aura-azure py-3 rounded-lg font-semibold hover:bg-aura-azure/10 transition-all"
            >
              ← Back to Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
      <div className="glass p-8 rounded-2xl border border-aura-azure/20 max-w-md w-full">
        <h1 className="text-3xl font-bold text-aura-azure mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-6">Sign in to your AURA dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter your password"
              className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-aura-azure text-sm hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-aura-azure text-aura-black py-3 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : '🔐 Sign In'}
          </button>

          <div className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-aura-azure hover:underline">
              Create one
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-aura-black text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:border-aura-azure hover:text-aura-azure transition-all"
            >
              <span>🔗</span>
              Google
            </button>
            <button 
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:border-aura-purple hover:text-aura-purple transition-all"
            >
              <span>💻</span>
              GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}