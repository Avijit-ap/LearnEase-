"use client";

import { useAuth } from "@/hooks/use-auth";
import { courses, type Quiz } from "@/lib/courses";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";

export default function Lesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const course = courses.find((c) => c.id === params.courseId);
  const lesson = course?.lessons.find((l) => l.id === params.lessonId);

  if (!course || !lesson) {
    return <div>Lesson not found</div>;
  }

  const handleQuizSubmit = async () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === lesson.quiz.correctAnswer) {
      await db.saveProgress(user!.id, course.id, lesson.id);
      toast({
        title: "Congratulations!",
        description: "You've completed this lesson successfully.",
      });

      // Find next lesson
      const currentIndex = course.lessons.findIndex((l) => l.id === lesson.id);
      const nextLesson = course.lessons[currentIndex + 1];

      if (nextLesson) {
        router.push(`/courses/${course.id}/lessons/${nextLesson.id}`);
      } else {
        router.push(`/courses/${course.id}`);
      }
    } else {
      toast({
        title: "Incorrect Answer",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {!showQuiz ? (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
            <Button
              onClick={() => setShowQuiz(true)}
              className="mt-8"
              size="lg"
            >
              Take Quiz
            </Button>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Lesson Quiz</CardTitle>
              <CardDescription>
                Complete this quiz to proceed to the next lesson
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {lesson.quiz.question}
                  </h3>
                  <RadioGroup
                    value={selectedAnswer?.toString()}
                    onValueChange={(value) => setSelectedAnswer(Number(value))}
                  >
                    {lesson.quiz.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`r${index}`} />
                        <Label htmlFor={`r${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}