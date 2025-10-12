'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page as it now handles both login and sign up.
    router.replace('/login');
  }, [router]);

  return null;
}
