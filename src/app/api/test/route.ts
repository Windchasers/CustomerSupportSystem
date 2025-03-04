import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Test database connection
    const result = await sql`SELECT NOW();`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { success: false, message: 'Database connection failed' },
      { status: 500 }
    );
  }
} 