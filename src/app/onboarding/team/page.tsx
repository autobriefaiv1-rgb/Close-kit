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
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OnboardingTeamPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [invites, setInvites] = useState(['']);
  const [isSaving, setIsSaving] = useState(false);

  const handleInviteChange = (index: number, email: string) => {
    const newInvites = [...invites];
    newInvites[index] = email;
    setInvites(newInvites);
  };

  const addInvite = () => {
    setInvites([...invites, '']);
  };
  
  const removeInvite = (index: number) => {
    if (invites.length > 1) {
        const newInvites = invites.filter((_, i) => i !== index);
        setInvites(newInvites);
    } else {
        setInvites(['']);
    }
  };


  const handleContinue = async () => {
    setIsSaving(true);
    // In a real app, you would send these invites via a backend function.
    // For now, we'll just simulate it.
    const validInvites = invites.filter(email => email.trim() !== '');
    if (validInvites.length > 0) {
      console.log('Inviting team members:', validInvites);
      toast({
          title: 'Team Invites Sent (Simulated)',
          description: "Your team members will receive an email shortly."
      });
    }
    
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    router.push('/onboarding/avatar');
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Invite Your Team
        </CardTitle>
        <CardDescription>
          Add the email addresses of team members you want to invite. You can always do this later.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {invites.map((email, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="email"
              placeholder={`teammate${index + 1}@example.com`}
              value={email}
              onChange={(e) => handleInviteChange(index, e.target.value)}
            />
             <Button variant="ghost" size="icon" onClick={() => removeInvite(index)}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
             </Button>
          </div>
        ))}
         <Button variant="outline" size="sm" onClick={addInvite} className="w-fit">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Another
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => router.push('/onboarding/avatar')}>
          Skip for now
        </Button>
        <Button onClick={handleContinue} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Invites & Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
