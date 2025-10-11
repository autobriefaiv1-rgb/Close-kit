'use client';

import Link from 'next/link';
import { useUser } from '@/firebase';

export function MarketingNav() {
  const { user, isUserLoading } = useUser();

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      <Link
        href="/#features"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Features
      </Link>
      <Link
        href="/pricing"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Pricing
      </Link>
      <Link
        href="/support"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Support
      </Link>
      {user && (
        <Link
          href="/dashboard"
          className="text-primary font-semibold transition-colors hover:text-primary/80"
        >
          Dashboard
        </Link>
      )}
    </nav>
  );
}
