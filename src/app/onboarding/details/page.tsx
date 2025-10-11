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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFirebase, setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Trade = 'hvac' | 'plumbing' | 'electrical' | 'other';
type CompanySize = '1-5' | '6-15' | '16-50' | '50+';

export default function OnboardingDetailsPage() {
  const { firestore, user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [trade, setTrade] = useState<Trade | ''>('');
  const [companySize, setCompanySize] = useState<CompanySize | ''>('');
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    if (!user) return;
    if (!trade || !companySize) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select your trade and company size.',
      });
      return;
    }
    setIsSaving(true);
    try {
      const userRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(userRef, { trade, companySize }, { merge: true });
      router.push('/onboarding/team');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Tell us about your business
        </CardTitle>
        <CardDescription>
          This helps us tailor the Close Kit experience for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label>Primary Trade</Label>
          <Select value={trade} onValueChange={(value: Trade) => setTrade(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your main trade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Company Size</Label>
          <Select value={companySize} onValueChange={(value: CompanySize) => setCompanySize(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select number of employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 employees</SelectItem>
              <SelectItem value="6-15">6-15 employees</SelectItem>
              <SelectItem value="16-50">16-50 employees</SelectItem>
              <SelectItem value="50+">50+ employees</SelectItem>
            </SelectContent>
          </Select>
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
