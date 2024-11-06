import { courses } from "@/lib/courses";
import CourseComponent from "./course-client";

// Static params generation
export function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id,
  }));
}

// Server component that passes params to client component
export default function CoursePage({ params }: { params: { courseId: string } }) {
  return <CourseComponent params={params} />;
}