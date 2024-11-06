"use client";

import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/lib/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Courses() {
  const { user } = useAuth();
  const router = useRouter();

  // if (!user) {
  //   router.push("/login");
  //   return null;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <Link href={`/courses/${course.id}`}>
                <Button className="w-full">Start Learning</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}