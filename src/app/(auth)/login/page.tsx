'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/dashboard',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
};

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const [signInStarted, setSignInStarted] = useState(false);

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      if (user && signInStarted) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [auth, router, signInStarted]);

  const handleSignInSuccess = () => {
    setSignInStarted(true);
    // Returning false prevents the default redirect behavior of FirebaseUI,
    // allowing our useEffect to handle it.
    return false;
  };
  
  // We need to wait for auth to be initialized
  if (!auth) {
    return null;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Login or Sign Up</CardTitle>
        <CardDescription>
          Get started with Close Kit today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StyledFirebaseAuth
          uiConfig={{ ...uiConfig, callbacks: { signInSuccessWithAuthResult: handleSignInSuccess } }}
          firebaseAuth={auth}
        />
      </CardContent>
    </Card>
  );
}
