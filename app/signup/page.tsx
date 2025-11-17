'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { hashPassword } from '../lib/auth-utils'
import { createUser } from '../lib/db'
import { sendWelcomeEmail } from '../utils/emailService'
import { verifyCaptcha } from '../utils/captcha'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [captchaError, setCaptchaError] = useState<string>('')
  const captchaRef = useRef<HCaptcha>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateUniquePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&'
    const specialChars = '@$!%*?&'
    
    let password = ''
    // Ensure at least one of each required character type
    password += chars[Math.floor(Math.random() * 26)] // uppercase
    password += chars[Math.floor(Math.random() * 26) + 26] // lowercase
    password += chars[Math.floor(Math.random() * 10) + 52] // number
    password += specialChars[Math.floor(Math.random() * specialChars.length)] // special
    
    // Fill the rest to make 8 characters
    for (let i = password.length; i < 8; i++) {
      password += chars[Math.floor(Math.random() * chars.length)]
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('')
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      setErrors({ captcha: 'Please complete the security verification' });
      return;
    }

    // Verify CAPTCHA with server
    setIsLoading(true);
    try {
      const isCaptchaValid = await verifyCaptcha(captchaToken);
      if (!isCaptchaValid) {
        setErrors({ captcha: 'Security verification failed. Please try again.' });
        setIsLoading(false);
        captchaRef.current?.resetCaptcha();
        setCaptchaToken('');
        return;
      }
    } catch (error) {
      setErrors({ captcha: 'CAPTCHA verification error. Please try again.' });
      setIsLoading(false);
      captchaRef.current?.resetCaptcha();
      setCaptchaToken('');
      return;
    }

    try {
      // Generate unique password for the user
      const userPassword = generateUniquePassword()
      
      // Hash password for storage
      const hashedPassword = await hashPassword(userPassword)
      
      // Create user in database
      const user = await createUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: hashedPassword,
      });

      // Send welcome email with actual password (not hashed)
      await sendWelcomeEmail({
        firstName: formData.firstName,
        email: formData.email,
        password: userPassword,
      });

      // Show success modal
      setShowSuccess(true)
      
      // Start countdown timer
      let timer = 60
      const countdownInterval = setInterval(() => {
        timer--
        setCountdown(timer)
        if (timer <= 0) {
          clearInterval(countdownInterval)
        }
      }, 1000)

    } catch (error: any) {
      console.error('Signup error:', error)
      setErrors({ submit: error.message || 'Failed to create account. Please try again.' })
      // Reset CAPTCHA on error
      captchaRef.current?.resetCaptcha();
      setCaptchaToken('');
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    try {
      // Resend welcome email
      await sendWelcomeEmail({
        firstName: formData.firstName,
        email: formData.email,
        password: 'your-password' // In real app, you'd retrieve this from the database
      });
      
      setCountdown(60)
      
      // Restart countdown
      let timer = 60
      const countdownInterval = setInterval(() => {
        timer--
        setCountdown(timer)
        if (timer <= 0) {
          clearInterval(countdownInterval)
        }
      }, 1000)
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to resend email' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }))
    }
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: '' }))
    }
  }

  // Success Modal
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
        <div className="glass p-8 rounded-2xl border border-aura-azure/20 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-aura-azure/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h1 className="text-2xl font-bold text-aura-azure mb-2">Check Your Email!</h1>
            <p className="text-gray-300 mb-4">
              We have sent your login credentials to <strong>{formData.email}</strong>
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Please check your inbox, and sometimes it can go to spam. Please do check your spam folder as well.
            </p>

            <div className="bg-aura-black border border-aura-azure/20 rounded-lg p-4 mb-6">
              <div className="text-aura-azure font-semibold mb-2">Timer</div>
              <div className="text-2xl font-bold text-white">
                {countdown > 0 ? `${countdown}s` : 'Time\'s up!'}
              </div>
            </div>

            {countdown <= 0 && (
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full bg-aura-azure text-aura-black py-3 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isLoading ? 'Sending...' : '📧 Resend Email'}
              </button>
            )}

            <div className="text-center text-gray-400 text-sm">
              Ready to sign in?{' '}
              <Link href="/login" className="text-aura-azure hover:underline font-semibold">
                Login to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-aura-black text-white flex items-center justify-center">
      <div className="glass p-8 rounded-2xl border border-aura-azure/20 max-w-md w-full">
        <h1 className="text-3xl font-bold text-aura-azure mb-2">Create Account</h1>
        <p className="text-gray-400 mb-6">Join AURA and transform your workflow</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
                required
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
                required
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
              required
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              className="w-full bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure focus:outline-none"
              required
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
            <div className="text-gray-400 text-xs mt-2">
              Must contain: 8+ characters, uppercase, lowercase, number, and special character
            </div>
          </div>

          {/* hCAPTCHA COMPONENT */}
          <div className="bg-aura-black border border-aura-azure/20 rounded-lg p-4 text-center">
            <div className="text-gray-400 mb-2">🔒 Security Verification</div>
            <HCaptcha
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
              onVerify={(token) => {
                setCaptchaToken(token);
                setCaptchaError('');
                if (errors.captcha) {
                  setErrors(prev => ({ ...prev, captcha: '' }));
                }
              }}
              onError={() => {
                setCaptchaError('CAPTCHA verification failed');
                setErrors(prev => ({ ...prev, captcha: 'CAPTCHA verification failed. Please try again.' }));
              }}
              onExpire={() => {
                setCaptchaToken('');
                setCaptchaError('CAPTCHA expired');
                setErrors(prev => ({ ...prev, captcha: 'CAPTCHA expired. Please verify again.' }));
              }}
            />
            {(errors.captcha || captchaError) && (
              <p className="text-red-400 text-sm mt-2">{errors.captcha || captchaError}</p>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-400/20 border border-red-400 text-red-400 p-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !captchaToken}
            className="w-full bg-aura-azure text-aura-black py-3 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : '🚀 Create Account'}
          </button>

          <div className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-aura-azure hover:underline">
              Sign in
            </Link>
          </div>

          <div className="text-center text-gray-400 text-xs mt-6">
            By creating an account, you agree to our Terms and Privacy Policy
          </div>
        </form>
      </div>
    </div>
  )
}