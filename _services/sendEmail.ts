import nodemailer from 'nodemailer';

interface SendEmailProps {
  email: string;
  verificationCode: string;
}

export const sendVerificationEmail = async ({ email, verificationCode }: SendEmailProps) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for "from" email
    to: email,
    subject: 'Verify your email',
    html: `<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Inter', Arial, sans-serif; color: #333333;">
        <div style="background-color: #00bcd4; padding: 15px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to  CarePlus!</h1>
        </div>
        <div style="padding: 20px;">
          <p style="margin: 5px 0; line-height: 1.6;">Thank you for signing up. Please use this code to verify your email address:</p><br/>
            <a href="#" style="display: inline-block; background-color: #00bcd4; color: #ffffff; padding: 10px 20px; margin-top: 20px; text-decoration: none; border-radius: 4px; font-family: 'Inter', Arial, sans-serif;">
            ${verificationCode}</a>

            
            <p>If you did not request this code, please ignore this email.</p>
    <p>Thank you,</p>
    <p>The Team</p>
    <hr style="border: 0; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply.</p>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #888888; text-align: center;">
            <p>Thank you for your dedication and service!</p>
            <p>&copy; CarePlus+ Team</p>
        </div>
    </div>
</body>

`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error if you need to handle it further up the stack
  }
};
