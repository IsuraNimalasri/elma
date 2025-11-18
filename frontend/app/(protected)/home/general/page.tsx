// app/home/page.tsx
"use client";

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
import { Flame, Trophy, Star, TrendingUp } from "lucide-react";

const mockUser = {
  name: "Issan",
  level: 5,
  currentXp: 820,
  nextLevelXp: 1000,
  streakDays: 9,
};

const mockLeaderboard = [
  { rank: 1, name: "Aisha", xp: 1520 },
  { rank: 2, name: "Rahul", xp: 1430 },
  { rank: 3, name: "Mia", xp: 1310 },
  { rank: 7, name: "You", xp: mockUser.currentXp },
];

const mockActivity = [
  { label: "Completed Algebra Quiz", xp: 40, time: "1h ago" },
  { label: "Revised Fractions Module", xp: 25, time: "Yesterday" },
  { label: "Practice Test: Geometry", xp: 60, time: "2 days ago" },
];

const swot = {
  strengths: ["Quick with mental maths", "Good exam time management"],
  weaknesses: ["Struggle with word problems", "Need more practice on geometry proofs"],
  opportunities: ["Upcoming mock exam for practice", "Daily 15-min flashcard session"],
  threats: ["Exam in 3 weeks", "Losing streak breaks your rhythm"],
};

export default function HomePage() {
  const xpPercent = Math.min(
    100,
    Math.round((mockUser.currentXp / mockUser.nextLevelXp) * 100)
  );

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        
        {/* HEADER */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-600">Welcome back 👋</p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Hi {mockUser.name}, ready to boost your exam power?
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Keep your streak alive, gain XP, and climb the ExamBase league.
            </p>
          </div>

          <div className="flex gap-3">
            <Button size="lg">Continue learning</Button>
            <Button variant="outline" size="lg">
              View schedule
            </Button>
          </div>
        </section>

        {/* GRID */}
        <section className="grid gap-6 md:grid-cols-3">
          
          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-4">

            {/* STREAK + XP CARD */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Daily Momentum
                  </CardTitle>
                  <CardDescription>Small daily wins compound big results.</CardDescription>
                </div>

                <Badge className="text-orange-700 bg-orange-100">
                  Streak: {mockUser.streakDays} days
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Level {mockUser.level} • {mockUser.currentXp}/{mockUser.nextLevelXp} XP
                  </p>
                  <Progress value={xpPercent} className="mt-2 h-2" />
                  <p className="mt-1 text-xs text-slate-500">
                    {1000 - mockUser.currentXp} XP to reach Level {mockUser.level + 1}.
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="text-xs uppercase text-slate-500">Today’s focus</p>
                  <p className="mt-1 font-medium">One weak-topic quiz + 10 min revision.</p>
                </div>
              </CardContent>
            </Card>

            {/* TABS: Activity / XP */}
            <Tabs defaultValue="activity" className="w-full">
              <TabsList>
                <TabsTrigger value="activity">Recent activity</TabsTrigger>
                <TabsTrigger value="xp">XP breakdown</TabsTrigger>
              </TabsList>

              {/* Activity */}
              <TabsContent value="activity" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrendingUp className="h-4 w-4" />
                      Your last sessions
                    </CardTitle>
                    <CardDescription>See what gave you XP recently.</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {mockActivity.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border px-3 py-2"
                      >
                        <div>
                          <p className="text-sm">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.time}</p>
                        </div>
                        <Badge>+{item.xp} XP</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* XP Breakdown */}
              <TabsContent value="xp" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Star className="h-4 w-4" />
                      XP Breakdown
                    </CardTitle>
                    <CardDescription>
                      A simple summary of where you earn XP.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-slate-500">Quizzes</p>
                      <p className="text-lg font-semibold">+420 XP</p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-slate-500">Lessons</p>
                      <p className="text-lg font-semibold">+260 XP</p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-slate-500">Mock tests</p>
                      <p className="text-lg font-semibold">+140 XP</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">

            {/* LEADERBOARD CARD */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    ExamBase League
                  </span>
                  <Badge variant="outline">Division 3</Badge>
                </CardTitle>
                <CardDescription>Compete with others and earn XP.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="grid grid-cols-3 text-xs text-slate-500 mb-1">
                  <span>Rank</span>
                  <span>Student</span>
                  <span className="text-right">XP</span>
                </div>

                {mockLeaderboard.map((row) => (
                  <div
                    key={row.rank + row.name}
                    className={`grid grid-cols-3 rounded-lg px-2 py-1.5 text-sm ${
                      row.name === "You" ? "bg-slate-100 font-medium" : ""
                    }`}
                  >
                    <span className="text-xs">#{row.rank}</span>
                    <span>{row.name}</span>
                    <span className="text-right text-xs">{row.xp} XP</span>
                  </div>
                ))}

                <Button variant="outline" size="sm" className="mt-3 w-full">
                  View full leaderboard
                </Button>
              </CardContent>
            </Card>

            {/* SWOT CARD */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Learning SWOT</CardTitle>
                <CardDescription>A simple personal analysis.</CardDescription>
              </CardHeader>

              <CardContent className="grid gap-3 text-xs md:grid-cols-2">
                <div className="rounded-lg border border-emerald-300/40 bg-emerald-50 p-3">
                  <p className="font-semibold text-emerald-700">Strengths</p>
                  <ul className="mt-1 list-disc pl-4 text-emerald-800">
                    {swot.strengths.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-rose-300/40 bg-rose-50 p-3">
                  <p className="font-semibold text-rose-700">Weaknesses</p>
                  <ul className="mt-1 list-disc pl-4 text-rose-800">
                    {swot.weaknesses.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-sky-300/40 bg-sky-50 p-3">
                  <p className="font-semibold text-sky-700">Opportunities</p>
                  <ul className="mt-1 list-disc pl-4 text-sky-800">
                    {swot.opportunities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-amber-300/40 bg-amber-50 p-3">
                  <p className="font-semibold text-amber-700">Threats</p>
                  <ul className="mt-1 list-disc pl-4 text-amber-800">
                    {swot.threats.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
