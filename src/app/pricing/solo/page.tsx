'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { PayPalButton } from '@/components/paypal-button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </div>
  );
};

const pricingImage = PlaceHolderImages.find((img) => img.id === 'pricing-solo');

export default function SoloPlanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/#features" className="text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
            <Link href="/support" className="text-muted-foreground transition-colors hover:text-foreground">Support</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
                <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">Solo Plan</h1>
                <p className="mt-4 text-xl text-muted-foreground">The perfect starting point for individual contractors and small, agile teams ready to grow.</p>
                
                <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-105 mt-8">
                  {pricingImage && (
                    <Image
                      src={pricingImage.imageUrl}
                      alt={pricingImage.description}
                      fill
                      priority
                      className="object-cover"
                      data-ai-hint={pricingImage.imageHint}
                    />
                  )}
                </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <Card className="shadow-2xl">
                  <CardHeader>
                      <CardTitle className="text-center text-3xl font-bold">$69 / month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <div className="pt-6">
                          <PayPalButton />
                      </div>
                  </CardContent>
              </Card>
            </AnimatedSection>

        </div>
         <div className="container mt-16 grid md:grid-cols-2 gap-16 items-start">
             <AnimatedSection>
                <h2 className="text-2xl font-semibold font-headline">Who is this for?</h2>
                <p className="mt-2 text-muted-foreground">The Solo plan is ideal for owner-operators, independent contractors, or small businesses with a single user who handles sales and proposals. If you're looking to professionalize your image, speed up your quoting process, and win more bids without the complexity of managing a large team, this plan is for you.</p>
            </AnimatedSection>
             <AnimatedSection>
                <h2 className="text-2xl font-semibold font-headline">Key Benefits</h2>
                 <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Win More Bids:</strong> Present professional, AI-generated options that impress customers and close deals faster.</span>
                    </li>
                     <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Save Time:</strong> Drastically reduce the time spent on creating proposals, allowing you to focus on the actual work.</span>
                    </li>
                     <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Increase Profitability:</strong> The Good-Better-Best generator makes upselling effortless, boosting your average job value.</span>
                    </li>
                </ul>
            </AnimatedSection>
        </div>
        <div className="container mt-16">
            <AnimatedSection>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline text-center">Full Feature Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold mb-3 text-lg text-primary">What's Included:</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3">
                                  <Check className="h-5 w-5 text-primary" />
                                  <span>Unlimited proposals</span>
                                </li>
                                <li className="flex items-center gap-3">
                                  <Check className="h-5 w-5 text-primary" />
                                  <span>AI-powered GBB options generator</span>
                                </li>
                                 <li className="flex items-center gap-3">
                                  <Check className="h-5 w-5 text-primary" />
                                  <span>AI narrative translator</span>
                                </li>
                                <li className="flex items-center gap-3">
                                  <Check className="h-5 w-5 text-primary" />
                                  <span>Digital signatures</span>
                                </li>
                                <li className="flex items-center gap-3">
                                  <Check className="h-5 w-5 text-primary" />
                                  <span>Price book management</span>
                                </li>
                                 <li className="flex items-center gap-3">
                                  <Check className="h-5 w-5 text-primary" />
                                  <span>Standard email support</span>
                                </li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-3 text-lg text-destructive">What's Not Included:</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3">
                                  <X className="h-5 w-5 text-destructive" />
                                  <span>Team member accounts</span>
                                </li>
                                 <li className="flex items-center gap-3">
                                  <X className="h-5 w-5 text-destructive" />
                                  <span>Advanced analytics dashboard</span>
                                </li>
                                 <li className="flex items-center gap-3">
                                  <X className="h-5 w-5 text-destructive" />
                                  <span>Priority support</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </div>
      </main>
    </div>
  );
}
