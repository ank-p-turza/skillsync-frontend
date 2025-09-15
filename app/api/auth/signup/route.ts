import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    
    const response = await axios.post('http://localhost:4000/auth/signup', body, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout : 10000
    });

    // Set the email cookie so /verify can read it server-side
    const res = NextResponse.json(response.data, { status: response.status });
    // Use httpOnly so client JS can't read it; short maxAge (10 mins)
    res.cookies.set('email', body.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60,
      path: '/',
    });
    return res;
  } catch (error: any) {
    console.error('Proxy error:', error);
    
    if (error.response) {
      return NextResponse.json(
        error.response.data,
        { status: error.response.status }
      );
    } else if (error.request) {
      return NextResponse.json(
        { message: 'Backend server is not responding' },
        { status: 503 }
      );
    } else {
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }
  }
}
