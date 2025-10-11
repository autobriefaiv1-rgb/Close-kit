'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirebase, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const { firestore, user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [companyName, setCompanyName] = useState('');
  const [taxRate, setTaxRate] = useState('8.5');
  const [overhead, setOverhead] = useState('15');
  const [profitMargin, setProfitMargin] = useState('20');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleCompleteSetup = async () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to complete setup.',
      });
      return;
    }
    if (!companyName) {
      toast({
        variant: 'destructive',
        title: 'Company Name Required',
        description: 'Please enter your company name.',
      });
      return;
    }

    setIsSaving(true);

    const userProfileRef = doc(firestore, 'userAccounts', user.uid);
    const profileData = {
      id: user.uid,
      email: user.email,
      companyName,
      defaultTaxRate: parseFloat(taxRate) || 0,
      fixedOverhead: parseFloat(overhead) || 0,
      desiredProfitMargin: parseFloat(profitMargin) || 0,
    };
    
    try {
      // Use the non-blocking fire-and-forget function
      setDocumentNonBlocking(userProfileRef, profileData, { merge: true });
      
      toast({
        title: 'Setup Complete!',
        description: 'Your company profile has been saved.',
      });
      router.push('/dashboard');
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not save your profile.',
      });
      setIsSaving(false);
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Welcome to Close Kit
          </CardTitle>
          <CardDescription>
            Let&apos;s get your company set up.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                    id="company-name"
                    placeholder="Your Company LLC"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                />
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                placeholder="8.5"
                value={taxRate}
                onChange={e => setTaxRate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="overhead">Fixed Overhead (%)</Label>
              <Input
                id="overhead"
                type="number"
                placeholder="15"
                value={overhead}
                onChange={e => setOverhead(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profit-margin">Desired Profit Margin (%)</Label>
              <Input
                id="profit-margin"
                type="number"
                placeholder="20"
                value={profitMargin}
                onChange={e => setProfitMargin(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full md:w-auto"
            onClick={handleCompleteSetup}
            disabled={isSaving}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Complete Setup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
