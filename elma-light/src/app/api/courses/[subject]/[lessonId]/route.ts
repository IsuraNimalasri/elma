import { NextResponse } from 'next/server';
import { getLesson } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ subject: string; lessonId: string }> }
) {
  const { subject, lessonId } = await params
  const data = getLesson(subject, lessonId);
  
  if (!data) {
    return new NextResponse('Lesson not found', { status: 404 });
  }
  
  return NextResponse.json(data);
}

