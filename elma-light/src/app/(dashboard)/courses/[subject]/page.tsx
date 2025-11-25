import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronRight } from "lucide-react"
import { getSubject } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function CoursePage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params
  const courseData = getSubject(subject)

  if (!courseData) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 flex items-center gap-2">
        <Link href="/dashboard" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-slate-900">{courseData.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`h-16 w-16 rounded-full ${courseData.color} flex items-center justify-center text-3xl`}>
            {courseData.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{courseData.title}</h1>
            <p className="text-slate-500">{courseData.level} {courseData.title}</p>
          </div>
        </div>

        <Card className="p-4 flex items-center gap-4 max-w-md hover:bg-blue-50/50 cursor-pointer transition-colors border-blue-100 bg-blue-50/30">
           <div className="h-10 w-10 rounded bg-white border border-blue-100 flex items-center justify-center text-blue-500 font-bold">
             M
           </div>
           <div className="flex-1">
             <div className="font-bold text-slate-900 text-sm">Study multiple subtopics</div>
             <div className="text-xs text-slate-500">Build a quiz or flashcard deck tailored to you by selecting multiple subtopics.</div>
           </div>
           <ChevronRight className="h-5 w-5 text-slate-400" />
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="bg-transparent w-full justify-start border-b rounded-none h-auto p-0 space-x-8 overflow-x-auto flex-nowrap">
          {["Lessons", "Quiz", "Flashcards", "Past papers"].map((tab) => (
            <TabsTrigger 
              key={tab}
              value={tab.toLowerCase().replace(" ", "-")} 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-0 py-3 bg-transparent font-medium whitespace-nowrap"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="lessons" className="mt-8 space-y-4">
           <div className="flex justify-end">
             <Button variant="ghost" className="text-xs text-slate-500 h-auto py-1">Collapse all</Button>
           </div>

           <Accordion type="single" collapsible className="space-y-4">
             {courseData.topics.map((topic, index) => (
               <AccordionItem key={topic.id} value={topic.id} className="border rounded-lg px-4 bg-white shadow-sm">
                 <AccordionTrigger className="hover:no-underline py-4">
                   <span className="font-medium text-slate-900">{topic.title}</span>
                 </AccordionTrigger>
                 <AccordionContent className="pt-0 pb-4 space-y-1">
                   {topic.lessons.map((lesson, lIndex) => (
                     <Link 
                        key={lesson.id} 
                        href={`/courses/${subject}/${lesson.id}`} 
                        className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-md group cursor-pointer"
                     >
                       <div className="h-6 w-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 transition-colors">
                         {lIndex + 1}
                       </div>
                       <span className="text-slate-600 group-hover:text-blue-600 transition-colors">
                         {lesson.title}
                       </span>
                     </Link>
                   ))}
                 </AccordionContent>
               </AccordionItem>
             ))}
           </Accordion>
           
           {courseData.topics.length === 0 && (
             <div className="text-center py-12 text-slate-500">
               No lessons available for this subject yet.
             </div>
           )}
        </TabsContent>

        <TabsContent value="past-papers">
            <Card className="p-4">
                <h3 className="font-bold mb-4">Past Papers</h3>
                {[2023, 2022, 2021, 2020, 2019].map(year => (
                    <div key={year} className="border-b py-3 last:border-0 flex justify-between items-center hover:bg-slate-50 cursor-pointer px-2">
                        <span>{year}</span>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                    </div>
                ))}
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
