"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MarktingHeader from "./_components/MarktingHeader";
import { Highlighter } from "@/components/ui/highlighter"
import Image from "next/image";
import Link from "next/link";

// ------------------------------------------------------------
// Drop this file into: app/page.tsx (App Router)
// Prereqs: TailwindCSS installed. Then: `yarn add framer-motion`
// Optional fonts/images: replace placeholder URLs with your own.
// ------------------------------------------------------------

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-white text-gray-900 selection:bg-yellow-200">
      <MarktingHeader />
      <Hero />
      <SellingPoints />
      <ParallaxPanel />
      <ProductStrips />
      <AudienceCTA />
      <FAQ />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section id="top" className="relative grid place-items-center min-h-[92vh] overflow-hidden">
      <Image
        src="/background3.png"
        alt="Colorful abstract learning"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
          11+ <Highlighter action="underline" color="#EAFF00FF">
          campus 
          </Highlighter> for parents.
          
          <Highlighter action="underline" color="#EAFF00FF">No boring </Highlighter> lessons for kids.
        </h1>
        <p className="mt-4 text-lg/7 md:text-xl/8 text-white/90 drop-shadow-sm">
         See where your child is headed, track progress, and get simple ways to help. Kids <Highlighter action="highlight" color="#FA0000FF"> learn with fun </Highlighter>, bite‑size practice that <Highlighter action="highlight" color="#FA0000FF"> builds real confidence</Highlighter>.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/home" className="rounded-full bg-blue-600 text-white px-6 py-3 font-semibold shadow hover:shadow-md hover:bg-blue-700">
            Get started
          </Link>
        </div>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/90 text-xs flex flex-col items-center">
      <div className="h-6 w-4 rounded-full border border-white/60 flex items-start justify-center p-[2px]">
        <motion.div
          className="h-2 w-1 rounded-full bg-white/80"
          animate={{ y: [0, 12, 0], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </div>
      <span className="mt-2">Scroll</span>
    </div>
  );
}

function SellingPoints() {
  const items = [
    {
      id: "workspace",
      title: "Workspace for Education",
      desc: "Simple, secure tools that help teachers manage learning and collaboration.",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "devices",
      title: "Chromebooks & Devices",
      desc: "Fast boot, long battery, and built for classrooms and remote learning.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "classroom",
      title: "Classroom & LMS",
      desc: "Assign, grade, and give feedback in one place. Keep learning organised and visible.",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "ai",
      title: "AI for Teaching & Learning",
      desc: "Draft feedback, personalise practice, and free up time for real mentoring.",
      img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <Image
        src="/background4.png"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/70" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Everything you need to run modern learning
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Modular sections keep scrolling light and purposeful. Swap images and copy to match your offer.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((it, idx) => (
            <FeatureCard key={it.id} {...it} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ id, title, desc, img, idx }: { id: string; title: string; desc: string; img: string; idx: number }) {
  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: idx * 0.05 }}
      className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{desc}</p>
        <Link href={`#audience`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
          Explore <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.article>
  );
}

function ParallaxPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"]);

  return (
    <section ref={ref} aria-label="Parallax" className="relative h-[80vh] sm:h-[90vh] my-8 overflow-hidden rounded-3xl">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/Nature1.png"
          alt="Nature growth"
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
      <div className="relative z-10 h-full grid place-items-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-white/90 font-semibold">Built-in scroll delight</p>
          <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-white">Tell a visual story while users scroll</h3>
          <p className="mt-3 text-white/85 max-w-2xl">
            Subtle parallax gives motion without dizziness. Keep it crisp and performant with one big image and a gradient overlay.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProductStrips() {
  const strips = [
    {
      label: "Secure by default",
      text: "SSO, audit logs, role-based access, and privacy controls to keep learning safe.",
      icon: "🔒",
    },
    { label: "Fast on any device", text: "Optimised assets and lazy loading so pages feel instant.", icon: "⚡" },
    { label: "Accessible", text: "High contrast, semantic HTML, and keyboard-friendly navigation.", icon: "♿" },
  ];
  return (
    <section className="py-14 bg-gray-50 border-y">
      <div className="mx-auto max-w-6xl px-6 grid gap-4 md:grid-cols-3">
        {strips.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white p-6 shadow-sm border"
          >
            <div className="text-2xl">{s.icon}</div>
            <h4 className="mt-2 font-semibold">{s.label}</h4>
            <p className="mt-1 text-gray-600 text-sm">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AudienceCTA() {
  const cards = [
    { title: "Primary / K‑12", text: "Simple tools for busy classrooms and IT admins.", href: "#" },
    { title: "Higher Education", text: "Research-ready collaboration with strong compliance.", href: "#" },
    { title: "Nonprofits & Training", text: "Launch programmes, cohorts, and workshops fast.", href: "#" },
  ];

  return (
    <section id="audience" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="md:flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Find the path that fits you</h2>
            <p className="mt-2 text-gray-600 max-w-xl">
              Use audience cards to route people deeper. Keep copy short and CTA visible.
            </p>
          </div>
          <Link href="#top" className="mt-6 md:mt-0 inline-flex items-center rounded-full bg-blue-600 text-white px-5 py-3 font-semibold shadow hover:shadow-md">
            Talk to us
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={c.href} className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md block">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </div>
                <p className="mt-2 text-gray-600">{c.text}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "How do I keep scrolling smooth?",
      a: "Optimise images (next-gen formats), lazy-load below-the-fold assets, and keep animations subtle (60fps where possible).",
    },
    {
      q: "Do I need a heavy animation library?",
      a: "No. Framer Motion for reveals/parallax is enough. Avoid parallax everywhere; one hero or one panel is ideal.",
    },
    {
      q: "Is this accessible?",
      a: "Use semantic tags, visible focus states, alt text, and maintain contrast. Keyboard test your nav & CTAs.",
    },
  ];

  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-6 divide-y">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                {f.q}
                <span className="ml-4 text-xl transition-transform group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-2 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} YourBrand — Learning made delightful.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
