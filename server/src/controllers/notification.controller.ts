import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Setup the transporter (use your SMTP credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_MAIL, // Replace with your Gmail or SMTP email
    pass: process.env.MAIL_PASS,     // App password if Gmail
  },
});

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// 1. Send welcome email to subscriber
export async function sendWelcomeEmail(name: string, email: string, service: string): Promise<void> {
  try {
    const mailOptions = {
      from: `"FitWeLive" <${process.env.APP_MAIL}>`,
      to: email,
      subject: `Welcome to FitWeLive - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #2ecc71;">Welcome to FitWeLive, ${name}!</h1>
          <p>Thank you for subscribing to <strong>${service}</strong>. 🎉</p>
          <p>We're thrilled to have you on board and excited to be part of your fitness journey.</p>
          <p>Let's start transforming your lifestyle and achieving your goals together! 💪</p>
          <hr/>
          <p style="font-size: 0.9em; color: #888;">If you have any questions, feel free to reach out to our support team.</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Welcome email failed:", getErrorMessage(error));
  }
}

// 2. Send email when ticket is created (non-subscribers or subscribers)
export async function sendTicketReceivedEmail(name: string, email: string): Promise<void> {
  try {
    const mailOptions = {
      from: `"FitWeLive" <${process.env.APP_MAIL}>`,
      to: email,
      subject: `We received your request!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${name},</h2>
          <p>We've successfully received your request to join our fitness program. 📝</p>
          <p>Our administrators have your details and will get in touch with you shortly for confirmation and onboarding.</p>
          <p>Thank you for choosing FitWeLive!</p>
          <hr/>
          <p style="font-size: 0.9em; color: #888;">No further action is required at this moment.</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Ticket received email failed:", getErrorMessage(error));
  }
}

// 3. Send email when ticket is resolved (with login credentials)
export async function sendTicketResolvedEmail(email: string, name: string, dob: string): Promise<void> {
  try {
    const mailOptions = {
      from: `"FitWeLive" <${process.env.APP_MAIL}>`,
      to: email,
      subject: "Your Ticket is Resolved - Welcome to FitWeLive!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${name},</h2>
          <p>We are pleased to inform you that your ticket has been <strong>successfully resolved</strong>. ✅</p>
          <p>You're now part of our fitness family. Below are your login credentials:</p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Password:</strong> Your name in uppercase followed by '@' and your date of birth in DDMMYYYY format (e.g., JOHN@1998)</li>
          </ul>
          <p>Please login and start your personalized fitness journey with us.</p>
          <p>We're excited to help you become the best version of yourself! 💪</p>
          <hr/>
          <p style="font-size: 0.9em; color: #888;">Make sure to change your password after logging in for the first time for security reasons.</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Ticket resolved email failed:", getErrorMessage(error));
  }
}
