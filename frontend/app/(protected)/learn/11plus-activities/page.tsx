// app/learn/11plus-video/page.tsx
"use client";

import { useMemo, useState } from "react";
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Play, Clock, Sparkles, Tv } from "lucide-react";

type SubjectId = "all" | "maths" | "english" | "nonverbal" | "verbal";

type VideoLesson = {
  id: string;
  title: string;
  subject: SubjectId;
  levelLabel: string;
  duration: string;
  xp: number;
  difficulty: "Easy" | "Medium" | "Challenging";
  description: string;
  progressPercent: number;
};

const videoLessons: VideoLesson[] = [
  {
    id: "v1",
    title: "Speed Maths: Times Tables Ninja",
    subject: "maths",
    levelLabel: "11+ Core",
    duration: "8 min",
    xp: 40,
    difficulty: "Easy",
    description: "Fun video to boost times tables speed without pressure.",
    progressPercent: 60,
  },
  {
    id: "v2",
    title: "Word Problems: Break the Story Down",
    subject: "maths",
    levelLabel: "11+ Core",
    duration: "12 min",
    xp: 60,
    difficulty: "Medium",
    description: "Step-by-step method for tricky word problems.",
    progressPercent: 10,
  },
  {
    id: "v3",
    title: "English Comprehension: Find the Clues",
    subject: "english",
    levelLabel: "11+ English",
    duration: "10 min",
    xp: 50,
    difficulty: "Medium",
    description: "Learn how to spot key information in passages.",
    progressPercent: 0,
  },
  {
    id: "v4",
    title: "Non-verbal Reasoning: Shape Patterns",
    subject: "nonverbal",
    levelLabel: "11+ NVR",
    duration: "9 min",
    xp: 45,
    difficulty: "Easy",
    description: "See examples of rotations, reflections and missing pieces.",
    progressPercent: 30,
  },
  {
    id: "v5",
    title: "Verbal Reasoning: Synonyms & Antonyms",
    subject: "verbal",
    levelLabel: "11+ VR",
    duration: "11 min",
    xp: 55,
    difficulty: "Medium",
    description: "Build word power for common 11+ question types.",
    progressPercent: 80,
  },
  {
    id: "v6",
    title: "Exam Mindset: Calm & Focused",
    subject: "english",
    levelLabel: "Exam Skills",
    duration: "7 min",
    xp: 35,
    difficulty: "Easy",
    description: "Short mindset session to reduce exam nerves.",
    progressPercent: 0,
  },
];

export default function ElevenPlusVideoLearnPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>("all");

  // fake "continue watching" is the one with highest progress %
  const continueLesson = useMemo(() => {
    return [...videoLessons].sort(
      (a, b) => b.progressPercent - a.progressPercent
    )[0];
  }, []);

  const filteredVideos = useMemo(() => {
    return videoLessons.filter((v) => {
      if (selectedSubject === "all") return true;
      return v.subject === selectedSubject;
    });
  }, [selectedSubject]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Header */}
        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">11+ Video learning</p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Watch, learn, and earn XP for your 11+ prep
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Short, friendly videos for Maths, English, Verbal and Non-verbal
              Reasoning. Like Duolingo, but for 11+ exams.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-slate-50 px-3 py-1 text-xs text-slate-600">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Keep streaks by watching one video a day</span>
          </div>
        </section>

        {/* Continue watching */}
        {continueLesson && (
          <section className="space-y-3">
            <p className="text-xs font-medium uppercase text-slate-500">
              Continue watching
            </p>
            <Card className="overflow-hidden border-0 bg-gradient-to-r from-emerald-50 via-emerald-100/70 to-sky-50 shadow-sm">
              <CardContent className="flex flex-col gap-4 py-5 px-5 md:flex-row md:items-center">
                {/* Video thumbnail placeholder */}
                <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-emerald-200/70 md:w-1/3">
                  <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md">
                    <Play className="h-6 w-6 text-emerald-500" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge
                      variant="outline"
                      className="border-emerald-300 bg-emerald-50 text-emerald-700"
                    >
                      {prettySubject(continueLesson.subject)}
                    </Badge>
                    <Badge
                      className="bg-white/70 text-slate-700 border border-white/60"
                    >
                      {continueLesson.levelLabel}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                      <Clock className="h-3 w-3" />
                      {continueLesson.duration}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold leading-snug">
                    {continueLesson.title}
                  </h2>
                  <p className="text-xs text-slate-600">
                    {continueLesson.description}
                  </p>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Progress</span>
                      <span>{continueLesson.progressPercent}% · {continueLesson.xp} XP</span>
                    </div>
                    <Progress value={continueLesson.progressPercent} />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="text-xs"
                      onClick={() =>
                        console.log("Resume video", continueLesson.id)
                      }
                    >
                      <Play className="mr-1 h-4 w-4" />
                      Resume video
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() =>
                        console.log("View lesson details", continueLesson.id)
                      }
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Subject filter (Duolingo style tabs) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-600">
              Choose a subject
            </p>
            <span className="text-[11px] text-slate-500">
              Tip: rotate through subjects to keep learning balanced.
            </span>
          </div>

          <Tabs
            value={selectedSubject}
            onValueChange={(val) => setSelectedSubject(val as SubjectId)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 bg-slate-50">
              <TabsTrigger value="all" className="text-[11px] flex items-center gap-1">
                <Tv className="h-3 w-3" />
                All
              </TabsTrigger>
              <TabsTrigger value="maths" className="text-[11px]">
                Maths
              </TabsTrigger>
              <TabsTrigger value="english" className="text-[11px]">
                English
              </TabsTrigger>
              <TabsTrigger value="nonverbal" className="text-[11px]">
                Non-verbal
              </TabsTrigger>
              <TabsTrigger value="verbal" className="text-[11px]">
                Verbal
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>

        {/* Video grid */}
        <section className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredVideos.length}
              </span>{" "}
              video{filteredVideos.length === 1 ? "" : "s"}
            </span>
            <span>Tap a video to watch and earn XP.</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}

            {filteredVideos.length === 0 && (
              <div className="col-span-full rounded-xl border border-dashed bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                No videos for this filter yet. Try another subject.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function VideoCard({ video }: { video: VideoLesson }) {
  return (
    <Card className="flex h-full flex-col border bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        {/* Thumbnail row */}
        <div className="mb-3 h-28 w-full overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
            onClick={() => console.log("Play video", video.id)}
          >
            <Play className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Top badges */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <Badge variant="outline" className="text-[10px]">
            {prettySubject(video.subject)}
          </Badge>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="h-3 w-3" />
            {video.duration}
          </span>
        </div>

        <CardTitle className="text-sm leading-snug line-clamp-2">
          {video.title}
        </CardTitle>
        <CardDescription className="mt-1 text-[11px] text-slate-500 line-clamp-2">
          {video.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-2 pb-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
          <span className="rounded-full bg-slate-50 px-2 py-0.5">
            {video.levelLabel}
          </span>
          <span className="rounded-full bg-slate-50 px-2 py-0.5">
            {video.difficulty}
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
            +{video.xp} XP
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span>{video.progressPercent}%</span>
          </div>
          <Progress value={video.progressPercent} />
        </div>

        <div className="flex justify-between items-center pt-1">
          <Button
            size="sm"
            className="text-xs"
            onClick={() => console.log("Play video", video.id)}
          >
            <Play className="mr-1 h-4 w-4" />
            Watch now
          </Button>
          <button
            className="text-[11px] text-slate-500 underline underline-offset-2"
            onClick={() => console.log("Add to playlist", video.id)}
          >
            Save for later
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function prettySubject(subject: SubjectId) {
  switch (subject) {
    case "maths":
      return "Maths";
    case "english":
      return "English";
    case "nonverbal":
      return "Non-verbal";
    case "verbal":
      return "Verbal";
    default:
      return "All";
  }
}
