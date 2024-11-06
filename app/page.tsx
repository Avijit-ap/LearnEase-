import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Palette } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Interactive Learning",
      description: "Learn through hands-on exercises and real-world projects",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Structured Curriculum",
      description: "Follow a carefully designed path to master web development",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Practice & Feedback",
      description: "Test your knowledge with quizzes and get instant feedback",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
          Master Web Development
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start your journey to becoming a professional web developer with our
          interactive learning platform.
        </p>
        <div className="mt-8">
          <Link href="/courses">
            <Button size="lg" className="mr-4">
              Browse Courses
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Start Learning?</h2>
        <Link href="/courses">
          <Button size="lg">View All Courses</Button>
        </Link>
      </div>
    </div>
  );
}