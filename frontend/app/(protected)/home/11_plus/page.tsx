// app/homepage2/page.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Star, Clock, BookOpen } from "lucide-react";

const kidUser = {
  name: "Rafi",
  level: 3,
  xp: 420,
  nextLevelXp: 600,
  streakDays: 4,
};

const upNext = {
  pathLabel: "11+ Maths • Practice",
  title: "Speed & Accuracy with Mental Maths",
  duration: "20 minutes",
  ctaLabel: "Start practice",
};

const stayOnTrackCards = [
  {
    type: "Quiz",
    title: "Fractions & Decimals",
    description: "Quick 10-question quiz to boost your confidence.",
  },
  {
    type: "Lesson",
    title: "Verbal Reasoning Patterns",
    description: "Learn common patterns that appear in 11+ exams.",
  },
  {
    type: "Game",
    title: "Times-Table Sprint",
    description: "Beat the clock and keep your streak alive.",
  },
];

const progress = {
  quizzes: 5,
  lessons: 8,
  games: 3,
  mockTests: 1,
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ElevenPlusHomePage() {
  const xpPercent = Math.round((kidUser.xp / kidUser.nextLevelXp) * 100);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">

        {/* Simple top header (you can replace with your global header) */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hi {kidUser.name}, let&apos;s get exam-ready 🎯
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-full bg-white px-3 py-1 shadow-sm border">
              Level {kidUser.level} · {kidUser.xp}/{kidUser.nextLevelXp} XP
            </div>
            <div className="rounded-full bg-white px-3 py-1 shadow-sm border flex items-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>{kidUser.streakDays}-day streak</span>
            </div>
          </div>
        </header>

        {/* Main grid: left (content) / right (streaks + stats) */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Up next */}
            <div>
              <h2 className="mb-3 text-lg font-semibold">Up next</h2>
              <Card className="overflow-hidden border-0 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-sm">
                <CardContent className="flex flex-col gap-4 py-5 px-5 md:flex-row md:items-center">
                  {/* Illustration placeholder */}
                  <div className="flex h-32 w-full items-center justify-center rounded-xl bg-amber-100/70 md:w-2/5">
                    <BookOpen className="h-10 w-10 text-amber-600" />
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-xs font-medium uppercase text-amber-700">
                      {upNext.pathLabel}
                    </p>
                    <h3 className="text-lg font-semibold leading-snug">
                      {upNext.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{upNext.duration}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <Button size="sm">{upNext.ctaLabel}</Button>
                      <button className="text-xs text-slate-600 underline underline-offset-2">
                        Choose something else
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stay on track */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Stay on track</h2>
              <Tabs defaultValue="activities" className="w-full">
                <TabsList className="bg-white">
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                  <TabsTrigger value="favourites">Favourites</TabsTrigger>
                </TabsList>

                <TabsContent value="activities" className="mt-3">
                  <div className="grid gap-4 md:grid-cols-3">
                    {stayOnTrackCards.map((card) => (
                      <Card
                        key={card.title}
                        className="h-full border border-slate-200 bg-white shadow-sm"
                      >
                        <CardContent className="flex h-full flex-col gap-2 py-4 px-4">
                          <Badge
                            variant="outline"
                            className="w-fit border-slate-200 bg-slate-50 text-[11px]"
                          >
                            {card.type}
                          </Badge>
                          <h3 className="text-sm font-semibold leading-snug">
                            {card.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            {card.description}
                          </p>
                          <div className="mt-auto pt-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              Start
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Simple placeholders so the layout feels complete */}
                <TabsContent value="topics" className="mt-3">
                  <Card className="border border-dashed">
                    <CardContent className="py-6 text-sm text-slate-500">
                      Topic view coming soon: show Maths, English, Verbal & Non-Verbal
                      Reasoning with progress bars.
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="favourites" className="mt-3">
                  <Card className="border border-dashed">
                    <CardContent className="py-6 text-sm text-slate-500">
                      Favourite activities your learner has starred will appear here.
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            {/* Streaks */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Streaks</h2>
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardContent className="space-y-4 py-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-slate-900">
                        {kidUser.streakDays}
                      </span>
                      <span className="text-xs text-slate-500">
                        day current streak
                      </span>
                    </div>
                    <Flame className="h-5 w-5 text-orange-500" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    {weekDays.map((day, idx) => {
                      const completed = idx < kidUser.streakDays;
                      return (
                        <div
                          key={day}
                          className="flex flex-col items-center gap-1"
                        >
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                              completed
                                ? "border-orange-400 bg-orange-50 text-orange-700"
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            {completed ? "★" : ""}
                          </span>
                          <span>{day}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Achievements</h2>
                <button className="text-xs text-sky-600 underline underline-offset-2">
                  View all
                </button>
              </div>
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardContent className="flex flex-col gap-3 py-4 px-5 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>First 3-day streak unlocked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Finished 5 quizzes this week</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    More badges will appear as the learner practises.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Progress</h2>
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardContent className="space-y-4 py-4 px-5">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">
                      Towards Level {kidUser.level + 1}
                    </p>
                    <Progress value={xpPercent} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <StatPill label="Quizzes" value={progress.quizzes} />
                    <StatPill label="Lessons" value={progress.lessons} />
                    <StatPill label="Games" value={progress.games} />
                    <StatPill label="Mock tests" value={progress.mockTests} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type StatPillProps = {
  label: string;
  value: number;
};

function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="flex items-center justify-between rounded-full border bg-slate-50 px-3 py-2">
      <span className="text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}
