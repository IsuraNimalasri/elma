// app/home/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-dots text-slate-800">
        <Link href="/home/general">General
        <Button variant="outline">General</Button>
        </Link>

        <Link href="/home/11_plus">General
      <Button variant="outline">11 + </Button>
      </Link>

      <Link href="/home/parents">General
      <Button variant="outline">Parent Mode</Button>
      </Link>

    </main>
  );
}
