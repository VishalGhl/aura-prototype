import './globals.css'
import { getLinearIssues } from '@/lib/linear'
import { getGitHubNotifications } from '@/lib/github'
import IssueList from '@/components/IssueList'
import NotificationList from '@/components/NotificationList'

const currentTime = new Date().toLocaleTimeString();

// FIX: Proper type for Next.js 15
interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: HomeProps) {
  // FIX: Await the searchParams Promise
  const searchParams = await props.searchParams;
  const linearConnected = searchParams.linear_connected === 'true';
  
  const [issues, notifications] = await Promise.all([
    getLinearIssues(),
    getGitHubNotifications('mock-token')
  ]);

  const overnightActivity = {
    newIssues: issues.filter(issue => {
      const created = new Date(issue.createdAt);
      const now = new Date();
      return (now.getTime() - created.getTime()) < (12 * 60 * 60 * 1000);
    }).length,
    highPriority: issues.filter(issue => issue.priority === 'HIGH').length,
    unreadNotifications: notifications.length
  };

  return (
    <div className="min-h-screen bg-aura-black text-white">
      <div className="container mx-auto p-8 max-w-6xl">
        
        {/* 🔷 AURA HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-aura-azure mb-4 tracking-tight">
            🔷 A U R A
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-aura-azure to-aura-purple mx-auto rounded-full"></div>
        </div>

        {/* 🌅 MORNING GREETING */}
        <div className="glass p-8 rounded-3xl border border-aura-azure/20 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">
            {linearConnected ? '🌅 GOOD MORNING, BUILDER!' : '🚀 WELCOME TO AURA'}
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            {linearConnected 
              ? 'Ready to conquer your day? 💪' 
              : 'Connect your tools to unlock your morning brief'
            }
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <a 
              href="/auth"
              className="bg-aura-azure text-aura-black px-6 py-3 rounded-xl font-semibold hover:bg-aura-azure/90 transition-all shadow-lg shadow-aura-azure/20"
            >
              {linearConnected ? '🔗 Manage Connections' : '🔗 Connect Tools'}
            </a>
            {!linearConnected && (
              <a 
                href="/" 
                className="border border-aura-azure text-aura-azure px-6 py-3 rounded-xl font-semibold hover:bg-aura-azure/10 transition-all"
              >
                Try Demo Data
              </a>
            )}
          </div>
        </div>

        {/* 📊 OVERNIGHT ACTIVITY DASHBOARD */}
        {linearConnected && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass p-4 rounded-2xl border border-aura-green/20 text-center">
              <div className="text-2xl font-bold text-aura-green">{overnightActivity.newIssues}</div>
              <div className="text-gray-400 text-sm">New Issues</div>
            </div>
            <div className="glass p-4 rounded-2xl border border-aura-amber/20 text-center">
              <div className="text-2xl font-bold text-aura-amber">{overnightActivity.highPriority}</div>
              <div className="text-gray-400 text-sm">High Priority</div>
            </div>
            <div className="glass p-4 rounded-2xl border border-aura-purple/20 text-center">
              <div className="text-2xl font-bold text-aura-purple">{overnightActivity.unreadNotifications}</div>
              <div className="text-gray-400 text-sm">Notifications</div>
            </div>
            <div className="glass p-4 rounded-2xl border border-aura-azure/20 text-center">
              <div className="text-2xl font-bold text-aura-azure">
                📅 {new Date().getDate()}
              </div>
              <div className="text-gray-400 text-sm">
                {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </div>
          </div>
        )}

        {/* 🎯 MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 📋 LINEAR ISSUES */}
          <div className="glass p-6 rounded-2xl border border-aura-azure/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-aura-azure">
                📋 Your Linear Issues
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-aura-green text-sm font-medium">
                  {linearConnected ? '• LIVE' : '• DEMO'}
                </span>
                <span className="bg-aura-azure/20 text-aura-azure px-2 py-1 rounded text-xs">
                  {issues.length} items
                </span>
              </div>
            </div>
            <IssueList issues={issues} />
          </div>

          {/* 🔔 GITHUB NOTIFICATIONS */}
          <div className="glass p-6 rounded-2xl border border-aura-purple/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-aura-purple">
                🔔 GitHub Notifications
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm font-medium">• DEMO</span>
                <span className="bg-aura-purple/20 text-aura-purple px-2 py-1 rounded text-xs">
                  {notifications.length} items
                </span>
              </div>
            </div>
            <NotificationList notifications={notifications} />
          </div>
        </div>

        {/* 🚀 QUICK ACTIONS FOOTER */}
        <div className="glass p-6 rounded-2xl border border-aura-green/20 mt-8">
          <h3 className="text-lg font-bold text-aura-green mb-4">🚀 Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-aura-azure/20 text-aura-azure px-4 py-2 rounded-lg font-medium hover:bg-aura-azure/30 transition-all">
              Start Focus Mode
            </button>
            <button className="bg-aura-purple/20 text-aura-purple px-4 py-2 rounded-lg font-medium hover:bg-aura-purple/30 transition-all">
              Plan My Day
            </button>
            <button className="bg-aura-green/20 text-aura-green px-4 py-2 rounded-lg font-medium hover:bg-aura-green/30 transition-all">
              Check Deployments
            </button>
            <button className="bg-aura-amber/20 text-aura-amber px-4 py-2 rounded-lg font-medium hover:bg-aura-amber/30 transition-all">
              Snooze All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}