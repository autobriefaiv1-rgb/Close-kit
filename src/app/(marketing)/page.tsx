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
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "AI-Powered GBB Generator",
    description: "Instantly create Good-Better-Best options from job details. Our AI leverages your proprietary data to craft perfectly tiered options that upsell customers without pressure, increasing your average ticket size.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-gbb'),
    dataAiHint: "abstract options"
  },
  {
    icon: <Languages className="w-10 h-10 text-primary" />,
    title: "Narrative Translator",
    description: "Convert complex technical jargon into clear, customer-friendly explanations. Build trust and help clients understand the value you provide, leading to faster approvals and higher satisfaction.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-translator'),
    dataAiHint: "abstract language"
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "Mobile Proposal Builder",
    description: "Don't wait to get back to the office. Craft professional, branded proposals on-the-go with a touch-optimized interface for managing customers, line items, and photos right from your tablet or phone.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-proposal'),
    dataAiHint: "tablet work"
  },
  {
    icon: <LineChart className="w-10 h-10 text-primary" />,
    title: "Proposal Analytics",
    description: "Stop guessing what works. Gain critical insights with proposal tracking. See views, acceptance rates, and revenue per proposal to refine your sales strategy and close more deals.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-analytics'),
    dataAiHint: "dashboard chart"
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function LandingPage() {
  return (
    <div className="flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <Badge variant="outline" className="w-fit">
                <Rocket className="mr-2 h-4 w-4" />
                Now with AI-Powered Tools
              </Badge>
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
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:scale-105">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="w-full py-20 md:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                How It Works
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Streamline Your Workflow in 3 Steps
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From quote to cash, HVAC AI Pro simplifies every aspect of your job.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-4 text-center">
                <div className="flex justify-center items-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground font-bold text-3xl font-headline">1</div>
                </div>
                <h3 className="text-xl font-bold font-headline">Build Proposals Fast</h3>
                <p className="text-muted-foreground">
                    Use our mobile app to create professional proposals on-site. Let AI generate Good-Better-Best options to increase your ticket size effortlessly.
                </p>
            </div>
            <div className="grid gap-4 text-center">
                <div className="flex justify-center items-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground font-bold text-3xl font-headline">2</div>
                </div>
                <h3 className="text-xl font-bold font-headline">Win More Jobs</h3>
                <p className="text-muted-foreground">
                    Send proposals with clear, customer-friendly language and allow clients to accept and sign digitally. Track proposal views to follow up effectively.
                </p>
            </div>
            <div className="grid gap-4 text-center">
                 <div className="flex justify-center items-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground font-bold text-3xl font-headline">3</div>
                </div>
                <h3 className="text-xl font-bold font-headline">Analyze & Grow</h3>
                <p className="text-muted-foreground">
                    Use the analytics dashboard to understand your sales performance, acceptance rates, and most profitable services to scale your business.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6 space-y-24">
           <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Powerful Features
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

          {features.map((feature, index) => (
            <div key={feature.title} className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className={`flex flex-col space-y-4 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <h3 className="text-3xl font-bold font-headline">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground md:text-lg">{feature.description}</p>
                <Button variant="link" className="p-0 w-fit" asChild>
                  <Link href="/pricing">Learn More <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-105">
                {feature.image && (
                   <Image
                      src={feature.image.imageUrl}
                      alt={feature.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={feature.dataAiHint}
                    />
                )}
              </div>
            </div>
          ))}

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="lg:order-last flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                      <Wrench className="w-10 h-10 text-primary" />
                      <h3 className="text-3xl font-bold font-headline">Price Book & Job Costing</h3>
                  </div>
                  <p className="text-muted-foreground md:text-lg">Manage material costs and calculate precise job costing including overhead to ensure profitability on every project.</p>
                   <Button variant="link" className="p-0 w-fit" asChild>
                    <Link href="/pricing">Learn More <ChevronRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
              </div>
               <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-105">
                 <Image
                    src="https://picsum.photos/seed/pricebook/1200/800"
                    alt="A person managing a price book on a tablet."
                    fill
                    className="object-cover"
                    data-ai-hint="price book tablet"
                  />
              </div>
            </div>

             <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                      <Rocket className="w-10 h-10 text-primary" />
                      <h3 className="text-3xl font-bold font-headline">Competitor Price Analysis</h3>
                  </div>
                  <p className="text-muted-foreground md:text-lg">Stay ahead of the competition. Analyze market pricing and get AI-driven suggestions for your own strategy to maximize profit while staying competitive.</p>
                   <Button variant="link" className="p-0 w-fit" asChild>
                    <Link href="/pricing">Learn More <ChevronRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
              </div>
               <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-105">
                 <Image
                    src="https://picsum.photos/seed/competitor/1200/800"
                    alt="An abstract chart showing competitor analysis."
                    fill
                    className="object-cover"
                    data-ai-hint="analysis chart"
                  />
              </div>
            </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-20 md:py-32 bg-secondary">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for your business. No hidden fees.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2 lg:max-w-4xl mx-auto">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="font-headline">Solo Plan</CardTitle>
                <CardDescription>For the individual go-getter.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="text-5xl font-bold font-headline">
                  $69<span className="text-xl font-normal text-muted-foreground">/mo</span>
                </div>
                <ul className="grid gap-3 text-left text-muted-foreground">
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
            <Card className="relative border-primary transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
               <Badge variant="default" className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="font-headline">Team Plan</CardTitle>
                <CardDescription>For growing businesses and teams.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="text-5xl font-bold font-headline">
                  $129<span className="text-xl font-normal text-muted-foreground">/mo</span>
                </div>
                <ul className="grid gap-3 text-left text-muted-foreground">
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
      <section className="w-full py-20 md:py-32 lg:py-40 bg-primary text-primary-foreground">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-4">
            <h2 className="font-headline text-4xl font-bold tracking-tighter md:text-5xl/tight">
              Ready to Upgrade Your Business?
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join HVAC AI Pro today and start building a more profitable and
              efficient contracting business. 14-day free trial, no credit card required.
            </p>
            <Button size="lg" variant="secondary" className="text-lg" asChild>
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
