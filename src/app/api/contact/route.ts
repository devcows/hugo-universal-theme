import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    // Validate the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email to Amayara Solutions
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'bhmiden.anouar@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
New contact form submission:

Name: ${name}
Email: ${email}
Message:
${message}

Best regards,
Amayara Solutions Website
      `,
    });

    // Send auto-reply to the client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Amayara Solutions',
      text: `
Dear ${name},

Thank you for contacting Amayara Solutions. We have received your message and will get back to you shortly.

Your message:
${message}

Best regards,
Amayara Solutions Team
      `,
    });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 