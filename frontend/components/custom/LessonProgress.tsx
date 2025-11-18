import Image from "next/image";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"

type LessonProgressProps = {
    lessonName?: string;
    subTopic?: string;
    LessonProgressValuePercentage?: number;
};

export default function LessonProgress({ lessonName = "Lesson name", subTopic = "Sub topic", LessonProgressValuePercentage = 50 }: LessonProgressProps) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="relative h-48 sm:h-60 md:h-72">
                <Image
                    src="/lessons.png"
                    alt="Lessons cover"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                        {lessonName}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base md:text-lg">
                        {subTopic}
                    </p>
                </div>
            </div>
            <div className="p-4">
                <h1 className="text-xl font-semibold">Lesson Progress</h1>
                <div className="">
                    <AnimatedCircularProgressBar
                        value={LessonProgressValuePercentage}
                        gaugePrimaryColor="rgb(79 70 229)"
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                        className="w-50 h-50"
                    />
                </div>
            </div>
        </div>
    );
}