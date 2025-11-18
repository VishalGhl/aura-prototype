import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function generateSecurePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
  const specialChars = '@$!%*?&';
  
  let password = '';
  password += chars[Math.floor(Math.random() * 26)];
  password += chars[Math.floor(Math.random() * 26) + 26];
  password += chars[Math.floor(Math.random() * 10) + 52];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
  for (let i = password.length; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('');
}