// app/auth/page.tsx - Connect your tools
'use client'
import { getLinearAuthUrl } from '@/app/lib/auth';

export default function AuthPage() {
  const connectLinear = () => {
    window.location.href = getLinearAuthUrl();
  };

  return (
    <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
      <div className="glass bg-aura-black/50 p-8 rounded-2xl border border-aura-azure/20 max-w-md w-full">
        <h1 className="text-3xl font-bold text-aura-azure mb-2">Connect Your Tools</h1>
        <p className="text-gray-400 mb-6">AURA works better when connected to your existing tools</p>
        
        <button 
          onClick={connectLinear}
          className="w-full bg-aura-azure text-aura-black py-3 px-4 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all mb-4"
        >
          🔗 Connect Linear
        </button>
        
        <button className="w-full bg-aura-purple text-white py-3 px-4 rounded-lg font-semibold hover:bg-aura-purple/90 transition-all mb-4 opacity-50 cursor-not-allowed">
          🔗 Connect GitHub (Coming Soon)
        </button>
        
        <button className="w-full bg-aura-green text-aura-black py-3 px-4 rounded-lg font-semibold hover:bg-aura-green/90 transition-all opacity-50 cursor-not-allowed">
          🔗 Connect Slack (Coming Soon)
        </button>
      </div>
    </div>
  );
}