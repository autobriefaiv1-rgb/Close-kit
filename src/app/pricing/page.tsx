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
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';

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
      <main className="flex-1">
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
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Solo</CardTitle>
              <CardDescription>For individual contractors and small teams.</CardDescription>
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
                  <span>AI-powered proposal generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Digital signatures</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Price book management</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" asChild>
                <Link href="/signup">Start Solo Plan</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative flex flex-col border-2 border-primary shadow-2xl">
            <Badge variant="default" className="absolute -top-4 left-1/2 -translate-x-1/2">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Team</CardTitle>
              <CardDescription>For growing businesses that need more power.</CardDescription>
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
                  <span>Multiple team members</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Shared price books</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Analytics dashboard</span>
                </li>
                 <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" asChild>
                <Link href="/signup">Start Team Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
