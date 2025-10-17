'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import GBBGeneratorPage from './gbb-generator/page';
import TranslatorPage from './translator/page';
import CompetitorAnalysisPage from './competitor-analysis/page';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import type { Organization, UserProfile } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AIToolkitPage() {
    const { firestore, user } = useFirebase();

    const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
    );
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

    const organizationRef = useMemoFirebase(() => userProfile?.organizationId ? doc(firestore, 'organizations', userProfile.organizationId) : null, [firestore, userProfile]);
    const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);
    
    const isLoading = isProfileLoading || isOrgLoading;

    if(isLoading) {
        return <Skeleton className="h-96 w-full" />
    }

  return (
    <Tabs defaultValue="translator" className="flex-1">
      <div className="flex justify-center">
        <TabsList className="grid grid-cols-3 w-full max-w-2xl">
          <TabsTrigger value="translator">Narrative Translator</TabsTrigger>
          <TabsTrigger value="gbb-generator">Options Generator</TabsTrigger>
          <TabsTrigger value="competitor-analysis">Price Analysis</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="translator" className="mt-6">
        <TranslatorPage />
      </TabsContent>
      <TabsContent value="gbb-generator" className="mt-6">
         {organization?.subscriptionPlan === 'team' ? <GBBGeneratorPage /> : <FeatureLockScreen title="Good-Better-Best Generator" />}
      </TabsContent>
      <TabsContent value="competitor-analysis" className="mt-6">
        {organization?.subscriptionPlan === 'team' ? <CompetitorAnalysisPage /> : <FeatureLockScreen title="Competitor Price Analysis" />}
      </TabsContent>
    </Tabs>
  );
}


function FeatureLockScreen({title}: {title: string}) {
    return (
        <Card className="flex flex-col items-center justify-center text-center p-12 mt-6">
            <div className="bg-primary/10 rounded-full p-4 mb-6">
                <Lock className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl mb-2">Upgrade to Use This Advanced AI Tool</CardTitle>
            <CardDescription className="max-w-md mb-6">
                The {title} is a premium feature. Upgrade to the Team plan to leverage advanced AI and create more compelling proposals.
            </CardDescription>
            <Button asChild>
                <Link href="/pricing">View Upgrade Options</Link>
            </Button>
        </Card>
    )
}
