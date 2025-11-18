// app/parent/page.tsx
"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Flame,
  AlertTriangle,
  CheckCircle2,
  User,
} from "lucide-react";

// ECharts must be loaded on the client only
const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
});

type Child = {
  id: string;
  name: string;
  age: number;
  year: string;
  exam: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  status: "on-track" | "needs-support" | "great";
  nextActivity: string;
  note: string;
};

const children: Child[] = [
  {
    id: "kid-1",
    name: "Rafi",
    age: 11,
    year: "Year 6",
    exam: "11+ Grammar",
    level: 4,
    xp: 540,
    nextLevelXp: 700,
    streakDays: 6,
    status: "great",
    nextActivity: "Mock test: Maths (30 min)",
    note: "Doing really well with mental maths and times tables.",
  },
  {
    id: "kid-2",
    name: "Mila",
    age: 10,
    year: "Year 5",
    exam: "11+ Independent",
    level: 3,
    xp: 310,
    nextLevelXp: 500,
    streakDays: 2,
    status: "on-track",
    nextActivity: "Verbal reasoning practice (15 min)",
    note: "Good reader, needs gentle push to keep streak going.",
  },
  {
    id: "kid-3",
    name: "Jonas",
    age: 9,
    year: "Year 4",
    exam: "Pre-11+ foundations",
    level: 2,
    xp: 120,
    nextLevelXp: 300,
    streakDays: 0,
    status: "needs-support",
    nextActivity: "Fun maths game (10 min)",
    note: "Had a break this week – a short, fun session is enough.",
  },
];

// subjects for radar & bar charts
const radarSubjects = [
  "English",
  "Mathematics",
  "Non-verbal",
  "Verbal",
  "Biology",
  "Computer Science",
  "AI",
];

// mock subject scores (0–100) for each child
const subjectScores: Record<string, number[]> = {
  "kid-1": [78, 92, 70, 80, 60, 75, 55],
  "kid-2": [85, 70, 68, 88, 62, 65, 50],
  "kid-3": [60, 58, 55, 52, 40, 45, 30],
};

// mock total XP split by activity type for each child
const activityXp: Record<
  string,
  { lessons: number; quizzes: number; mocks: number }
> = {
  "kid-1": { lessons: 260, quizzes: 190, mocks: 90 },
  "kid-2": { lessons: 180, quizzes: 90, mocks: 40 },
  "kid-3": { lessons: 80, quizzes: 25, mocks: 15 },
};

// mock XP per subject per activity type for each child
// This feeds the bar chart (stacked bars per subject)
const subjectActivityXp: Record<
  string,
  Record<
    string,
    {
      lessons: number;
      quizzes: number;
      mocks: number;
    }
  >
> = {
  "kid-1": {
    English: { lessons: 40, quizzes: 25, mocks: 10 },
    Mathematics: { lessons: 80, quizzes: 70, mocks: 30 },
    "Non-verbal": { lessons: 30, quizzes: 20, mocks: 10 },
    Verbal: { lessons: 35, quizzes: 25, mocks: 10 },
    Biology: { lessons: 25, quizzes: 10, mocks: 5 },
    "Computer Science": { lessons: 30, quizzes: 20, mocks: 10 },
    AI: { lessons: 20, quizzes: 20, mocks: 15 },
  },
  "kid-2": {
    English: { lessons: 45, quizzes: 20, mocks: 8 },
    Mathematics: { lessons: 50, quizzes: 25, mocks: 10 },
    "Non-verbal": { lessons: 25, quizzes: 18, mocks: 6 },
    Verbal: { lessons: 35, quizzes: 30, mocks: 8 },
    Biology: { lessons: 20, quizzes: 10, mocks: 4 },
    "Computer Science": { lessons: 25, quizzes: 15, mocks: 6 },
    AI: { lessons: 15, quizzes: 8, mocks: 4 },
  },
  "kid-3": {
    English: { lessons: 20, quizzes: 5, mocks: 2 },
    Mathematics: { lessons: 25, quizzes: 8, mocks: 3 },
    "Non-verbal": { lessons: 10, quizzes: 4, mocks: 2 },
    Verbal: { lessons: 10, quizzes: 4, mocks: 1 },
    Biology: { lessons: 5, quizzes: 2, mocks: 1 },
    "Computer Science": { lessons: 6, quizzes: 2, mocks: 1 },
    AI: { lessons: 4, quizzes: 1, mocks: 0 },
  },
};

