// lib/auth.ts - TEMPORARY HARDCODE FOR TESTING
export const LINEAR_OAUTH_CONFIG = {
  clientId: '0900b7398718c02b18742a124e25245d', // Paste your real client ID
  clientSecret: process.env.LINEAR_CLIENT_SECRET!,
  redirectUri: 'http://localhost:3000/api/auth/callback/linear',
};

export function getLinearAuthUrl() {
  const params = new URLSearchParams({
    client_id: '0900b7398718c02b18742a124e25245d', // Paste your real client ID
    redirect_uri: 'http://localhost:3000/api/auth/callback/linear',
    response_type: 'code',
    scope: 'read,write',
    state: 'aura_' + Math.random().toString(36).substring(2),
  });
  
  return `https://linear.app/oauth/authorize?${params.toString()}`;
}