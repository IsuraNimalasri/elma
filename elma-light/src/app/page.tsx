import { LandingHeader } from "@/components/landing/Header"
import { LandingHero } from "@/components/landing/Hero"
import { LandingFeatures } from "@/components/landing/Features"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        
        <section className="bg-slate-50 py-24 text-center">
          <div className="container mx-auto max-w-2xl space-y-8">
             <h2 className="text-3xl font-bold text-slate-900">
               Join over <span className="text-blue-500">1,000,000</span> students already using Cognito to prepare for their exams.
             </h2>
             <div className="flex justify-center">
                <img src="https://placehold.co/100x100/png?text=Globe" alt="" className="h-24 w-auto opacity-50" /> 
             </div>
             {/* Reusing button style from Hero, maybe make a component if reused often */}
             <a href="/dashboard" className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-slate-800 text-white hover:bg-slate-700 font-medium transition-colors">
               Get started - it's free!
             </a>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 text-center text-xs text-slate-400">
        © 2025 Cognito Education. All rights reserved.
      </footer>
    </div>
  )
}

