"use client";

import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/lib/courses";
import { db, type UserProgress } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { redirect } from 'next/navigation';

export default function CourseComponent({ params }: { params: { courseId: string } }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);

  const course = courses.find((c) => c.id === params.courseId);
  useEffect(() => {
    if (!user) {
      redirect('/login');
      return;
    }
  
    const loadProgress = async () => {
      if (user) {
        const userProgress = await db.getProgress(user.id);
        setProgress(userProgress);
      }
    };
  
    loadProgress();
  }, [user]);

  if (!course) {
    return <div>Course not found</div>;
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(
      (p) => p.courseId === course.id && p.lessonId === lessonId
    );
  };

  const canAccessLesson = (index: number) => {
    if (index === 0) return true;
    return isLessonCompleted(course.lessons[index - 1].id);
  };

  const completionPercentage =
    (progress.filter((p) => p.courseId === course.id).length /
      course.lessons.length) *
    100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-muted-foreground mb-4">{course.description}</p>
        <div className="flex items-center gap-4">
          <Progress value={completionPercentage} className="flex-1" />
          <span className="text-sm text-muted-foreground">
            {Math.round(completionPercentage)}% Complete
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {course.lessons.map((lesson, index) => {
          const isCompleted = isLessonCompleted(lesson.id);
          const canAccess = canAccessLesson(index);

          return (
            <Card key={lesson.id} className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isCompleted && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {!canAccess && <Lock className="h-5 w-5" />}
                  {lesson.title}
                </CardTitle>
                <CardDescription>Lesson {index + 1}</CardDescription>
              </CardHeader>
              <CardContent>
                {canAccess ? (
                  <Link
                    href={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="block"
                  >
                    <Button variant={isCompleted ? "secondary" : "default"}>
                      {isCompleted ? "Review Lesson" : "Start Lesson"}
                    </Button>
                  </Link>
                ) : (
                  <Button disabled>Locked</Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
