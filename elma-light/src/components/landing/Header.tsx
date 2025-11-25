"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Settings, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const levels = [
  { id: "ks3", name: "KS3", hasSub: true },
  { id: "gcse", name: "GCSE", hasSub: true },
  { id: "alevel", name: "A-Level", hasSub: true },
  { id: "ib", name: "IB", hasSub: true },
  { id: "entrance", name: "Entrance Exams", hasSub: false },
  { id: "us-sciences", name: "US Sciences", hasSub: false },
  { id: "us-ap", name: "US AP", hasSub: false },
]

const subjects = {
  ks3: [
    { name: "Biology", href: "/courses/biology" },
    { name: "Chemistry", href: "/courses/chemistry" },
    { name: "Physics", href: "/courses/physics" },
    { name: "Maths", href: "/courses/maths" },
  ],
  // Mocking others for now
  gcse: [
    { name: "Biology", href: "/courses/biology" },
    { name: "Chemistry", href: "/courses/chemistry" },
    { name: "Physics", href: "/courses/physics" },
    { name: "Maths", href: "/courses/maths" },
  ],
  alevel: [
    { name: "Maths", href: "/courses/maths" },
    { name: "Further Maths", href: "/courses/further-maths" },
  ]
}

export function LandingHeader() {
  const [activeMenu, setActiveMenu] = React.useState<"main" | string>("main")

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary shrink-0">
            <Settings className="h-6 w-6 text-blue-600" />
            <span className="text-blue-900 uppercase tracking-tight">elma-light</span>
          </Link>
          
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary bg-transparent">Find my course</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-2">
                        {activeMenu === "main" ? (
                            <div className="space-y-1">
                                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mb-2">
                                    Select course
                                </div>
                                {levels.map((level) => (
                                    <button
                                        key={level.id}
                                        onClick={() => level.hasSub ? setActiveMenu(level.id) : undefined}
                                        className="w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                    >
                                        <span>{level.name}</span>
                                        {level.hasSub && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground mb-2 cursor-pointer hover:text-primary" onClick={() => setActiveMenu("main")}>
                                    <ArrowLeft className="h-3 w-3" />
                                    Resources <span className="text-muted-foreground/50 mx-1">›</span> {levels.find(l => l.id === activeMenu)?.name}
                                </div>
                                
                                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                                    Science and Maths
                                </div>
                                {subjects[activeMenu as keyof typeof subjects]?.map((subject) => (
                                    <Link
                                        key={subject.name}
                                        href={subject.href}
                                        className="w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer block"
                                    >
                                        {subject.name}
                                        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                                    </Link>
                                )) || <div className="px-2 py-2 text-sm text-muted-foreground">No subjects found</div>}
                            </div>
                        )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/faq" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-muted-foreground bg-transparent")}>
                      FAQ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                 <NavigationMenuItem>
                  <Link href="/schools" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-muted-foreground bg-transparent")}>
                      Schools
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
