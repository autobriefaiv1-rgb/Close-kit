import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Welcome to Close Kit</CardTitle>
          <CardDescription>
            Let&apos;s get your company set up.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Your Company LLC" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Company Phone</Label>
              <Input id="phone" placeholder="(555) 123-4567" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Company Address</Label>
            <Input id="address" placeholder="1234 Market St, Suite 100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" placeholder="8.5" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="overhead">Fixed Overhead (%)</Label>
              <Input id="overhead" type="number" placeholder="15" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profit-margin">Desired Profit Margin (%)</Label>
              <Input id="profit-margin" type="number" placeholder="20" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto" asChild>
             {/* In a real app, this would save data and then redirect */}
            <Link href="/dashboard">Complete Setup</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
