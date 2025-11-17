export const verifyCaptcha = async (token: string): Promise<boolean> => {
  try {
    console.log('🔍 CAPTCHA token received:', token);
    
    // TEMPORARY: For testing, accept any non-empty token
    // Remove this in production!
    if (token && token.length > 10) {
      console.log('✅ CAPTCHA bypassed for testing');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ CAPTCHA verification error:', error);
    return false;
  }
};