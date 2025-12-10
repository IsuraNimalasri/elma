import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="#top" className="font-bold tracking-tight text-lg">ELMA</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="#workspace" className="hover:opacity-70">Workspace</Link>
          <Link href="#devices" className="hover:opacity-70">Devices</Link>
          <Link href="#classroom" className="hover:opacity-70">Classroom</Link>
          <Link href="#ai" className="hover:opacity-70">AI</Link>
          <Link href="#audience" className="hover:opacity-70">For You</Link>
          <Link href="#faq" className="hover:opacity-70">FAQ</Link>
        </nav>
        <Button asChild className="rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <Link href="/home">Get started</Link>
        </Button>
      </div>
    </header>
  );
}

