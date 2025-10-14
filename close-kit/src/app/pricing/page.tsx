'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
           <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/#features" className="text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="/pricing" className="text-foreground font-semibold">Pricing</Link>
            <Link href="/help" className="text-muted-foreground transition-colors hover:text-foreground">Help</Link>
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
      <main className="flex-1 bg-secondary/50">
        <div className="container py-20 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Choose the plan that's right for your business.
          </p>
          <p className="mt-1 text-muted-foreground">
            All plans start with a 7-day free trial. No credit card required.
          </p>
        </div>

        <div className="container grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 pb-20">
          <Card className="flex flex-col rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Solo</CardTitle>
              <CardDescription>For individual contractors ready to grow.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="text-left">
                <span className="text-5xl font-bold">$69</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Unlimited proposals</span>
                </li>
                 <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>AI Narrative Translator</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Digital signatures & tracking</span>
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
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" asChild>
                <Link href="/login">Start 7-Day Free Trial</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative flex flex-col rounded-lg border-2 border-primary shadow-2xl">
            <Badge variant="default" className="absolute -top-4 left-1/2 -translate-x-1/2">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Team</CardTitle>
              <CardDescription>For growing businesses that need to collaborate.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="text-left">
                <span className="text-5xl font-bold">$129</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3 font-semibold">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Everything in Solo, plus:</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Up to 5 team members</span>
                </li>
                 <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Advanced AI Tools (GBB & Pricing)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Proposal Analytics Dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Team Role Management</span>
                </li>
                 <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Priority Support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" asChild>
                <Link href="/login">Start 7-Day Free Trial</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="container max-w-4xl pb-24">
            <h2 className="text-center font-headline text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full bg-card p-4 rounded-lg shadow-sm">
              <AccordionItem value="how-to-add-users">
                <AccordionTrigger className="text-lg font-semibold text-left">How do I add users to my Team plan?</AccordionTrigger>
                <AccordionContent className="pt-2 text-muted-foreground">
                  Adding team members is simple and secure. Instead of sending insecure email invites, we use a unique User Key for each person.
                  <ol className="list-decimal pl-6 mt-3 space-y-2">
                    <li>First, the person you want to invite must create their own free Close Kit account to get their unique 8-character **User Key**.</li>
                    <li>They can find their personal User Key on their **Settings** page.</li>
                    <li>Once they share the key with you, go to the **Team > Members** page in your dashboard.</li>
                    <li>Click 'Invite Member' and enter their User Key. They will be instantly added to your organization, and all billing will be handled by your account.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="what-are-ai-tools">
                <AccordionTrigger className="text-lg font-semibold text-left">What do the different AI Tools do?</AccordionTrigger>
                <AccordionContent className="pt-2 text-muted-foreground space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Narrative Translator (All Plans)</h4>
                    <p>Converts your technical notes into simple, customer-friendly explanations. This builds trust and helps clients understand the value of your work.</p>
                  </div>
                   <div>
                    <h4 className="font-semibold text-foreground">Good-Better-Best Generator (Team Plan)</h4>
                    <p>Instantly creates three tiered proposal options from your job details and price book. It's the easiest way to upsell customers and increase your average job value without being pushy.</p>
                  </div>
                   <div>
                    <h4 className="font-semibold text-foreground">Competitor Price Analysis (Team Plan)</h4>
                    <p>Gives you a strategic edge by analyzing competitor quotes and your job costs. It suggests an optimal price point to help you win the bid while protecting your profit margin.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
                 <AccordionItem value="what-is-user-key">
                <AccordionTrigger className="text-lg font-semibold text-left">What is a User Key and why do I need one?</AccordionTrigger>
                <AccordionContent className="pt-2 text-muted-foreground">
                  A User Key is a unique 8-character code (e.g., A1B2C3D4) assigned to every Close Kit user. It's a secure replacement for email-based invitations. Sharing your User Key allows a team administrator to add you to their organization without you having to accept an email invite. You can find your personal User Key on your **Settings** page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="can-i-change-plans">
                <AccordionTrigger className="text-lg font-semibold text-left">Can I upgrade or downgrade my plan?</AccordionTrigger>
                <AccordionContent className="pt-2 text-muted-foreground">
                  Yes, you can change your plan at any time from your **Settings > Subscription** page. When you upgrade, you'll get immediate access to the new features.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </div>

      </main>
    </div>
  );
}
