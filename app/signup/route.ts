import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '../lib/auth-utils'
import { createUser } from '../lib/db'
import { sendWelcomeEmail } from '../utils/emailService'
import { verifyCaptcha } from '../utils/captcha'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, captchaToken } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !captchaToken) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Verify CAPTCHA
    const isCaptchaValid = await verifyCaptcha(captchaToken)
    if (!isCaptchaValid) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Generate unique password for the user
    const userPassword = generateUniquePassword()
    
    // Hash password for storage
    const hashedPassword = await hashPassword(userPassword)
    
    // Create user in database
    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    // Send welcome email with actual password (not hashed)
    await sendWelcomeEmail({
      firstName,
      email,
      password: userPassword,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully. Check your email for credentials.' 
    })

  } catch (error: any) {
    console.error('Signup API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500 }
    )
  }
}

function generateUniquePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&'
  const specialChars = '@$!%*?&'
  
  let password = ''
  password += chars[Math.floor(Math.random() * 26)]
  password += chars[Math.floor(Math.random() * 26) + 26]
  password += chars[Math.floor(Math.random() * 10) + 52]
  password += specialChars[Math.floor(Math.random() * specialChars.length)]
  
  for (let i = password.length; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('')
}