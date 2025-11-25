import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function LandingHero() {
  return (
    <section className="pt-20 md:pt-32 pb-20 text-center space-y-8 container mx-auto max-w-5xl px-4">
      <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-normal bg-blue-50 text-blue-700 hover:bg-blue-100">
        Trusted by 1 million+ students and 20k+ schools
      </Badge>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
        A better way to <span className="text-blue-500">study</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        The all-in-one solution for improving your KS3, GCSE and A-level grades.
      </p>
      
      <div className="pt-4">
        <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white rounded-full px-8 h-12 text-lg w-full sm:w-auto" asChild>
          <Link href="/signup">Sign up for free</Link>
        </Button>
      </div>
    </section>
  )
}
