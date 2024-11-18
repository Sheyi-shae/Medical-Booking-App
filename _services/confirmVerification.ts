import nodemailer from 'nodemailer';

interface SendEmailProps {
  email: string| "";
  firstName: string;
}

export const confirmVerification = async ({ email, firstName }: SendEmailProps) => {
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
    html: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    <h2 style="color: cyan;">Welcome to Our CarePlus!</h2>
    <p>Hello ${firstName},</p>
    <br/>
    <p>Your email has successfully been verified. You now have full access to our products and services</p>
    <p>Thank you,</p>
    <p>The Team</p>
    <hr style="border: 0; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #777;">This is an automated message, please do not reply.</p>
  </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error if you need to handle it further up the stack
  }
};
