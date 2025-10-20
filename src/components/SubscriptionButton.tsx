'use client';

import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.onload = () => setIsSdkReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isSdkReady && userProfile && user) {
        const buttonContainerId = `paypal-button-container-${planId}`;
        const container = document.getElementById(buttonContainerId);
        if (container && container.childElementCount === 0) { // Prevent re-rendering
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
              onApprove: async function (data: any, _actions: any) {
                setIsSubscribing(true);
                try {
                  const idToken = await user.getIdToken();
                  const response = await fetch('/api/paypal/capture-subscription', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${idToken}`
                    },
                    body: JSON.stringify({
                      subscriptionID: data.subscriptionID,
                      organizationId: userProfile.organizationId,
                      planName: planName
                    })
                  });

                  if (!response.ok) {
                    throw new Error('Failed to verify subscription on the backend.');
                  }

                  toast({
                    title: 'Subscription Successful!',
                    description: "Thank you for subscribing. You're all set.",
                  });
                   setTimeout(() => router.push('/dashboard'), 2000);

                } catch (error) {
                    console.error("Subscription approval error:", error);
                    toast({
                      variant: 'destructive',
                      title: 'Subscription Failed',
                      description: 'Something went wrong during verification. Please contact support.',
                    });
                    setIsSubscribing(false);
                }
              },
              onError: (err: any) => {
                  console.error("PayPal button error:", err);
                   toast({
                    variant: 'destructive',
                    title: 'Subscription Failed',
                    description: 'Something went wrong with PayPal. Please try again.',
                  });
              }
            }).render(`#${buttonContainerId}`);
        }
    }
  }, [isSdkReady, planId, planName, userProfile, user, router, toast]);

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
