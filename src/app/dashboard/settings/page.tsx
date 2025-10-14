'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFirebase, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import type { UserProfile, Organization } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";

export default function SettingsPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const organizationRef = useMemoFirebase(() => userProfile?.organizationId ? doc(firestore, 'organizations', userProfile.organizationId) : null, [firestore, userProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);

  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [org, setOrg] = useState<Partial<Organization>>({
    name: '',
  })

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    } else if (user) {
      setProfile(prev => ({...prev, email: user.email || ''}));
    }
  }, [userProfile, user]);

  useEffect(() => {
    if (organization) {
      setOrg(organization);
    }
  }, [organization]);


  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };
  
  const handleOrgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOrg(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!user || !userProfileRef || !organizationRef) return;
    setIsSaving(true);
    
    try {
      if (userProfileRef) {
        setDocumentNonBlocking(userProfileRef, {
            firstName: profile.firstName,
            lastName: profile.lastName
        }, { merge: true });
      }
      if (organizationRef) {
         setDocumentNonBlocking(organizationRef, {
            name: org.name
        }, { merge: true });
      }
      toast({ title: 'Settings Saved', description: 'Your profile has been updated.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setIsSaving(false);
    }
  };
  
  const isLoading = isProfileLoading || isOrgLoading || !user;

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6">
      <h1 className="text-3xl font-semibold font-headline">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {isLoading ? (
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : (
                <>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={profile.firstName || ''} onChange={handleProfileInputChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={profile.lastName || ''} onChange={handleProfileInputChange} />
                    </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={profile.email || ''} onChange={handleProfileInputChange} disabled />
                </div>
               </>
            )}
          </CardContent>
           <CardFooter className="border-t px-6 py-4">
            <Button onClick={handleSave} disabled={isSaving || isLoading}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>
              Manage your organization settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {isLoading ? (
                 <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : (
                <>
                <div className="grid gap-2">
                    <Label htmlFor="name">Organization Name</Label>
                    <Input id="name" value={org.name || ''} onChange={handleOrgInputChange} />
                </div>
                </>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={handleSave} disabled={isSaving || isLoading}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              Manage your subscription and billing details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-5 w-48" /> : (
                <div>
                    <p>You are currently on the <span className="font-semibold capitalize">{organization?.subscriptionPlan} Plan</span>.</p>
                    {organization?.subscriptionStatus === 'trial' && organization.trialEndDate && (
                        <p className="text-sm text-muted-foreground">Your trial ends in {formatDistanceToNow(organization.trialEndDate.toDate())}.</p>
                    )}
                </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button asChild>
                <Link href="/pricing">Manage Subscription</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
