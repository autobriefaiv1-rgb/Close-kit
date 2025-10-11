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
import type { UserProfile } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'userAccounts', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    defaultTaxRate: 8.5,
    fixedOverhead: 15,
    desiredProfitMargin: 20,
  });

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    } else if (user) {
      setProfile(prev => ({...prev, email: user.email || ''}));
    }
  }, [userProfile, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!user || !userProfileRef) return;
    setIsSaving(true);
    
    const profileDataToSave = {
      ...profile,
      id: user.uid,
      email: user.email,
      defaultTaxRate: Number(profile.defaultTaxRate) || 0,
      fixedOverhead: Number(profile.fixedOverhead) || 0,
      desiredProfitMargin: Number(profile.desiredProfitMargin) || 0,
    };

    try {
      setDocumentNonBlocking(userProfileRef, profileDataToSave, { merge: true });
      toast({ title: 'Settings Saved', description: 'Your profile has been updated.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setIsSaving(false);
    }
  };
  
  const isLoading = isProfileLoading || !user;

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
                        <Input id="firstName" value={profile.firstName || ''} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={profile.lastName || ''} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={profile.email || ''} onChange={handleInputChange} disabled />
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
            <CardTitle>Company</CardTitle>
            <CardDescription>
              Manage your company settings and branding.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {isLoading ? (
                 <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <div className="grid md:grid-cols-3 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            ) : (
                <>
                <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" value={profile.companyName || ''} onChange={handleInputChange} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                    <Input id="defaultTaxRate" type="number" value={profile.defaultTaxRate || ''} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="fixedOverhead">Fixed Overhead (%)</Label>
                    <Input id="fixedOverhead" type="number" value={profile.fixedOverhead || ''} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="desiredProfitMargin">Desired Profit Margin (%)</Label>
                    <Input id="desiredProfitMargin" type="number" value={profile.desiredProfitMargin || ''} onChange={handleInputChange} />
                    </div>
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
            <p>You are currently on the <span className="font-semibold">Solo Plan</span>.</p>
            <p className="text-sm text-muted-foreground">Your trial ends in 7 days.</p>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Manage Billing</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
