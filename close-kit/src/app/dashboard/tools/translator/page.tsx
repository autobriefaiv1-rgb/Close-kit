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
import {
  translateTechnicalDetails,
  TranslateTechnicalDetailsOutput,
} from "@/ai/flows/translate-technical-details";
import { Loader2, Wand2 } from "lucide-react";

export default function TranslatorPage() {
  const [technicalDetails, setTechnicalDetails] = useState(
    "Replaced the dual-run capacitor (Model 370-440VAC) and recharged the system with 2 lbs of R-410A refrigerant to address low subcooling and superheat values. Cleaned the evaporator and condenser coils to improve delta-T."
  );
  const [result, setResult] = useState<TranslateTechnicalDetailsOutput | null>(null);
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
      console.error("Error translating details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Narrative Translator</CardTitle>
          <CardDescription>
            Convert technical service notes into customer-friendly explanations.
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
            <Button onClick={handleSubmit} disabled={loading}>
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
      
      {loading && (
        <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-4 text-muted-foreground">Translating...</span>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Customer-Friendly Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {result.customerFriendlyExplanation}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
