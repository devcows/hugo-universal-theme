import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password, name } = data;

    // Validate the data
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user in database
    // 4. Create session/token
    // 5. Send welcome email

    // For now, we'll just log the signup
    console.log('New signup:', { email, name });

    // TODO: Add your authentication service integration here
    // Example with Auth.js or similar service

    return NextResponse.json(
      { message: 'Account created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
} 