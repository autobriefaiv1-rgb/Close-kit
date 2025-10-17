'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { PayPalButton } from '@/components/paypal-button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/animated-section';

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
              <Link href="/login">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
                <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">Solo Plan</h1>
                <p className="mt-4 text-xl text-muted-foreground">The perfect starting point for individual contractors and small, agile teams ready to grow.</p>
                
                 <ul className="mt-8 space-y-4 text-lg">
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Win More Bids:</strong> Present professional, AI-generated options that impress customers and close deals faster.</span>
                    </li>
                     <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Save Time:</strong> Drastically reduce the time spent on creating proposals, allowing you to focus on the actual work.</span>
                    </li>
                     <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Increase Profitability:</strong> The Good-Better-Best generator makes upselling effortless, boosting your average job value.</span>
                    </li>
                </ul>

            </AnimatedSection>
            
            <AnimatedSection delay={100}>
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
         <div className="container mt-24">
            <AnimatedSection>
              <Card className="shadow-2xl max-w-lg mx-auto bg-card">
                  <CardHeader className="text-center">
                      <CardTitle className="font-headline text-3xl">Ready to Get Started?</CardTitle>
                      <CardDescription>Choose the Solo plan and start winning more jobs today.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                       <div className="text-center">
                        <span className="text-5xl font-bold">$69</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <div className="pt-2">
                          <PayPalButton />
                      </div>
                  </CardContent>
              </Card>
            </AnimatedSection>
        </div>
      </main>
    </div>
  );
}
