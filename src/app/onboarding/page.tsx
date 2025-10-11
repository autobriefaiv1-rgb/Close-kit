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
    if (!isUserLoading && !user) {
      router.replace('/login');
      return;
    }

    if (user && !isProfileLoading) {
      if (!userProfile?.firstName || !userProfile?.lastName) {
         router.replace('/onboarding/profile');
      } else if (!userProfile.organizationId) {
        router.replace('/onboarding/organization');
      } else if (!userProfile.trade) {
        router.replace('/onboarding/details');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user, isUserLoading, userProfile, isProfileLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
