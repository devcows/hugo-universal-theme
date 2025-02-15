import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Send email to sales team
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'bhmiden.anouar@gmail.com',
      subject: 'New Call Request from Website',
      text: `
Hello,

A new client has requested a call:

Client Email: ${email}

Please contact them to schedule a consultation.

Best regards,
Amayara Solutions Website
      `,
    });

    // Send auto-reply to client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your interest in Amayara Solutions',
      text: `
Dear valued client,

Thank you for your interest in Amayara Solutions. We have received your request for a consultation.

One of our sales representatives will be in contact with you shortly to schedule a call and discuss how we can help transform your business.

In the meantime, if you have any urgent questions, please don't hesitate to reply to this email.

Best regards,
Amayara Solutions Team
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 