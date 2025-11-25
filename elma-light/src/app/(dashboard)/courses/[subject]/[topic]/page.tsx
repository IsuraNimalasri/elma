import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getLesson } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function LessonPage({ params }: { params: Promise<{ subject: string, topic: string }> }) {
    // Note: 'topic' param here actually corresponds to the lessonId based on our new data structure
    // we are mapping /courses/[subject]/[lessonId] -> params.topic
    // The folder name is [topic] but we are treating it as lessonId in our logic
    
    const { subject, topic: lessonId } = await params
    const data = getLesson(subject, lessonId)

    if (!data) {
        notFound()
    }

    const { subject: subjectData, lesson } = data
    
    // Simple logic to find next lesson
    // In a real app this would be more robust
    const currentTopic = data.topic
    const currentLessonIndex = currentTopic.lessons.findIndex(l => l.id === lesson.id)
    const nextLesson = currentTopic.lessons[currentLessonIndex + 1]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Nav */}
      <div className="flex items-center gap-4">
        <Link href={`/courses/${subject}`} className="text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-medium">
           <ArrowLeft className="h-4 w-4" /> {subjectData.title} lessons
        </Link>
      </div>

      {/* Progress (Mocked) */}
      <div className="flex items-center justify-center text-xs text-slate-500 font-medium">
          Lesson {currentLessonIndex + 1} of {currentTopic.lessons.length}
      </div>
      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500" 
            style={{ width: `${((currentLessonIndex + 1) / currentTopic.lessons.length) * 100}%` }}
          ></div>
      </div>

      {/* Video Content */}
      <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg relative group">
         {lesson.videoUrl ? (
             <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lesson.videoUrl} className="w-full h-full object-cover opacity-60" alt="Video thumbnail" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white border-b-10 border-b-transparent ml-1"></div>
                    </div>
                </div>
             </>
         ) : (
             <div className="absolute inset-0 flex items-center justify-center text-white">
                 No video available
             </div>
         )}
      </div>

      {/* Text Content */}
      <div className="prose prose-slate max-w-none">
          <h1 className="text-2xl font-bold text-slate-900">{lesson.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>
      
      <div className="flex justify-end pt-8">
          {nextLesson ? (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href={`/courses/${subject}/${nextLesson.id}`}>
                    Next Lesson: {nextLesson.title}
                  </Link>
              </Button>
          ) : (
              <Button className="bg-slate-800 hover:bg-slate-700 text-white" asChild>
                  <Link href={`/courses/${subject}`}>
                    Finish Topic
                  </Link>
              </Button>
          )}
      </div>
    </div>
  )
}
