'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { doc } from 'firebase/firestore';
import { useFirebase } from '@/firebase';
import type { UserProfile } from '@/lib/types';


export default function OnboardingPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);


  useEffect(() => {
    if (isUserLoading || isProfileLoading) {
      // Wait until both user and profile are loaded
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    // Now we know we have a user and their profile (or lack thereof)
    if (!userProfile || !userProfile.firstName || !userProfile.lastName) {
      router.replace('/onboarding/profile');
    } else if (!userProfile.organizationId) {
      router.replace('/onboarding/organization');
    } else if (!userProfile.trade || !userProfile.companySize) {
      router.replace('/onboarding/details');
    } else {
      // If all checks pass, they are fully onboarded
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, userProfile, isProfileLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
