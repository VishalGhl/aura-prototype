import { NextResponse } from 'next/server';
import { storeLinearToken } from '@/lib/storage';  // ← ADD THIS IMPORT

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth?error=${error}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth?error=no_code`
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.linear.app/oauth/token', {
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

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Token exchange failed');
    }

    // ✅ STORE THE ACCESS TOKEN - ADD THIS LINE
    storeLinearToken(tokenData.access_token);

    // Success! Redirect to main app with token
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/?linear_connected=true`
    );

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth?error=auth_failed`
    );
  }
}