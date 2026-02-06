import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Briefcase,
  Users,
  FileText,
  DollarSign,
  BarChart,
  LineChart,
} from 'lucide-react';
import { candidates, jobs, courses } from '@/lib/data';
import Image from 'next/image';
import { PageHeader } from '@/components/layout/header';

export default function DashboardPage() {
  const openJobs = jobs.filter((job) => job.status === 'Open').length;
  const totalCandidates = candidates.length;
  const interviewsToday = 5; // mock data
  const newApplicants = candidates.slice(0, 5);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Dashboard" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openJobs}</div>
            <p className="text-xs text-muted-foreground">
              Total open job requisitions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Candidates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalCandidates}</div>
            <p className="text-xs text-muted-foreground">
              In the hiring pipeline
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Interviews Today
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{interviewsToday}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78,500</div>
            <p className="text-xs text-muted-foreground">
              Across all open positions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>
              The latest candidates to apply.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Applied For</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newApplicants.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={candidate.avatarUrl}
                            alt={candidate.name}
                          />
                          <AvatarFallback>
                            {candidate.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {candidate.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.appliedFor}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{candidate.pipelineStage}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Featured Courses</CardTitle>
            <CardDescription>
              Enhance your team's skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {courses.map((course, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-full"
                  >
                    <div className="p-1">
                      <Card>
                        <div className="relative h-40 w-full">
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
                          <CardTitle className="text-lg">
                            {course.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {course.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
