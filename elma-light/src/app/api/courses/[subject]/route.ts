import { NextResponse } from 'next/server';
import { getSubject } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ subject: string }> }
) {
  const { subject } = await params
  const data = getSubject(subject);
  
  if (!data) {
    return new NextResponse('Subject not found', { status: 404 });
  }
  
  return NextResponse.json(data);
}

