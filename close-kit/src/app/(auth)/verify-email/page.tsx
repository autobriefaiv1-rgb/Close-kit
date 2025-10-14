'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { useUser } from '@/firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MailCheck } from 'lucide-react';

export default function VerifyEmailPage() {
  const { user, isUserLoading, auth } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  // This effect will periodically check the user's verification status
  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.emailVerified) {
      router.replace('/onboarding');
      return;
    }

    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(interval);
        router.push('/onboarding');
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [user, isUserLoading, router]);

  const handleResendVerification = async () => {
    if (!user) return;
    setIsSending(true);
    try {
      await sendEmailVerification(user);
      toast({
        title: 'Email Sent',
        description: 'A new verification link has been sent to your email.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.code === 'auth/too-many-requests'
            ? 'You have requested too many verification emails. Please wait a few minutes before trying again.'
            : error.message,
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const handleLogout = () => {
      if (auth) {
        signOut(auth);
        router.push('/login');
      }
  }


  if (isUserLoading || !user || user.emailVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <MailCheck className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4 font-headline text-2xl">
          Verify Your Email
        </CardTitle>
        <CardDescription>
          We've sent a verification link to{' '}
          <span className="font-semibold text-foreground">{user.email}</span>.
          Please click the link to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground">
          Once verified, you will be automatically redirected.
          This may take a few moments.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button onClick={handleResendVerification} disabled={isSending}>
          {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Resend Verification Email
        </Button>
        <Button variant="link" onClick={handleLogout}>
          Use a different account
        </Button>
      </CardFooter>
    </Card>
  );
}
