
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { generateGoodBetterBestOptions } from '@/ai/flows/generate-good-better-best-options';
import type { GenerateGoodBetterBestOptionsOutput } from '@/ai/flows/generate-good-better-best-options';
import { Loader2, Wand2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function GBBGenerator() {
  const [jobDescription, setJobDescription] = useState(
    'A standard 2-ton AC unit replacement for a 1500 sq ft single-family home. The existing unit is on the ground floor, easily accessible. Customer is looking for reliable but cost-effective options.'
  );
  const [pricingData, setPricingData] = useState(
    '- Basic 14 SEER unit: $1800\n- Mid-range 16 SEER unit: $2500\n- High-efficiency 18 SEER unit with smart thermostat: $3800\n- Labor: 8 hours @ $100/hr\n- Materials (pads, wiring, etc.): $250'
  );
  const [result, setResult] =
    useState<GenerateGoodBetterBestOptionsOutput | null>(null);
  const [loading, setLoading] = useState(false);

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
      console.error('Error generating options:', error);
      // You could show an error toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <div>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Good-Better-Best Generator</CardTitle>
            <CardDescription>
              Use AI to generate tiered options for your proposals based on job
              details and your pricing.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
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

            <Button onClick={handleSubmit} disabled={loading} size="lg">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Options
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-headline font-semibold">AI Generated Options</h2>
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-20" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-20" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-20" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        )}

        {result ? (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Good</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {result.goodOption}
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary">Better</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {result.betterOption}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-600">Best</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {result.bestOption}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : !loading && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-10 border-2 border-dashed rounded-lg">
                <Wand2 className="h-10 w-10 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No options generated yet</h3>
                <p>Enter your job details and let the AI create compelling options for your customer.</p>
            </div>
        )}
      </div>
    </div>
  );
}
