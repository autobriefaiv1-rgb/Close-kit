"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateGoodBetterBestOptions } from "@/ai/flows/generate-good-better-best-options";
import type { GenerateGoodBetterBestOptionsOutput } from "@/ai/flows/generate-good-better-best-options";
import { Loader2, Wand2, Lock } from "lucide-react";
import { useFirebase, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from 'firebase/firestore';
import type { Organization, UserProfile } from '@/lib/types';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function GBBGeneratorPage() {
  const [jobDescription, setJobDescription] = useState("A standard 2-ton AC unit replacement for a 1500 sq ft single-family home. The existing unit is on the ground floor, easily accessible. Customer is looking for reliable but cost-effective options.");
  const [pricingData, setPricingData] = useState("- Basic 14 SEER unit: $1800\n- Mid-range 16 SEER unit: $2500\n- High-efficiency 18 SEER unit with smart thermostat: $3800\n- Labor: 8 hours @ $100/hr\n- Materials (pads, wiring, etc.): $250");
  const [result, setResult] = useState<GenerateGoodBetterBestOptionsOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const { firestore, user } = useFirebase();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const organizationRef = useMemoFirebase(() => userProfile?.organizationId ? doc(firestore, 'organizations', userProfile.organizationId) : null, [firestore, userProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);

  const isLoading = isProfileLoading || isOrgLoading;

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const output = await generateGoodBetterBestOptions({
        jobDescription,
        pricingData,
      });
      setResult(output);
    } catch (error) {
      console.error("Error generating options:", error);
      // You could show an error toast here
    } finally {
      setLoading(false);
    }
  };
  
  if (isLoading) {
    return <Skeleton className="h-96 w-full" />
  }

  if (organization?.subscriptionPlan !== 'team') {
      return (
          <Card className="flex flex-col items-center justify-center text-center p-12">
              <div className="bg-primary/10 rounded-full p-4 mb-6">
                  <Lock className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl mb-2">Upgrade to Use Advanced AI Tools</CardTitle>
              <CardDescription className="max-w-md mb-6">
                  The Good-Better-Best Options Generator is a premium feature. Upgrade to the Team plan to leverage advanced AI and create compelling proposals effortlessly.
              </CardDescription>
              <Button asChild>
                  <Link href="/pricing">View Upgrade Options</Link>
              </Button>
          </Card>
      );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Good-Better-Best Generator</CardTitle>
          <CardDescription>
            Use AI to generate tiered options for your proposals based on job details and your pricing.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe the job, customer needs, and any constraints."
                className="min-h-[150px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pricing-data">Your Pricing Data</Label>
              <Textarea
                id="pricing-data"
                value={pricingData}
                onChange={(e) => setPricingData(e.target.value)}
                placeholder="List relevant material, equipment, and labor costs from your price book."
                className="min-h-[150px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={handleSubmit} disabled={loading} size="lg">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Options
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-4 text-muted-foreground">Generating options...</span>
        </div>
      )}

      {result && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Good</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.goodOption}</p>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Better</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.betterOption}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-600">Best</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.bestOption}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
