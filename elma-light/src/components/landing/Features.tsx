import { cn } from "@/lib/utils"

interface FeatureProps {
  step: number
  title: string
  description: React.ReactNode
  align: "left" | "right"
}

function Feature({ step, title, description, align }: FeatureProps) {
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center gap-12 md:gap-24 py-12 md:py-24",
      align === "right" ? "md:flex-row-reverse" : ""
    )}>
      <div className="flex-1 space-y-4 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">
            {step}
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        </div>
        <div className="text-lg text-slate-600 leading-relaxed pl-11">
          {description}
        </div>
      </div>
      
      <div className="flex-1 w-full">
        <div className="aspect-video w-full rounded-xl bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
          {/* Placeholder for feature image */}
          Feature Image {step}
        </div>
      </div>
    </div>
  )
}

export function LandingFeatures() {
  return (
    <section className="container mx-auto pb-24">
      <Feature
        step={1}
        title="Learn with videos and notes"
        description={
          <>
            Explore our engaging <span className="text-pink-600 font-medium">video lessons</span> and comprehensive <span className="text-pink-600 font-medium">revision notes</span> to cover every topic.
          </>
        }
        align="left"
      />
      
      <Feature
        step={2}
        title="Check your understanding"
        description="Answer questions to check your understanding, or build your own quizzes to test yourself across multiple topics."
        align="right"
      />
      
      <Feature
        step={3}
        title="Memorise key concepts"
        description="Use flashcards to reinforce your memory of key concepts, or build your own decks to test yourself across multiple topics."
        align="left"
      />
       
      <Feature
        step={4}
        title="Get exam-ready"
        description="Work through exam-style questions and past papers to hone your skills and get comfortable with the exam format."
        align="right"
      />
    </section>
  )
}

