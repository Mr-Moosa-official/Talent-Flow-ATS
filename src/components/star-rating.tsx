import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = totalStars - Math.ceil(rating);

  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          fill="currentColor"
          className="text-yellow-400"
          size={size}
        />
      ))}
      {partialStar > 0 && (
        <div className="relative">
          <Star
            fill="currentColor"
            className="text-gray-300"
            size={size}
          />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star
              fill="currentColor"
              className="text-yellow-400"
              size={size}
            />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          fill="currentColor"
          className="text-gray-300"
          size={size}
        />
      ))}
    </div>
  );
}
