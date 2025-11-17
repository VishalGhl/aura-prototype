'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  firstName: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('aura_user')
    if (!userData) {
      router.push('/login')
      return
    }

    try {
      const userObj = JSON.parse(userData)
      setUser(userObj)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('aura_user')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
        <div className="text-aura-azure text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-aura-black text-white">
      {/* Navigation */}
      <nav className="border-b border-aura-azure/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-aura-azure">AURA</h1>
              <span className="ml-4 text-gray-400">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.firstName}!</span>
              <button
                onClick={handleLogout}
                className="bg-aura-azure text-aura-black px-4 py-2 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass p-8 rounded-2xl border border-aura-azure/20">
          <h2 className="text-3xl font-bold text-aura-azure mb-4">
            Welcome to Your Dashboard, {user.firstName}!
          </h2>
          <p className="text-gray-300 mb-6">
            This is your personal workspace. Connect your tools and start being productive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Linear Integration Card */}
            <div className="bg-aura-black border border-aura-azure/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-aura-azure/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-aura-azure">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Linear</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Connect your Linear account to manage issues and projects directly from AURA.
              </p>
              <button className="w-full bg-aura-azure text-aura-black py-2 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all">
                Connect Linear
              </button>
            </div>

            {/* Projects Card */}
            <div className="bg-aura-black border border-aura-purple/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-aura-purple/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-aura-purple">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Projects</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Create and manage your projects. Track progress and collaborate with your team.
              </p>
              <button className="w-full border border-aura-purple text-aura-purple py-2 rounded-lg font-semibold hover:bg-aura-purple/10 transition-all">
                Create Project
              </button>
            </div>

            {/* Analytics Card */}
            <div className="bg-aura-black border border-aura-cyan/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-aura-cyan/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-aura-cyan">📈</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Analytics</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                View your productivity metrics and track your performance over time.
              </p>
              <button className="w-full border border-aura-cyan text-aura-cyan py-2 rounded-lg font-semibold hover:bg-aura-cyan/10 transition-all">
                View Analytics
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-aura-black border border-aura-azure/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-aura-azure mb-4">Recent Activity</h3>
            <div className="text-gray-400 text-center py-8">
              <div className="text-4xl mb-4">📋</div>
              <p>No recent activity yet</p>
              <p className="text-sm mt-2">Start by connecting your tools or creating a project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}