import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (userData: {
  firstName: string
  email: string
  password: string
}) => {
  try {
    console.log('📧 Attempting to send email to:', userData.email);
    console.log('🔑 Resend API Key exists:', !!process.env.RESEND_API_KEY);
    
    // Test if Resend API key is working
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing');
    }

    const { data, error } = await resend.emails.send({
      from: 'AURA <onboarding@resend.dev>',
      to: [userData.email],
      subject: `Welcome to AURA, ${userData.firstName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border: 1px solid #00f0ff; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #00f0ff, #0080ff); padding: 30px; text-align: center;">
              <h1 style="margin:0; color: #000;">🚀 Welcome to AURA</h1>
            </div>
            <div style="padding: 30px;">
              <h2>Hi ${userData.firstName}!</h2>
              <p>Thank you for creating an account with AURA.</p>
              
              <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00f0ff;">
                <h3 style="margin-top:0;">Your Login Credentials:</h3>
                <p><strong>Username:</strong> ${userData.firstName}</p>
                <p><strong>Password:</strong> <code style="background: #000; padding: 4px 8px; border-radius: 4px;">${userData.password}</code></p>
              </div>
              
              <p>Please keep these credentials secure.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('✅ Email sent successfully! Response:', data);
    return data;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};