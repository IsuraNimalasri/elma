import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, Star, Flame, Zap, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Settings className="h-6 w-6 text-blue-600" />
            <span className="text-blue-900 uppercase tracking-tight">elma-light</span>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-slate-600">
                All courses <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Maths</DropdownMenuItem>
              <DropdownMenuItem>Science</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-1 text-slate-600 font-medium">
             <Star className="h-5 w-5 text-blue-400 fill-blue-400" />
             <span>0 XP</span>
           </div>
           
           <div className="flex items-center gap-1 text-slate-600 font-medium">
             <Flame className="h-5 w-5 text-slate-300" />
             <span>0 Days</span>
           </div>
           
           <Button variant="ghost" className="gap-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50">
             <Zap className="h-4 w-4 fill-purple-600" />
             Upgrade
           </Button>
           
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent">
                 <span className="text-slate-900 font-medium">Isura</span>
                 <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

