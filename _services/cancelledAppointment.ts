import nodemailer from 'nodemailer';

interface SendEmailProps {
  patientEmail: string;
  patientFullName: string;
  doctorFullName: string;
  reason:string;
  
  
}

export const cancelledAppointment = async ({
   patientEmail, patientFullName,doctorFullName ,reason }: SendEmailProps) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for "from" email
    to: patientEmail,
    subject: 'New Appointment Notification',
    html: `<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Inter', Arial, sans-serif; color: #333333;">
        <div style="background-color: #00bcd4; padding: 15px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;"> Appointment with Dr.${doctorFullName} was declined</h1>
        </div>
        <div style="padding: 20px;">
            <h2 style="color: #00bcd4; margin-bottom: 10px; text-transform: capitalize;">Dear ${patientFullName},</h2>
            <p style="margin: 5px 0; line-height: 1.6;">We are sorry to inform you that  your appointment with Dr.${doctorFullName} has been declined</p>
            <b style="margin: 5px 0; line-height: 1.6;"> Reason for cancellation</b><br/>
           
            <a href="#" style="display: inline-block; background-color: #00bcd4; color: #ffffff; padding: 10px 20px; margin-top: 20px; text-decoration: none; border-radius: 4px; font-family: 'Inter', Arial, sans-serif;">${reason}</a>


            <p style="margin: 5px 0; line-height: 1.6;">- Please not that you can always  reschedule the event</p>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #888888; text-align: center;">
            <p>Thank you for your dedication and service!</p>
            <p>&copy; CarePlus+ Team</p>
        </div>
    </div>
</body>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error if you need to handle it further up the stack
  }
};
