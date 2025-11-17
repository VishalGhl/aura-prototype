// lib/auth.ts - Updated to use environment variables
export const LINEAR_OAUTH_CONFIG = {
  clientId: process.env.LINEAR_CLIENT_ID!,
  clientSecret: process.env.LINEAR_CLIENT_SECRET!,
  redirectUri: process.env.LINEAR_REDIRECT_URI!,
};

export function getLinearAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.LINEAR_CLIENT_ID!,
    redirect_uri: process.env.LINEAR_REDIRECT_URI!,
    response_type: 'code',
    scope: 'read,write',
    state: 'aura_' + Math.random().toString(36).substring(2),
  });
  
  return `https://linear.app/oauth/authorize?${params.toString()}`;
}

// Add this new function for token exchange
export async function exchangeLinearCodeForToken(code: string) {
  try {
    const response = await fetch('https://api.linear.app/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.LINEAR_CLIENT_ID!,
        client_secret: process.env.LINEAR_CLIENT_SECRET!,
        code: code,
        redirect_uri: process.env.LINEAR_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      throw new Error(`Linear OAuth failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error exchanging Linear code for token:', error);
    throw error;
  }
}