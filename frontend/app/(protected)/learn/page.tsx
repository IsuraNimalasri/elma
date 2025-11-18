// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function LearnPage() {
//   return (
//     <>
//        <section className="mx-auto max-w-6xl px-6 py-10">
//       <h1 className="text-2xl font-bold">Learn</h1>
//       <p className="mt-2 text-gray-600">Content coming soon.</p>
//     </section>
//     <Link href="/learn/lessons">
//     <Button variant="outline" className="mt-4"> Go to Lessons</Button>
//     </Link>
//     </>
 
    
//   );
// }
// app/learn/page.tsx
"use client";

import { useState, useMemo } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Sparkles } from "lucide-react";

type PathId = "all" | "11plus" | "ks3" | "gcse" | "foundation";
type SubjectId =
  | "all"
  | "english"
  | "maths"
  | "nonverbal"
  | "verbal"
  | "biology"
  | "computerscience"
  | "ai";

type Course = {
  id: string;
  title: string;
  path: PathId;
  subject: SubjectId;
  year: string;
  levelLabel: string;
  durationLabel: string;
  xp: number;
  lessonsCount: number;
  description: string;
};

const courses: Course[] = [
  {
    id: "c1",
    title: "11+ Maths: Speed & Accuracy",
    path: "11plus",
    subject: "maths",
    year: "Year 5",
    levelLabel: "ExamReady · Core",
    durationLabel: "6 weeks",
    xp: 600,
    lessonsCount: 24,
    description: "Build strong mental maths and problem-solving skills for 11+ exams.",
  },
  {
    id: "c2",
    title: "11+ English: Comprehension Booster",
    path: "11plus",
    subject: "english",
    year: "Year 5",
    levelLabel: "ExamReady · Support",
    durationLabel: "4 weeks",
    xp: 420,
    lessonsCount: 16,
    description: "Improve reading, inference and vocabulary with short daily passages.",
  },
  {
    id: "c3",
    title: "Non-verbal Reasoning Patterns",
    path: "11plus",
    subject: "nonverbal",
    year: "Year 4",
    levelLabel: "ExamReady · Starter",
    durationLabel: "3 weeks",
    xp: 300,
    lessonsCount: 12,
    description: "Learn how to spot shapes, rotations and patterns quickly.",
  },
  {
    id: "c4",
    title: "KS3 Science: Biology Foundations",
    path: "ks3",
    subject: "biology",
    year: "Year 7",
    levelLabel: "KS3 · Core",
    durationLabel: "5 weeks",
    xp: 500,
    lessonsCount: 20,
    description: "Cells, organs and ecosystems explained with simple visuals.",
  },
  {
    id: "c5",
    title: "GCSE Computer Science: Logic & Algorithms",
    path: "gcse",
    subject: "computerscience",
    year: "Year 10",
    levelLabel: "GCSE · Core",
    durationLabel: "8 weeks",
    xp: 800,
    lessonsCount: 32,
    description: "From flowcharts to basic Python-style pseudocode and algorithms.",
  },
  {
    id: "c6",
    title: "AI for Teens: Thinking Like a Model",
    path: "gcse",
    subject: "ai",
    year: "Year 10–11",
    levelLabel: "Enrichment",
    durationLabel: "4 weeks",
    xp: 400,
    lessonsCount: 14,
    description: "Intro to AI concepts, bias and how models learn — no heavy maths.",
  },
  {
    id: "c7",
    title: "Maths Confidence Builder",
    path: "foundation",
    subject: "maths",
    year: "Year 4",
    levelLabel: "Foundation",
    durationLabel: "3 weeks",
    xp: 260,
    lessonsCount: 10,
    description: "Gentle course for rebuilding confidence with numbers and arithmetic.",
  },
];

const gradeOptions = [
  "All",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
];

export default function LearnPage() {
  const [selectedPath, setSelectedPath] = useState<PathId>("11plus");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>("all");
  const [selectedYear, setSelectedYear] = useState<string>("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (selectedPath !== "all" && course.path !== selectedPath) return false;
      if (selectedSubject !== "all" && course.subject !== selectedSubject) return false;
      if (selectedYear !== "All" && course.year !== selectedYear) return false;
      return true;
    });
  }, [selectedPath, selectedSubject, selectedYear]);

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Header */}
        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Learn</p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              What do you want to learn today?
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Choose a path, subject and year group. Each course is broken into small,
              exam-focused steps with XP and streak support.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-slate-50 px-3 py-1 text-xs text-slate-600">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Built for ExamBase learners</span>
          </div>
        </section>

        {/* Filters */}
        <section className="space-y-3 rounded-xl border bg-slate-50/60 px-4 py-4">
          <p className="text-xs font-medium text-slate-600">Filter courses</p>

          <div className="grid gap-3 md:grid-cols-3">
            {/* Path tabs */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase text-slate-500">Path</p>
              <Tabs
                value={selectedPath}
                onValueChange={(val) => setSelectedPath(val as PathId)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 bg-white">
                  <TabsTrigger value="11plus" className="text-xs">
                    11+
                  </TabsTrigger>
                  <TabsTrigger value="ks3" className="text-xs">
                    KS3
                  </TabsTrigger>
                  <TabsTrigger value="gcse" className="text-xs">
                    GCSE
                  </TabsTrigger>
                  <TabsTrigger value="foundation" className="text-xs">
                    Foundation
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Subject select */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase text-slate-500">Subject</p>
              <Select
                value={selectedSubject}
                onValueChange={(val) => setSelectedSubject(val as SubjectId)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="All subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All subjects</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="maths">Mathematics</SelectItem>
                  <SelectItem value="nonverbal">Non-verbal reasoning</SelectItem>
                  <SelectItem value="verbal">Verbal reasoning</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="computerscience">Computer Science</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year / grade select */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase text-slate-500">Year / Grade</p>
              <Select
                value={selectedYear}
                onValueChange={(val) => setSelectedYear(val)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Result summary */}
        <section className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <span className="font-semibold text-slate-700">{filteredCourses.length}</span>{" "}
            course{filteredCourses.length === 1 ? "" : "s"}
          </span>
          <span>Courses are sorted by relevance to your path and subject.</span>
        </section>

        {/* Course cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              No courses match this combination yet. Try changing path, subject or year.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex h-full flex-col border bg-white shadow-sm">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[10px]">
            {prettyPath(course.path)}
          </Badge>
          <Badge className="bg-slate-100 text-slate-700 border-none text-[10px]">
            {course.year}
          </Badge>
        </div>
        <CardTitle className="text-sm md:text-base flex items-start gap-1">
          <BookOpen className="mt-0.5 h-4 w-4 text-slate-400" />
          <span>{course.title}</span>
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto space-y-3 pt-0 pb-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className="rounded-full bg-slate-50 px-2 py-0.5">
            {course.levelLabel}
          </span>
          <span className="rounded-full bg-slate-50 px-2 py-0.5">
            {course.durationLabel}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-600">
          <span>
            {course.lessonsCount} lessons · {course.xp} XP
          </span>
          <Button
            size="sm"
            className="text-xs"
            onClick={() => console.log("Start course", course.id)}
          >
            Start course
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function prettyPath(path: PathId): string {
  switch (path) {
    case "11plus":
      return "11+ ExamReady";
    case "ks3":
      return "KS3 Pathway";
    case "gcse":
      return "GCSE Pathway";
    case "foundation":
      return "Foundation";
    default:
      return "Path";
  }
}