export default function ParentHomePage() {
  const totalKids = children.length;
  const onTrackCount = children.filter(
    (c) => c.status === "on-track" || c.status === "great"
  ).length;
  const needsSupportCount = children.filter(
    (c) => c.status === "needs-support"
  ).length;

  // selected child for advanced analytics
  const [selectedChildId, setSelectedChildId] = useState<string>("kid-1");

  // Radar chart (subject scores)
  const radarOption = useMemo(() => {
    const child = children.find((c) => c.id === selectedChildId);
    if (!child) return {};

    const scores = subjectScores[selectedChildId] || [];

    return {
      tooltip: { trigger: "item" },
      legend: {
        data: [child.name],
      },
      radar: {
        indicator: radarSubjects.map((name) => ({
          name,
          max: 100,
        })),
        radius: "65%",
        splitNumber: 4,
        splitLine: {
          lineStyle: {
            color: ["#e5e7eb"],
          },
        },
        splitArea: {
          areaStyle: {
            color: ["#ffffff", "#f9fafb"],
          },
        },
        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: scores,
              name: child.name,
              areaStyle: { opacity: 0.25 },
              lineStyle: { width: 2 },
              symbol: "circle",
              symbolSize: 4,
            },
          ],
        },
      ],
    };
  }, [selectedChildId]);

  // Activity split (lessons / quizzes / mocks)
  const activity = activityXp[selectedChildId] || {
    lessons: 0,
    quizzes: 0,
    mocks: 0,
  };

  const activityTotal =
    activity.lessons + activity.quizzes + activity.mocks || 1;

  const lessonsPct = Math.round((activity.lessons / activityTotal) * 100);
  const quizzesPct = Math.round((activity.quizzes / activityTotal) * 100);
  const mocksPct = Math.round((activity.mocks / activityTotal) * 100);

  // Bar chart (XP per subject split by activity type)
  const barOption = useMemo(() => {
    const map = subjectActivityXp[selectedChildId];
    if (!map) return {};

    const subjects = radarSubjects;
    const lessonsData = subjects.map(
      (subj) => map[subj]?.lessons ?? 0
    );
    const quizzesData = subjects.map(
      (subj) => map[subj]?.quizzes ?? 0
    );
    const mocksData = subjects.map(
      (subj) => map[subj]?.mocks ?? 0
    );

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: ["Lessons", "Quizzes", "Mocks"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: subjects,
        axisLabel: {
          fontSize: 10,
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
        name: "XP",
      },
      series: [
        {
          name: "Lessons",
          type: "bar",
          stack: "xp",
          emphasis: { focus: "series" },
          data: lessonsData,
        },
        {
          name: "Quizzes",
          type: "bar",
          stack: "xp",
          emphasis: { focus: "series" },
          data: quizzesData,
        },
        {
          name: "Mocks",
          type: "bar",
          stack: "xp",
          emphasis: { focus: "series" },
          data: mocksData,
        },
      ],
    };
  }, [selectedChildId]);

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
        {/* Top header */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-600">Parent dashboard</p>
            <h1 className="text-2xl font-semibold tracking-tight">
              See how your children are progressing
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Quick overview of streaks, effort, and what&apos;s coming up next.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="rounded-full bg-white px-3 py-1 shadow-sm border">
              {totalKids} children connected
            </div>
            <div className="rounded-full bg-white px-3 py-1 shadow-sm border flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{onTrackCount} on track</span>
            </div>
            {needsSupportCount > 0 && (
              <div className="rounded-full bg-amber-50 px-3 py-1 shadow-sm border border-amber-200 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>{needsSupportCount} may need support</span>
              </div>
            )}
          </div>
        </header>

        {/* Main content: overview + per-child cards */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          {/* LEFT SIDE: per-child cards */}
          <div className="space-y-4">
            <Tabs defaultValue={children[0]?.id || "all"} className="w-full">
              <TabsList className="bg-white">
                {children.map((child) => (
                  <TabsTrigger
                    key={child.id}
                    value={child.id}
                    className="text-xs md:text-sm"
                  >
                    {child.name}
                  </TabsTrigger>
                ))}
                <TabsTrigger value="all" className="text-xs md:text-sm">
                  All children
                </TabsTrigger>
              </TabsList>

              {children.map((child) => {
                const xpPercent = Math.round(
                  (child.xp / child.nextLevelXp) * 100
                );

                return (
                  <TabsContent key={child.id} value={child.id} className="mt-3">
                    <Card className="border bg-white shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                            <User className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {child.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {child.year} • {child.exam}
                            </CardDescription>
                          </div>
                        </div>
                        <ChildStatusBadge status={child.status} />
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* XP + streak row */}
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="md:col-span-2">
                            <p className="text-xs text-slate-500">
                              Level {child.level} • {child.xp}/
                              {child.nextLevelXp} XP
                            </p>
                            <Progress value={xpPercent} className="mt-1.5 h-2" />
                            <p className="mt-1 text-[11px] text-slate-500">
                              {child.nextLevelXp - child.xp} XP to reach the
                              next level.
                            </p>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <div className="text-right">
                              <p className="text-sm font-semibold">
                                {child.streakDays} days
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Current streak
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Next activity + note */}
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="rounded-lg border bg-slate-50 px-3 py-2">
                            <p className="text-[11px] font-semibold uppercase text-slate-500">
                              Suggested next step
                            </p>
                            <p className="mt-1 text-sm text-slate-800">
                              {child.nextActivity}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-slate-50 px-3 py-2">
                            <p className="text-[11px] font-semibold uppercase text-slate-500">
                              Quick note
                            </p>
                            <p className="mt-1 text-xs text-slate-700">
                              {child.note}
                            </p>
                          </div>
                        </div>

                        {/* Parent actions */}
                        <div className="flex flex-wrap gap-2 pt-1 text-xs">
                          <Button
                            size="sm"
                            onClick={() =>
                              console.log(
                                "Open detailed report for",
                                child.name
                              )
                            }
                          >
                            View detailed report
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              console.log(
                                "Send encouragement to",
                                child.name
                              )
                            }
                          >
                            Send encouragement
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}

              {/* All children tab – summary */}
              <TabsContent value="all" className="mt-3">
                <Card className="border bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Summary for all children
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Quick comparison of levels, streaks, and status.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <div className="grid grid-cols-[1.2fr_0.5fr_0.6fr_0.6fr_0.7fr] font-semibold text-slate-500">
                      <span>Child</span>
                      <span className="text-center">Level</span>
                      <span className="text-center">XP</span>
                      <span className="text-center">Streak</span>
                      <span className="text-center">Status</span>
                    </div>
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className="grid grid-cols-[1.2fr_0.5fr_0.6fr_0.6fr_0.7fr] items-center rounded-lg px-2 py-1.5 hover:bg-slate-50"
                      >
                        <span className="text-slate-700 text-xs">
                          {child.name} • {child.year}
                        </span>
                        <span className="text-center text-slate-700">
                          {child.level}
                        </span>
                        <span className="text-center text-slate-700">
                          {child.xp}
                        </span>
                        <span className="text-center text-slate-700">
                          {child.streakDays}d
                        </span>
                        <span className="flex justify-center">
                          <ChildStatusBadge status={child.status} small />
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT SIDE: simple parent overview */}
          <div className="space-y-4">
            {/* Tonight suggestion */}
            <Card className="border bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  Tonight&apos;s simple plan
                </CardTitle>
                <CardDescription className="text-xs">
                  One small step for each child. 30–40 minutes total.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">{children[0].name}:</span>{" "}
                    Finish {children[0].nextActivity.toLowerCase()}.
                  </li>
                  <li>
                    <span className="font-semibold">{children[1].name}:</span>{" "}
                    Short verbal reasoning session and keep streak alive.
                  </li>
                  <li>
                    <span className="font-semibold">{children[2].name}:</span>{" "}
                    Just the fun maths game – keep it light and positive.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Attention box */}
            <Card className="border bg-amber-50/80 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Who might need extra support?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-800">
                {children
                  .filter((c) => c.status === "needs-support")
                  .map((child) => (
                    <div
                      key={child.id}
                      className="rounded-lg border border-amber-200 bg-white/70 px-3 py-2"
                    >
                      <p>
                        <span className="font-semibold">{child.name}</span>{" "}
                        hasn&apos;t practised much this week.
                      </p>
                      <p className="mt-1 text-[11px] text-slate-600">
                        Try a short, pressure-free session and praise effort, not
                        score.
                      </p>
                    </div>
                  ))}
                {needsSupportCount === 0 && (
                  <p className="text-xs text-slate-700">
                    Everyone looks fine right now. A small, calm study block is
                    enough.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Parent info */}
            <Card className="border bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Parent tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-600">
                <ul className="list-disc space-y-1 pl-4">
                  <li>Keep sessions short and regular rather than long and rare.</li>
                  <li>Celebrate effort and streaks more than scores.</li>
                  <li>
                    One quiet study slot for all kids often works better than three
                    separate battles.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced analytics panel with radar + radial chips + bar chart */}
        <section className="mt-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="analytics">
              <AccordionTrigger className="text-sm font-semibold">
                Advanced analytics (for parents who want deeper insight)
              </AccordionTrigger>
              <AccordionContent>
                <Card className="mt-2 border bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Strengths & focus areas by subject
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Radar chart shows subject scores. XP charts show how
                      learning time is split between lessons, quizzes and mock
                      exams for each subject.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Top row: select + CTA */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <p className="font-medium text-slate-700">
                          Choose a child & see subject strengths
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Radar shape shows where they&apos;re strongest and
                          where they may need help.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs"
                          value={selectedChildId}
                          onChange={(e) => setSelectedChildId(e.target.value)}
                        >
                          {children.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>

                        {/* CTA button */}
                        <Button
                          size="sm"
                          className="text-xs"
                          onClick={() =>
                            console.log(
                              "Open full analytics report for",
                              selectedChildId
                            )
                          }
                        >
                          Open full analytics report
                        </Button>
                      </div>
                    </div>

                    {/* Middle row: radar + radial XP chips */}
                    <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
                      {/* Radar chart */}
                      <div className="h-72 w-full">
                        <ReactECharts
                          option={radarOption}
                          style={{ height: "100%", width: "100%" }}
                        />
                      </div>

                      {/* XP by activity type – radial chips */}
                      <div className="space-y-3">
                        <p className="text-xs font-medium text-slate-700">
                          XP split by activity type
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Shows where most of their learning time is spent:
                          lessons, quizzes or mock exams.
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <RadialXpChip
                            label="Lessons"
                            xp={activity.lessons}
                            percent={lessonsPct}
                          />
                          <RadialXpChip
                            label="Quizzes"
                            xp={activity.quizzes}
                            percent={quizzesPct}
                          />
                          <RadialXpChip
                            label="Mocks"
                            xp={activity.mocks}
                            percent={mocksPct}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bar chart: XP per subject by activity type */}
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-slate-700">
                        XP per subject split by lessons, quizzes & mocks
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Each bar shows total XP for a subject, coloured by how
                        much comes from lessons, quizzes and mock exams.
                      </p>
                      <div className="h-80 w-full">
                        <ReactECharts
                          option={barOption}
                          style={{ height: "100%", width: "100%" }}
                        />
                      </div>
                    </div>

                    {/* Bottom hint */}
                    <p className="text-[11px] text-slate-500">
                      Parent tip: if a subject has low radar score and the bar is
                      mostly quiz XP, add more lesson time. If it has strong
                      radar score but almost no mock XP, try more timed practice
                      so they feel exam-ready.
                    </p>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </main>
  );
}

/* Status badge helper */

function ChildStatusBadge({
  status,
  small,
}: {
  status: Child["status"];
  small?: boolean;
}) {
  const sizeClasses = small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]";
  if (status === "great") {
    return (
      <Badge
        className={`${sizeClasses} bg-emerald-50 text-emerald-700 border border-emerald-200`}
      >
        Doing great
      </Badge>
    );
  }
  if (status === "on-track") {
    return (
      <Badge
        className={`${sizeClasses} bg-sky-50 text-sky-700 border border-sky-200`}
      >
        On track
      </Badge>
    );
  }
  return (
    <Badge
      className={`${sizeClasses} bg-amber-50 text-amber-700 border border-amber-200`}
    >
      Needs support
    </Badge>
  );
}

/* Radial XP chip helper */

function RadialXpChip({
  label,
  xp,
  percent,
}: {
  label: string;
  xp: number;
  percent: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-24 w-24 rounded-full border border-slate-200 bg-slate-50 shadow-sm">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{xp}</span>
      <span className="text-[10px] text-slate-500">{percent}% of XP</span>
    </div>
  );
}
