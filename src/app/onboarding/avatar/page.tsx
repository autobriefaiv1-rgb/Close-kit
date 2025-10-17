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
import { useFirebase, setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const avatars = [
    'https://picsum.photos/seed/avatar01/200/200',
    'https://picsum.photos/seed/avatar02/200/200',
    'https://picsum.photos/seed/avatar03/200/200',
    'https://picsum.photos/seed/avatar04/200/200',
    'https://picsum.photos/seed/avatar05/200/200',
    'https://picsum.photos/seed/avatar06/200/200',
];

export default function OnboardingAvatarPage() {
  const { firestore, user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFinish = async () => {
    if (!user) return;
     if (!selectedAvatar) {
      toast({
        variant: 'destructive',
        title: 'No Avatar Selected',
        description: 'Please choose a profile picture to continue.',
      });
      return;
    }
    setIsSaving(true);
    try {
      const userRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(userRef, { avatarUrl: selectedAvatar }, { merge: true });

      toast({
        title: "You're all set!",
        description: 'Welcome to Close Kit.',
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Choose Your Profile Picture
        </CardTitle>
        <CardDescription>
          Select an avatar that will represent you across the platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {avatars.map((avatarUrl) => (
          <button
            key={avatarUrl}
            onClick={() => setSelectedAvatar(avatarUrl)}
            className={cn(
              'rounded-full ring-2 ring-transparent hover:ring-primary transition-all p-1',
              selectedAvatar === avatarUrl && 'ring-primary'
            )}
          >
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl} alt={`Avatar option`} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => router.push('/dashboard')}>Skip</Button>
        <Button onClick={handleFinish} disabled={isSaving || !selectedAvatar}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Finish Setup
        </Button>
      </CardFooter>
    </Card>
  );
}
