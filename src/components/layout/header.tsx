import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
  );
}
