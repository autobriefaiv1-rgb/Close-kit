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
import { useFirebase, setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { collection, doc, query, where, getDocs, limit } from 'firebase/firestore';
import { Loader2, Users, Building, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function OnboardingOrganizationPage() {
  const { firestore, user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [inviteKey, setInviteKey] = useState('');
  const [isJoining, setIsJoining] = useState(false);


  const handleJoinTeam = async () => {
    if (!user || !inviteKey) {
      toast({ variant: 'destructive', title: 'User Key Required', description: 'Please enter a valid user key to join a team.' });
      return;
    }
    setIsJoining(true);

    try {
      // Find the user (team admin) by their userKey
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('userKey', '==', inviteKey), limit(1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({ variant: 'destructive', title: 'Invalid Key', description: 'No user found with that key. Please check the key and try again.' });
        setIsJoining(false);
        return;
      }

      const teamAdminProfile = querySnapshot.docs[0].data();
      const organizationId = teamAdminProfile.organizationId;

      if (!organizationId) {
         toast({ variant: 'destructive', title: 'Invalid Team', description: 'The user associated with this key does not belong to an organization.' });
         setIsJoining(false);
         return;
      }
      
      // Update the current user's profile to join the organization
      const currentUserRef = doc(firestore, 'users', user.uid);
      await setDocumentNonBlocking(currentUserRef, {
        organizationId: organizationId,
        role: 'member', // Assign a default role
      }, { merge: true });

      toast({ title: 'Team Joined!', description: `You have successfully joined the team.` });
      router.push('/dashboard');

    } catch (error: any) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error Joining Team', description: error.message });
      setIsJoining(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-center">
                Join an Existing Team
                </CardTitle>
                <CardDescription className="text-center">
                If you received a user key from an administrator, enter it here to join their organization.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="grid gap-2">
                <Label htmlFor="inviteKey">Admin's User Key</Label>
                <Input
                    id="inviteKey"
                    placeholder="Enter 8-character key"
                    value={inviteKey}
                    onChange={(e) => setInviteKey(e.target.value.toUpperCase())}
                    maxLength={8}
                />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleJoinTeam} disabled={isJoining} className="w-full">
                {isJoining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Join Team
                </Button>
            </CardFooter>
        </Card>
        <Card className="flex flex-col">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-center">
                Create a New Organization
                </CardTitle>
                <CardDescription className="text-center">
                Start your own workspace. Choose a plan to create a new organization for you and your team.
                </CardDescription>
            </CardHeader>
             <CardContent className="flex-1 flex items-center justify-center">
                 <p className="text-muted-foreground text-center">You'll be able to name your organization after selecting a plan.</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href="/pricing">
                        Choose a Plan <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
