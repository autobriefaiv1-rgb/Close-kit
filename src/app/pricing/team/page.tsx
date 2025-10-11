'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Logo } from '@/components/logo';
import { PayPalTeamButton } from '@/components/paypal-team-button';
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

const pricingImage = PlaceHolderImages.find((img) => img.id === 'pricing-team');

export default function TeamPlanPage() {
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
            <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">Team Plan</h1>
            <p className="mt-4 text-xl text-muted-foreground">The ultimate toolkit for growing businesses that need to collaborate and scale.</p>
            
            <ul className="mt-8 space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span><strong>Supercharge Collaboration:</strong> Enable your entire team with shared price books, templates, and real-time proposal tracking.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span><strong>Gain Deeper Insights:</strong> Unlock the powerful analytics dashboard to monitor team performance and optimize your sales process.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span><strong>Priority Support:</strong> Get faster responses and dedicated help from our support team to keep your business running smoothly.</span>
              </li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-105">
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
        </div>
        
        <div className="container mt-16">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-center">Full Feature Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                  <h3 className="font-semibold mb-4 text-lg text-center text-primary">Everything in the Solo Plan, plus:</h3>
                  <ul className="space-y-3 text-muted-foreground max-w-md mx-auto">
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Up to 10 team members</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Advanced analytics dashboard</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Shared price books and templates</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Role-based permissions (coming soon)</span>
                      </li>
                       <li className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Priority email and chat support</span>
                      </li>
                  </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        <div className="container mt-24">
          <AnimatedSection>
            <Card className="shadow-2xl max-w-lg mx-auto bg-card border-2 border-primary">
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Ready to Scale Your Business?</CardTitle>
                <CardDescription>Choose the Team plan and empower your entire crew.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-5xl font-bold">$129</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="pt-2">
                    <PayPalTeamButton />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}
