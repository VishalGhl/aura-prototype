import { hash, compare } from 'bcryptjs';

// Hash password for secure storage
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12); // 12 salt rounds
}

// Verify password against hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

// Generate secure random password
export function generateSecurePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
  const specialChars = '@$!%*?&';
  
  let password = '';
  
  // Ensure at least one of each required character type
  password += chars[Math.floor(Math.random() * 26)]; // uppercase
  password += chars[Math.floor(Math.random() * 26) + 26]; // lowercase
  password += chars[Math.floor(Math.random() * 10) + 52]; // number
  password += specialChars[Math.floor(Math.random() * specialChars.length)]; // special
  
  // Fill the rest to make 8 characters
  for (let i = password.length; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}