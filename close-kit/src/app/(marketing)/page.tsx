
'use client';

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  Languages,
  LineChart,
  Rocket,
  Check,
  ShieldCheck,
  Zap,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "AI-Powered Options Generator",
    description: "Instantly create Good-Better-Best options from job details. Our AI leverages your proprietary data to craft perfectly tiered options that upsell customers without pressure. This simple feature alone can dramatically increase your average ticket size by presenting clear, value-driven choices.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-gbb'),
    dataAiHint: "abstract options",
    points: ["Increase average job value by 15-30%", "Reduce quoting time by 50%", "Empower techs to upsell confidently"]
  },
  {
    icon: <Languages className="w-10 h-10 text-primary" />,
    title: "Narrative Translator",
    description: "Convert complex technical jargon into clear, customer-friendly explanations that anyone can understand. Build trust, demonstrate expertise, and help clients see the true value in your work, leading to faster approvals and higher customer satisfaction.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-translator'),
    dataAiHint: "abstract language",
    points: ["Build customer trust and transparency", "Justify higher-end options effectively", "Reduce follow-up questions and delays"]
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "Mobile Proposal Builder",
    description: "Don't wait to get back to the office. Craft professional, branded proposals on-the-go with a touch-optimized interface. Manage customers, line items, and photos right from your tablet or phone, and send proposals before you even leave the driveway.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-proposal'),
    dataAiHint: "tablet work",
    points: ["Create and send proposals in minutes", "Capture photos and notes on-site", "Works seamlessly on any device"]
  },
  {
    icon: <LineChart className="w-10 h-10 text-primary" />,
    title: "Proposal Analytics",
    description: "Stop guessing what works. Gain critical insights with real-time proposal tracking. See when a customer opens your proposal, how long they view it, and which options they focus on. Use this data to refine your sales strategy and close more deals.",
    image: PlaceHolderImages.find((img) => img.id === 'feature-analytics'),
    dataAiHint: "dashboard chart",
    points: ["Track proposal views and acceptance rates", "Identify your most profitable services", "Optimize your sales follow-up process"]
  },
];

const reviews = [
  {
    name: "Mike R.",
    company: "Pro-Temp Services",
    review: "Close Kit has been a game-changer. The options generator alone has boosted our average ticket by 25%. My team can now build and send stunning proposals right from the job site.",
    avatar: PlaceHolderImages.find(img => img.id === 'avatar-1')
  },
  {
    name: "Sarah L.",
    company: "CoolBreeze Inc.",
    review: "I was skeptical about AI, but this is the real deal. The narrative translator saves me so much time and my customers actually understand what we're doing. Closing deals is easier than ever.",
    avatar: PlaceHolderImages.find(img => img.id === 'avatar-2')
  },
  {
    name: "David Chen",
    company: "Chen's Contracting",
    review: "The analytics are incredibly powerful. I finally have a clear picture of my sales pipeline and can see which proposals are getting viewed and accepted. It's like having a sales manager in my pocket.",
    avatar: PlaceHolderImages.find(img => img.id === 'avatar-3')
  }
];

const whyChooseUsPoints = [
    {
        icon: <ShieldCheck className="w-12 h-12 text-primary"/>,
        title: "Built for Your Trade",
        description: "We're not a generic, one-size-fits-all solution. Close Kit is purpose-built for the specific needs of field service contractors. Every feature is designed to solve the real-world problems you face daily."
    },
    {
        icon: <Zap className="w-12 h-12 text-primary"/>,
        title: "Unmatched Speed & Efficiency",
        description: "Our platform is engineered for speed. From lightning-fast proposal generation to instant AI analysis, we help you and your team get more done in less time, reducing administrative overhead and maximizing billable hours."
    },
    {
        icon: <TrendingUp className="w-12 h-12 text-primary"/>,
        title: "Focus on Profitability",
        description: "Our tools are laser-focused on one thing: growing your bottom line. Whether it's increasing average ticket size with GBB options or optimizing your close rate with analytics, we help you turn every job into a more profitable one."
    }
];

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

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


