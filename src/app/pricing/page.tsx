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
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="py-4">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
            Pricing
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Simple and transparent pricing.
          </p>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Solo Plan</CardTitle>
            <CardDescription>
              For individual contractors and small teams.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-5xl font-bold">$49</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited Proposals</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>All AI-Powered Tools</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>Customer & Price Book Management</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>Proposal Analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>Stripe Integration</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button size="lg" className="w-full" asChild>
              <Link href="/signup">Start 14-Day Free Trial</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Cancel anytime. No questions asked.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
