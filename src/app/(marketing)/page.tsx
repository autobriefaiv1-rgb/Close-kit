import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  Languages,
  LineChart,
  Rocket,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "AI-Powered GBB Generator",
    description: "Instantly create Good-Better-Best options from job details, leveraging proprietary data for optimal pricing.",
  },
  {
    icon: <Languages className="w-8 h-8 text-primary" />,
    title: "Narrative Translator",
    description: "Convert complex technical jargon into clear, customer-friendly explanations that build trust and close deals.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Mobile Proposal Builder",
    description: "Craft professional proposals on-the-go with a touch-optimized interface for managing customers, line items, and photos.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: "Proposal Analytics",
    description: "Gain insights with proposal tracking. See views, acceptance rates, and revenue to refine your sales strategy.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: "Price Book & Job Costing",
    description: "Manage material costs and calculate precise job costing including overhead to ensure profitability on every project.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Competitor Price Analysis",
    description: "Stay ahead of the competition. Analyze market pricing and get AI-driven suggestions for your own strategy.",
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function LandingPage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                The Future of HVAC Contracting
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Leverage AI to create winning proposals, optimize pricing, and
                manage your business more efficiently than ever before.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Work Smarter, Not Harder
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our suite of AI-powered tools is designed to handle the heavy
                lifting, so you can focus on quality work and customer satisfaction.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
            {features.map((feature) => (
              <div key={feature.title} className="grid gap-1 text-center">
                <div className="flex justify-center items-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="w-full py-20 md:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for your business.
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Solo Plan</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">
                  $69<span className="text-xl font-normal text-muted-foreground">/mo</span>
                </div>
                <ul className="grid gap-2 text-left text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Unlimited proposals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    AI-powered proposal generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Digital signatures
                  </li>
                   <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Price book management
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/signup">Start Solo Plan</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="relative border-primary">
               <Badge variant="default" className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="font-headline">Team</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">
                  $129<span className="text-xl font-normal text-muted-foreground">/mo</span>
                </div>
                <ul className="grid gap-2 text-left text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Everything in Solo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Multiple team members
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Shared price books
                  </li>
                   <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Analytics dashboard
                  </li>
                </ul>
                <Button className="w-full" variant="default" asChild>
                  <Link href="/signup">Start Team Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to Upgrade Your Business?
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join HVAC AI Pro today and start building a more profitable and
              efficient contracting business.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
