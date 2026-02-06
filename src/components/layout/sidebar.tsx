'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  GitMerge,
  BookOpen,
  Star,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import type { NavItem } from '@/lib/types';
import { Button } from '../ui/button';

const navItems: NavItem[] = [
  { href: '/', title: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', title: 'Job Requisitions', icon: Briefcase },
  { href: '/candidates', title: 'Candidates', icon: Users },
  { href: '/projects', title: 'Projects', icon: GitMerge },
  { href: '/courses', title: 'Courses', icon: BookOpen },
  { href: '/reviews', title: 'Reviews', icon: Star },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="h-14 items-center justify-between p-2.5">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-7 w-7 text-primary transition-all group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-3.5h5v-2h-5v2zm0-3h5v-2h-5v2zm0-3h5v-2h-5v2z" />
          </svg>
          <span className="font-bold text-lg transition-all group-data-[collapsible=icon]:hidden">
            TalentFlow
          </span>
        </div>
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarMenu className="flex-1 p-2">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.title}
              asChild
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={toggleSidebar}
        >
          {state === 'expanded' ? <ChevronsLeft /> : <ChevronsRight />}
          <span className="group-data-[collapsible=icon]:hidden">
            Collapse
          </span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
