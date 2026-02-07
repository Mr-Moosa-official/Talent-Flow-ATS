import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { reviews } from '@/lib/data';
import { PageHeader } from '@/components/layout/header';
import { StarRating } from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Reviews" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    review.category === 'Project'
                      ? 'default'
                      : review.category === 'Course'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {review.category}
                </Badge>
                <StarRating rating={review.rating} size={16} />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex gap-4">
                <Quote className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-foreground">{review.content}</p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-3 pt-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.authorAvatar} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{review.author}</p>
                <p className="text-xs text-muted-foreground">
                  {review.createdAt}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
