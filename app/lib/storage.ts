// lib/storage.ts - Simple token storage
let linearAccessToken: string | null = null;

export function storeLinearToken(token: string) {
  linearAccessToken = token;
  // In production, we'd use secure cookies or database
  console.log('Linear access token stored');
}

export function getLinearToken(): string | null {
  return linearAccessToken;
}