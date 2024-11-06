"use client";

import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/lib/courses";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const loadProgress = async () => {
      const userProgress = await db.getProgress(user.id);
      setProgress(userProgress);
    };

    loadProgress();
  }, [user, router]);

  const getCourseProgress = (courseId: string) => {
    const courseProgress = progress.filter((p) => p.courseId === courseId);
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;
    return (courseProgress.length / course.lessons.length) * 100;
  };

  const totalProgress =
    courses.reduce((acc, course) => acc + getCourseProgress(course.id), 0) /
    courses.length;

  const earnedBadges = [
    {
      name: "Fast Learner",
      description: "Completed first lesson",
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      name: "Achievement Hunter",
      description: "Completed first course",
      icon: <Award className="h-8 w-8" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>
              Welcome back, {user?.name || "Learner"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Overall Progress</h3>
              <Progress value={totalProgress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round(totalProgress)}% Complete
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => {
                  const progressValue = getCourseProgress(course.id);
                  return (
                    <div key={course.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {course.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(progressValue)}%
                        </span>
                      </div>
                      <Progress value={progressValue} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {earnedBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 bg-muted rounded-lg"
                  >
                    <div className="mb-2">{badge.icon}</div>
                    <h4 className="font-medium">{badge.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}