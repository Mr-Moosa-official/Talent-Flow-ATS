import type { Job, Candidate, Project, Review, Course } from './types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    salaryRange: '$120,000 - $150,000',
    status: 'Open',
    description: 'We are looking for an experienced Frontend Developer to join our team...',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    salaryRange: '$130,000 - $160,000',
    status: 'Open',
    description: 'Seeking a talented Product Manager to guide our product strategy...',
    requiredSkills: ['Agile', 'Roadmapping', 'User Research']
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    salaryRange: '$100,000 - $130,000',
    status: 'Closed',
    description: 'Join our design team to create beautiful and intuitive user experiences...',
    requiredSkills: ['Figma', 'Sketch', 'Prototyping']
  },
  {
    id: '4',
    title: 'Backend Engineer (Go)',
    department: 'Engineering',
    location: 'Remote',
    salaryRange: '$140,000 - $170,000',
    status: 'Open',
    description: 'We are hiring a Backend Engineer with expertise in Go to build scalable microservices...',
    requiredSkills: ['Go', 'Kubernetes', 'gRPC', 'PostgreSQL']
  },
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '123-456-7890',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
    pipelineStage: 'Interview',
    appliedFor: 'Senior Frontend Developer',
    experience: ['5 years at TechCorp as Frontend Dev', '2 years at WebSolutions'],
    skills: ['React', 'TypeScript', 'GraphQL'],
    education: ['B.S. in Computer Science, University of Technology'],
  },
  {
    id: '2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    phone: '234-567-8901',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob',
    pipelineStage: 'Phone Screen',
    appliedFor: 'Product Manager',
    experience: ['3 years as Product Owner at Innovate Inc.'],
    skills: ['Agile', 'JIRA', 'Market Analysis'],
    education: ['MBA, Business School of America'],
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    phone: '345-678-9012',
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie',
    pipelineStage: 'Application',
    appliedFor: 'Backend Engineer (Go)',
    experience: ['Intern at Cloud Services Co.'],
    skills: ['Go', 'Docker', 'SQL'],
    education: ['M.S. in Software Engineering, State University'],
  },
  {
    id: '4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    phone: '456-789-0123',
    avatarUrl: 'https://i.pravatar.cc/150?u=diana',
    pipelineStage: 'Offer',
    appliedFor: 'UI/UX Designer',
    experience: ['4 years as Lead Designer at Creative Minds'],
    skills: ['Figma', 'User Testing', 'Design Systems'],
    education: ['B.A. in Graphic Design, Arts Institute'],
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    phone: '567-890-1234',
    avatarUrl: 'https://i.pravatar.cc/150?u=ethan',
    pipelineStage: 'Hired',
    appliedFor: 'Senior Frontend Developer',
    experience: ['8 years in frontend development across various startups.'],
    skills: ['React', 'Vue.js', 'Performance Optimization'],
    education: ['Self-taught & Certified Pro'],
  },
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'Project Phoenix',
    description: 'A complete overhaul of our customer-facing dashboard.',
    overview: 'Focused on improving user experience and performance by migrating to a modern tech stack. The project resulted in a 40% increase in user engagement.',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Data Pipeline Initiative',
    description: 'Building a scalable data processing pipeline.',
    overview: 'Implemented a new ETL pipeline using serverless technology to handle massive volumes of data, reducing processing time by 60%.',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Mobile App Launch',
    description: 'Launching our first native mobile application.',
    overview: 'Developed and launched native iOS and Android apps, reaching 100,000 downloads in the first month and opening up a new user acquisition channel.',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    rating: 4.7,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    category: 'Project',
    rating: 5,
    content: 'Working on Project Phoenix was an incredible learning experience. The team was fantastic, and we delivered a product we are all proud of.',
    createdAt: '2 weeks ago',
  },
  {
    id: '2',
    category: 'Course',
    rating: 4,
    content: 'The "Advanced React Patterns" course was very insightful, though some parts were a bit too fast-paced. Overall, a great resource.',
    createdAt: '1 month ago',
  },
  {
    id: '3',
    category: 'Platform',
    rating: 5,
    content: 'TalentFlow ATS has streamlined our hiring process significantly. The AI suggestions are surprisingly accurate and save us a lot of time.',
    createdAt: '3 days ago',
  },
  {
    id: '4',
    category: 'Project',
    rating: 4,
    content: 'The Data Pipeline Initiative was challenging but rewarding. We hit some roadblocks, but the outcome was worth the effort.',
    createdAt: '1 week ago',
  },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Master advanced techniques in React for scalable applications.',
    imageUrl: 'https://picsum.photos/seed/course1/600/400',
    rating: 4.5
  },
  {
    id: '2',
    title: 'Effective Product Management',
    description: 'Learn the essentials of product lifecycle management.',
    imageUrl: 'https://picsum.photos/seed/course2/600/400',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Leadership for Engineers',
    description: 'Develop your leadership skills to grow into a management role.',
    imageUrl: 'https://picsum.photos/seed/course3/600/400',
    rating: 4.7
  },
    {
    id: '4',
    title: 'Mastering Go Microservices',
    description: 'Build and deploy production-ready microservices with Go.',
    imageUrl: 'https://picsum.photos/seed/course4/600/400',
    rating: 4.8
  }
];
