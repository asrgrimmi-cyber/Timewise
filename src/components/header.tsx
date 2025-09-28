
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, PanelLeft, PieChart, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ActivityForm } from './dashboard/activity-form';
import { DigitalClock } from './icons';

export function Header() {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname === '/unproductive') {
      return 'Productivity Analysis';
    }
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base p-2"
            >
              <div className="h-full w-full transition-all group-hover:scale-110 flex items-center justify-center">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
                  </svg>
              </div>
              <span className="sr-only">TimeWise</span>
            </Link>
            <Link href="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
             <Link href="/unproductive" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <PieChart className="h-5 w-5" />
              Productivity Analysis
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{getBreadcrumb()}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-4 ml-auto">
        <DigitalClock />
        <ActivityForm />
      </div>
    </header>
  );
}
