'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';
import { menuItems } from '@/lib/menu-items';
import { Logo } from '@/components/logo';
import { DashboardHeader } from '@/components/dashboard-header';
import { useUser, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { AskAriaWidget } from '@/components/ask-aria-widget';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import type { Organization, UserProfile } from '@/lib/types';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const { firestore } = useFirebase();

  const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const organizationRef = useMemoFirebase(() => userProfile ? doc(firestore, 'organizations', userProfile.organizationId) : null, [firestore, userProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (organization && organizationRef) {
        if (organization.subscriptionStatus === 'trial' && organization.trialEndDate && organization.trialEndDate.toDate() < new Date()) {
            setDocumentNonBlocking(organizationRef, { subscriptionStatus: 'expired' }, { merge: true });
             toast({
                variant: 'destructive',
                title: 'Your free trial has expired.',
                description: 'Please subscribe to a plan to continue using Close Kit.',
            });
            router.push('/pricing');
        } else if (organization.subscriptionStatus === 'expired' || organization.subscriptionStatus === 'canceled') {
            toast({
                variant: 'destructive',
                title: 'Subscription Required',
                description: 'Please subscribe to a plan to access the dashboard.',
            });
            router.push('/pricing');
        }
    }
  }, [organization, organizationRef, router, toast]);

  const isLoading = isUserLoading || isProfileLoading || isOrgLoading || !user;

  if (isLoading) {
    return (
       <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
               <Skeleton className="h-8 w-32" />
            </div>
            <div className="flex-1 p-4">
              <div className="grid items-start gap-2 text-sm font-medium">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
               <Skeleton className="h-8 w-1/3" />
            </div>
             <Skeleton className="h-10 w-10 rounded-full" />
             <Skeleton className="h-10 w-10 rounded-full" />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/50">
             <Skeleton className="w-full h-64" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menuItems.map((item) =>
                item.isGroup ? (
                  <h3 key={item.label} className="px-3 text-xs uppercase text-muted-foreground font-semibold mt-4 mb-1">
                    {item.label}
                  </h3>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      pathname === item.href && 'bg-muted text-primary'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/50">
          {children}
        </main>
        <AskAriaWidget />
      </div>
    </div>
  );
}