export default function LandingPage() {
  return (
    <div className="flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection>
              <div className="flex flex-col justify-center space-y-6">
                <Badge variant="outline" className="w-fit">
                  <Rocket className="mr-2 h-4 w-4" />
                  The Ultimate AI Toolkit for Sales Teams
                </Badge>
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Win More Bids, Effortlessly.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Close Kit is the all-in-one platform that empowers you to create winning proposals in minutes, optimize your pricing with market data, and manage your business more efficiently. Stop leaving money on the table. Start closing more profitable jobs and transforming your operations with the power of AI.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg" asChild>
                      <Link href="/signup">
                        Start Your 7-Day Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="#features">Explore Features</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">No credit card required.</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="w-full py-20 md:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                How It Works
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Your New Workflow, Supercharged
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From the initial quote to the final invoice, Close Kit simplifies every step of your process. Spend less time buried in paperwork and more time doing what you do best: providing quality service to your customers.
              </p>
            </div>
          </AnimatedSection>
          <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3">
             <AnimatedSection className="grid gap-4 text-center">
                <div className="flex justify-center items-center">
                   <FileText className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">1. Build Proposals Fast</h3>
                <p className="text-muted-foreground">
                  Ditch the clunky spreadsheets and Word docs. Use our intuitive mobile app to gather job details on-site, then let our AI instantly generate professional Good-Better-Best options. It pulls directly from your own price book, creating an accurate, impressive proposal in minutes, not hours.
                </p>
            </AnimatedSection>
             <AnimatedSection className="grid gap-4 text-center">
                <div className="flex justify-center items-center">
                   <DollarSign className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">2. Win More Jobs</h3>
                <p className="text-muted-foreground">
                    Send beautiful, easy-to-understand proposals that empower your clients. They can easily view options, accept the one that fits their budget, and sign digitally from any device. Our real-time analytics show you the exact moment your proposal is viewed, so you can follow up with perfect timing and close the deal.
                </p>
            </AnimatedSection>
             <AnimatedSection className="grid gap-4 text-center">
                 <div className="flex justify-center items-center">
                   <LineChart className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">3. Analyze & Grow</h3>
                <p className="text-muted-foreground">
                    The powerful analytics dashboard gives you a bird's-eye view of your business's health. Track close rates, revenue trends, and your most profitable services to stop guessing and start making data-driven decisions. Close Kit gives you the insights you need to scale your business with confidence.
                </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6 space-y-24">
           <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Powerful Features
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Work Smarter, Not Harder
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our suite of AI-powered tools is designed to handle the heavy
                lifting, from quoting to customer communication, so you can focus on quality work and customer satisfaction.
              </p>
            </div>
          </AnimatedSection>

          {features.map((feature, index) => (
            <AnimatedSection key={feature.title}>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className={`flex flex-col space-y-4 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <h3 className="text-3xl font-bold font-headline">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground md:text-lg">{feature.description}</p>
                  <ul className="grid gap-3 text-muted-foreground">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
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
            </AnimatedSection>
          ))}
        </div>
      </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-20 md:py-32 bg-secondary">
            <div className="container px-4 md:px-6">
                <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            Why Choose Close Kit?
                        </div>
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                            The Contractor's Unfair Advantage
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            In a competitive market, you need tools that give you a definitive edge. We combine cutting-edge AI with deep industry knowledge to create a platform that doesn't just help you work—it helps you win more, earn more, and build a stronger business.
                        </p>
                    </div>
                </AnimatedSection>
                <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3">
                    {whyChooseUsPoints.map((point, index) => (
                        <AnimatedSection key={index} className="grid gap-4 text-center">
                            <div className="flex justify-center items-center">
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-bold font-headline">{point.title}</h3>
                            <p className="text-muted-foreground">
                                {point.description}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>


      {/* Reviews Section */}
      <section id="reviews" className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Trusted by Pros
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                What Our Customers Are Saying
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how contractors are using Close Kit to grow their businesses and delight their customers.
              </p>
            </div>
          </AnimatedSection>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12">
            {reviews.map((review, index) => (
              <AnimatedSection key={index}>
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-row items-center gap-4">
                    {review.avatar && (
                      <Image
                        src={review.avatar.imageUrl}
                        alt={`Avatar of ${review.name}`}
                        width={56}
                        height={56}
                        className="rounded-full"
                        data-ai-hint={review.avatar.imageHint}
                      />
                    )}
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.company}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
                    </div>
                    <p className="text-muted-foreground">&quot;{review.review}&quot;</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-primary text-primary-foreground">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <AnimatedSection>
            <div className="space-y-4">
              <h2 className="font-headline text-4xl font-bold tracking-tighter md:text-5xl/tight">
                Ready to Upgrade Your Business?
              </h2>
              <p className="mx-auto max-w-[600px] md:text-xl">
                Join hundreds of successful contractors who use Close Kit to build a more profitable and efficient business. Get started with a 7-day free trial, no credit card required.
              </p>
              <Button size="lg" variant="secondary" className="text-lg" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
    
