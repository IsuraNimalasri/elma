import { NextResponse } from 'next/server';
import { COURSES_DATA } from '@/lib/data';

export async function GET() {
  return NextResponse.json(COURSES_DATA);
}

