'use client';

import { useFirebase, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

declare const paypal: any;

interface SubscriptionButtonProps {
  planId: string;
  planName: 'solo' | 'team';
}

export const SubscriptionButton = ({ planId, planName }: SubscriptionButtonProps) => {
  const { user, firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    if (window.paypal) {
      setIsSdkReady(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AcfpjwLgDGThXpyOnYWUoWdFG7SM_h485vJULqGENmPyeiwfD20Prjfx6xRrqYOSZlM4s-Rnh3OfjXhk&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.onload = () => setIsSdkReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isSdkReady && userProfile) {
        const buttonContainerId = `paypal-button-container-${planId}`;
        const container = document.getElementById(buttonContainerId);
        if (container && container.childElementCount === 0) {
            paypal.Buttons({
              style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'subscribe',
              },
              createSubscription: function (_data: any, actions: any) {
                return actions.subscription.create({
                  plan_id: planId,
                });
              },
              onApprove: function (data: any, _actions: any) {
                setIsSubscribing(true);
                if (userProfile?.organizationId) {
                  const orgRef = doc(firestore, 'organizations', userProfile.organizationId);
                  setDocumentNonBlocking(orgRef, {
                    subscriptionPlan: planName,
                    subscriptionStatus: 'active',
                    paypalSubscriptionId: data.subscriptionID,
                  }, { merge: true });
                  toast({
                    title: 'Subscription Successful!',
                    description: "Thank you for subscribing. You're all set.",
                  });
                   setTimeout(() => router.push('/dashboard'), 2000);
                }
              },
              onError: (err: any) => {
                  console.error("PayPal button error:", err);
                   toast({
                    variant: 'destructive',
                    title: 'Subscription Failed',
                    description: 'Something went wrong. Please try again.',
                  });
              }
            }).render(`#${buttonContainerId}`);
        }
    }
  }, [isSdkReady, planId, planName, userProfile, firestore, router, toast]);

  if (!isSdkReady || isSubscribing) {
      return (
          <div className='flex flex-col items-center justify-center gap-4'>
            {isSubscribing && <p className='text-sm text-muted-foreground'>Finalizing your subscription...</p>}
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
      )
  }

  if (!user) {
    return (
        <div className='text-center text-sm text-muted-foreground p-4 bg-secondary rounded-md'>
            Please <Link href="/login" className="font-semibold text-primary underline">login</Link> or <Link href="/login" className="font-semibold text-primary underline">sign up</Link> to subscribe.
        </div>
    )
  }

  return <div id={`paypal-button-container-${planId}`}></div>;
};
