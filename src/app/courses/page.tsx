import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { courses } from '@/lib/data';
import { PageHeader } from '@/components/layout/header';
import { StarRating } from '@/components/star-rating';
import Image from 'next/image';
import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Courses" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id} className="block">
            <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-t-lg object-cover"
                  data-ai-hint="course cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <div className="flex items-center justify-between w-full">
                  <StarRating rating={course.rating} />
                  <span className="text-sm font-medium text-muted-foreground">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
