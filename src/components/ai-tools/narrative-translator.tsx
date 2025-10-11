
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
import {
  translateTechnicalDetails,
  TranslateTechnicalDetailsOutput,
} from '@/ai/flows/translate-technical-details';
import { Loader2, Wand2, Languages } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function NarrativeTranslator() {
  const [technicalDetails, setTechnicalDetails] = useState(
    'Replaced the dual-run capacitor (Model 370-440VAC) and recharged the system with 2 lbs of R-410A refrigerant to address low subcooling and superheat values. Cleaned the evaporator and condenser coils to improve delta-T.'
  );
  const [result, setResult] =
    useState<TranslateTechnicalDetailsOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const output = await translateTechnicalDetails({
        technicalDetails,
      });
      setResult(output);
    } catch (error) {
      console.error('Error translating details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <div>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Narrative Translator</CardTitle>
            <CardDescription>
              Convert technical service notes into customer-friendly
              explanations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="technical-details">Technical Details</Label>
              <Textarea
                id="technical-details"
                value={technicalDetails}
                onChange={(e) => setTechnicalDetails(e.target.value)}
                placeholder="Enter your technical notes here..."
                className="min-h-[150px]"
              />
            </div>
            <div className="flex justify-center">
              <Button onClick={handleSubmit} disabled={loading} size="lg">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Translate for Customer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="space-y-6">
        <h2 className="text-2xl font-headline font-semibold">Customer-Friendly Explanation</h2>
        {loading && (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        )}

        {result ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {result.customerFriendlyExplanation}
              </p>
            </CardContent>
          </Card>
        ) : !loading && (
             <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-10 border-2 border-dashed rounded-lg">
                <Languages className="h-10 w-10 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No translation yet</h3>
                <p>Enter technical details and the AI will translate them into simple terms for your customer.</p>
            </div>
        )}
      </div>
    </div>
  );
}
