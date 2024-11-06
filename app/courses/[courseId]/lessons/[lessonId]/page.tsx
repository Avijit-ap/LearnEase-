import { courses } from "@/lib/courses";
import LessonComponent from "./lesson-client";

// Static params generation for all course and lesson combinations
export function generateStaticParams() {
  const params = [];
  
  for (const course of courses) {
    for (const lesson of course.lessons) {
      params.push({
        courseId: course.id,
        lessonId: lesson.id,
      });
    }
  }
  
  return params;
}

// Server component that passes params to client component
export default function LessonPage({ params }: { 
  params: { courseId: string; lessonId: string } 
}) {
  return <LessonComponent params={params} />;
}