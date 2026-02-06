import type { LucideIcon } from 'lucide-react';

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  status: 'Open' | 'Closed' | 'Draft';
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  pipelineStage: 'Application' | 'Phone Screen' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedFor: string; // Job title
  experience: string[];
  skills: string[];
  education: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  overview: string;
  imageUrl: string;
  rating: number;
};

export type Review = {
  id: string;
  category: 'Project' | 'Course' | 'Platform';
  rating: number;
  content: string;
  createdAt: string;
};

export type Course = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  rating: number;
};

export type NavItem = {
  href: string;
  title: string;
  icon: LucideIcon;
  label?: string;
};
