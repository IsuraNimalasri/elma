import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Plus } from "lucide-react"

export default function DashboardHome() {
  return (
    <div className="space-y-12">
      
      {/* Top Section: Greeting & Daily Goal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Greeting */}
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
             {/* Avatar placeholder */}
             <img src="https://placehold.co/100x100/png?text=Avatar" alt="" className="h-20 w-20" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Hi Isura</h1>
            <Badge variant="secondary" className="mt-2 bg-blue-50 text-blue-600 hover:bg-blue-100">
              Tutor
            </Badge>
          </div>
        </div>

        {/* Daily Goal */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              Daily goal
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
               <div>
                 <div className="text-2xl font-bold text-slate-300">0 XP</div>
                 <div className="h-2 w-full bg-slate-100 rounded-full mt-2">
                   <div className="h-full bg-blue-500 rounded-full w-0"></div>
                 </div>
               </div>
               
               <div className="flex items-center justify-between">
                 <div className="flex gap-2">
                   {['T', 'F', 'S', 'S', 'M', 'T', 'W'].map((day, i) => (
                     <div key={i} className="h-8 w-8 rounded-full border flex items-center justify-center text-xs text-slate-400">
                       {day}
                     </div>
                   ))}
                 </div>
                 <Button className="bg-slate-800 text-white hover:bg-slate-700">
                   Set daily goal
                 </Button>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-slate-400" />
            <h2 className="text-xl font-bold text-slate-900">Courses</h2>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Edit courses</Button>
            <Button className="bg-slate-800 text-white hover:bg-slate-700 gap-2">
              <Plus className="h-4 w-4" /> New course
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
           {/* Header Row */}
           <div className="grid grid-cols-12 gap-4 border-b bg-slate-50/50 p-4 text-sm font-medium text-slate-500">
             <div className="col-span-6 md:col-span-5">Subject</div>
             <div className="col-span-3 md:col-span-3 flex items-center gap-1">
               <HelpCircle className="h-3 w-3" /> Questions / Avg score
             </div>
             <div className="col-span-3 md:col-span-4 flex items-center gap-1">
               <HelpCircle className="h-3 w-3" /> Flashcards / Confidence
             </div>
           </div>
           
           {/* Course Row 1 */}
           <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors cursor-pointer border-b last:border-0">
             <div className="col-span-6 md:col-span-5 flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-xl">🧮</div>
               <div>
                 <div className="font-bold text-slate-900">Maths</div>
                 <div className="text-sm text-slate-500">International A-Level · CIE</div>
               </div>
             </div>
             <div className="col-span-3 md:col-span-3">
               <div className="text-sm text-slate-500">Past papers only</div>
             </div>
             <div className="col-span-3 md:col-span-4 flex justify-end pr-4">
               <span className="text-slate-300">›</span>
             </div>
           </div>
           
           {/* Course Row 2 */}
           <div className="col-span-12">
              <a href="/courses/biology" className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-xl">🧬</div>
                  <div>
                    <div className="font-bold text-slate-900">Biology</div>
                    <div className="text-sm text-slate-500">GCSE · CIE Extended</div>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-3">
                   <div className="flex items-center gap-4 text-sm">
                     <span className="text-slate-500">0 / 1236</span>
                     <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal">0%</Badge>
                   </div>
                </div>
                <div className="col-span-3 md:col-span-4 flex justify-between items-center">
                   <span className="text-slate-400">---</span>
                   <span className="text-slate-300">›</span>
                </div>
              </a>
           </div>

        </Card>
      </div>

    </div>
  )
}

