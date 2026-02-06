import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { candidates } from '@/lib/data';
import { PageHeader } from '@/components/layout/header';
import { ListFilter, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CandidatesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Candidates" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search candidates..." className="pl-8" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">Senior Frontend Developer</SelectItem>
              <SelectItem value="product">Product Manager</SelectItem>
              <SelectItem value="backend">Backend Engineer (Go)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Stage
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by stage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>Application</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Phone Screen</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Interview</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Offer</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Applied For</TableHead>
              <TableHead>Pipeline Stage</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
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
                <TableCell>
                  <Link href={`/candidates/${candidate.id}`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
