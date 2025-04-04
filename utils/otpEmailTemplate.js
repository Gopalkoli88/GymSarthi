 

const otpEmailTemplate = (otp, verificationLink) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center;">
  
      <!-- Full-Screen Container -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; min-height: 100vh; background-color: #ffffff;">
        
        <!-- Header -->
        <tr>
          <td style="background-color: #0D131E; color: white; padding: 40px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Gym Management System – OTP Verification</h1>
          </td>
        </tr>
  
        <!-- Body Content -->
        <tr>
          <td style="padding: 60px 20px; background-color: #ffffff; text-align: center;">
            <p style="font-size: 20px; color: #555; margin-bottom: 30px;">Hello,</p>
            <p style="font-size: 18px; color: #555; margin-bottom: 30px;">
              We received a request to verify your account. Please use the following One-Time Password (OTP) to complete your verification:
            </p>
  
            <!-- OTP Box -->
            <div style="background-color: #f5f5f5; border-radius: 12px; padding: 25px; display: inline-block; text-align: center; width: 50%;">
              <p style="font-size: 18px; color: #666; margin: 0;">Your verification code is:</p>
              <div style="font-size: 40px; font-weight: bold; letter-spacing: 6px; color: #0D131E; margin: 15px 0;">${otp}</div>
              <p style="color: #e74c3c; font-size: 16px; margin: 10px 0 0;">Valid for 5 minutes only</p>
            </div>
  
            <!-- Warning -->
            <p style="font-size: 18px; font-weight: bold; color: #e74c3c; margin-top: 40px;">
              Do not share this OTP with anyone for security reasons.
            </p>
  
  
            <!-- Alternative Link -->
            <p style="font-size: 16px; color: #666; margin-bottom: 15px;">
              If you're having trouble with the button above, copy and paste the URL below into your browser:
            </p>
          
          </td>
        </tr>
  
        <!-- Footer -->
        <tr>
          <td style="background-color: #0D131E; color: #9aa0a6; padding: 30px; text-align: center; font-size: 14px;">
            <p style="margin: 0 0 12px;">If you didn't request this, please ignore this email or contact support.</p>
            <p style="margin: 0;">&copy; 2025 Gym Management System. All rights reserved.</p>
          </td>
        </tr>
  
      </table>
  
    </body>
    </html>
    `;
  };
  
  module.exports = otpEmailTemplate;
  