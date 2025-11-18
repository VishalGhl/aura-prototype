'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Mock database - in real app, this would be your backend
const mockUsers = new Map()

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const validateLogin = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateLogin()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user exists in our mock database
      const user = mockUsers.get(formData.email)
      
      if (!user) {
        setErrors({ submit: 'No account found with this email. Please create an account first.' })
        return
      }

      if (user.password !== formData.password) {
        setErrors({ submit: 'Invalid password. Please check your credentials.' })
        return
      }

      // Store user session (in real app, use proper session management)
      localStorage.setItem('aura_user', JSON.stringify({
        firstName: user.firstName,
        email: user.email
      }))

      // Redirect to dashboard
      router.push('/dashboard')

    } catch (error) {
      console.error('Login error:', error)
      setErrors({ submit: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Password reset email sent! Check your inbox.')
      setShowForgotPassword(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }))
    }
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
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
                required
              />
            </div>

            {/* REMOVED: CAPTCHA PLACEHOLDER */}

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
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
              required
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
              required
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
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

          {errors.submit && (
            <div className="bg-red-400/20 border border-red-400 text-red-400 p-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

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