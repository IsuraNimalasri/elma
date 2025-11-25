export interface Lesson {
  id: string;
  title: string;
  videoUrl?: string; // Placeholder for now
  content: string;
  duration: string;
}

export interface Topic {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  level: string; // e.g., "KS3", "GCSE"
  icon: string; // Emoji or url
  color: string; // Tailwind class for bg
  description?: string;
  topics: Topic[];
}

export const COURSES_DATA: Subject[] = [
  {
    id: "biology",
    title: "Biology",
    level: "KS3",
    icon: "🌱",
    color: "bg-green-100",
    topics: [
      {
        id: "microscopes",
        title: "1.1 - Microscopes",
        lessons: [
          {
            id: "parts-of-light-microscope",
            title: "The different parts of a light microscope",
            content: `
              <p>A light microscope uses lenses to magnify tiny objects. We call the tiny object the 'specimen' when it is being viewed using a microscope.</p>
              <h3 class="font-bold text-lg mt-4 mb-2">The main parts are:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Eyepiece lens</strong> - The lens you look through that initially magnifies the specimen.</li>
                <li><strong>Objective lenses</strong> - These magnify the specimen more, and allow the magnification to be changed.</li>
                <li><strong>Body tube</strong> - This holds the lenses in place.</li>
                <li><strong>Stage</strong> - This supports the slide with the specimen.</li>
                <li><strong>Mirror/light</strong> - These ensure there's enough light to see the specimen.</li>
              </ul>
            `,
            duration: "5 min",
            videoUrl: "https://placehold.co/600x400/png?text=Microscope+Video"
          },
          {
            id: "setup-microscope",
            title: "How to properly set up and use a light microscope",
            content: "<p>Step by step guide on setting up a microscope...</p>",
            duration: "8 min"
          }
        ]
      },
      {
        id: "cells",
        title: "1.2 - Animal & Plant Cells",
        lessons: [
          {
            id: "animal-cells",
            title: "Structure of Animal Cells",
            content: "<p>Animal cells contain a nucleus, cytoplasm, cell membrane, mitochondria and ribosomes.</p>",
            duration: "6 min"
          },
          {
            id: "plant-cells",
            title: "Structure of Plant Cells",
            content: "<p>Plant cells contain all the parts of animal cells, plus a cell wall, vacuole and chloroplasts.</p>",
            duration: "7 min"
          }
        ]
      },
      {
        id: "unicellular",
        title: "1.3 - Unicellular Organisms",
        lessons: [
            {
                id: "amoeba",
                title: "Amoeba",
                content: "<p>Amoeba are unicellular organisms adapted to live in water.</p>",
                duration: "4 min"
            }
        ]
      }
    ]
  },
  {
    id: "chemistry",
    title: "Chemistry",
    level: "KS3",
    icon: "🧪",
    color: "bg-purple-100",
    topics: [
        {
            id: "particles",
            title: "1.1 - Particle Model",
            lessons: [
                {
                    id: "solids-liquids-gases",
                    title: "Solids, Liquids and Gases",
                    content: "<p>Everything is made of particles...</p>",
                    duration: "5 min"
                }
            ]
        }
    ]
  },
  {
      id: "physics",
      title: "Physics",
      level: "KS3",
      icon: "⚡",
      color: "bg-orange-100",
      topics: []
  }
];

export const getSubject = (subjectId: string) => {
  return COURSES_DATA.find(s => s.id.toLowerCase() === subjectId.toLowerCase());
};

export const getLesson = (subjectId: string, topicId: string) => {
    const subject = getSubject(subjectId);
    if (!subject) return null;
    
    // Flatten lessons to find by ID, or we might need a more robust lookup if topicId is actually lessonId
    // In the URL structure courses/[subject]/[topic], [topic] seems to refer to the lesson slug based on previous file content
    // Previous file: <Link href={/courses/${params.subject}/microscopes} ...
    // Wait, in the previous file:
    // AccordionItem value="item-1" -> 1.1 - Microscopes
    // Link href=.../microscopes -> The different parts of a light microscope.
    
    // Correction: The URL structure in previous code was /courses/[subject]/[topic]
    // where [topic] seemed to act as the Lesson ID or Topic ID?
    // Let's clarify: 
    // In the Accordion: "1.1 - Microscopes" (Topic) contains multiple links.
    // Link 1: "The different parts..." -> href `.../microscopes`
    // This implies `microscopes` is the ID for the lesson page? Or is it the topic page?
    // The previous [topic]/page.tsx showed a single lesson content.
    // So `[topic]` in the URL path actually represents a specific LESSON or a TOPIC detail page?
    // The code in [topic]/page.tsx showed "Parts of a light microscope" as the title.
    // So let's assume the URL param `topic` actually maps to a `lessonId` or `topicId` that renders a lesson.
    
    // Let's assume the URL is /courses/[subject]/[lessonId] for simplicity, or [topicId] if a topic has one main page.
    // Based on the content, it looks like a Lesson Page.
    // Let's use a recursive search or flat map.
    
    for (const topic of subject.topics) {
        const lesson = topic.lessons.find(l => l.id === topicId); // Match URL param to lesson ID
        if (lesson) return { subject, topic, lesson };
    }
    return null;
};

