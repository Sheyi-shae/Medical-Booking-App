import nodemailer from 'nodemailer';

interface SendEmailProps {
  doctorEmail?: string;
  patientFullName: string;
  doctorFullName: string;
  appointmentDate:Date
  appointmentTime:string
  reason:string
}

export const appointmentCreationEmail = async ({
   doctorEmail, patientFullName,doctorFullName,reason,appointmentDate,appointmentTime }: SendEmailProps) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for "from" email
    to: doctorEmail,
    subject: 'New Appointment Notification',
    html: `<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Inter', Arial, sans-serif; color: #333333;">
        <div style="background-color: #00bcd4; padding: 15px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px;">New Appointment  with ${patientFullName}</h1>
        </div>
        <div style="padding: 20px;">
            <h2 style="color: #00bcd4; margin-bottom: 10px; text-transform: capitalize;">Hello Dr. ${doctorFullName},</h2>
            <p style="margin: 5px 0; line-height: 1.6;">A new telehealth appointment has been scheduled with you on CarePlus+.</p>
            <p style="margin: 5px 0; line-height: 1.6;"><strong>Appointment Details:</strong></p>
            <p style="margin: 5px 0; line-height: 1.6;"><strong>Patient Name:</strong> ${patientFullName}</p>
            <p style="margin: 5px 0; line-height: 1.6;"><strong>Appointment Date:</strong> ${appointmentDate}</p>
            <p style="margin: 5px 0; line-height: 1.6;"><strong>Appointment Time:</strong> ${appointmentTime}</p>
            <p style="margin: 5px 0; line-height: 1.6;"><strong>Reason for Visit:</strong> ${reason}</p>

            <b style="margin: 5px 0; line-height: 1.6;"> MeetingId and password will be sent to you after your approval </b><br/>
            <a href="#" style="display: inline-block; background-color: #00bcd4; color: #ffffff; padding: 10px 20px; margin-top: 20px; text-decoration: none; border-radius: 4px; font-family: 'Inter', Arial, sans-serif;">Appointment details</a>

            <p style="margin: 5px 0; line-height: 1.6;">Please ensure to join the call a few minutes before the scheduled time.</p>
            <p style="margin: 5px 0; line-height: 1.6;"><strong>Additional Notes:</strong></p>
            <p style="margin: 5px 0; line-height: 1.6;">- The patient has been advised to prepare any necessary documents.</p>
            <p style="margin: 5px 0; line-height: 1.6;">- If you need to reschedule or have any concerns, please contact the patient or our support team.</p>
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
