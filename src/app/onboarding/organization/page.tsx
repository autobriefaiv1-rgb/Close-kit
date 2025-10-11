'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirebase, setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { collection, doc, Timestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { add } from 'date-fns';

export default function OnboardingOrganizationPage() {
  const { firestore, user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [organizationName, setOrganizationName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    if (!user) return;
    if (!organizationName) {
      toast({
        variant: 'destructive',
        title: 'Organization Name Required',
        description: 'Please enter a name for your organization.',
      });
      return;
    }
    setIsSaving(true);
    try {
      // Create the organization with trial dates
      const trialEndDate = add(new Date(), { days: 7 });
      const orgRef = await addDocumentNonBlocking(collection(firestore, 'organizations'), {
        name: organizationName,
        ownerId: user.uid,
        subscriptionPlan: 'solo', // Default plan
        subscriptionStatus: 'trial',
        trialEndDate: Timestamp.fromDate(trialEndDate),
      });

      // Update the user's profile with the new organization ID
      const userRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(userRef, { organizationId: orgRef.id, role: 'admin' }, { merge: true });

      router.push('/onboarding/details');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Create Your Organization
        </CardTitle>
        <CardDescription>
          This is the name of your company or team within Close Kit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input
            id="organizationName"
            placeholder="e.g., Pro Services Inc."
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleContinue} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
