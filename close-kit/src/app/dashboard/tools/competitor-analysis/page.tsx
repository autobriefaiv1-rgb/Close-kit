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
import { Input } from "@/components/ui/input";
import {
  analyzeCompetitorPricing,
  AnalyzeCompetitorPricingOutput,
} from "@/ai/flows/analyze-competitor-pricing";
import { Loader2, Wand2 } from "lucide-react";

export default function CompetitorAnalysisPage() {
  const [competitorData, setCompetitorData] = useState(
    "Competitor A: $8,500 for a similar unit, 1-year labor warranty.\nCompetitor B: Quoted $7,800 but uses a lower SEER-rated unit.\nCompetitor C: $9,200 with a 5-year labor warranty and premium brand."
  );
  const [jobDetails, setJobDetails] = useState("Standard AC replacement, mid-tier 16 SEER unit. Our cost is $2500 for the unit, $800 labor. Total cost: $3300.");
  const [desiredProfitMargin, setDesiredProfitMargin] = useState("35");
  const [result, setResult] = useState<AnalyzeCompetitorPricingOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const output = await analyzeCompetitorPricing({
        competitorData,
        jobDetails,
        desiredProfitMargin: Number(desiredProfitMargin),
      });
      setResult(output);
    } catch (error) {
      console.error("Error analyzing pricing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Competitor Price Analysis</CardTitle>
          <CardDescription>
            Get AI-powered suggestions for your pricing strategy based on market data.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="competitor-data">Competitor Pricing Data</Label>
              <Textarea
                id="competitor-data"
                value={competitorData}
                onChange={(e) => setCompetitorData(e.target.value)}
                placeholder="Enter competitor quotes, features, and warranties."
                className="min-h-[200px]"
              />
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="job-details">Your Job Details & Costs</Label>
                <Textarea
                  id="job-details"
                  value={jobDetails}
                  onChange={(e) => setJobDetails(e.target.value)}
                  placeholder="Describe the job you're quoting and your internal costs."
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profit-margin">Desired Profit Margin (%)</Label>
                <Input
                  id="profit-margin"
                  type="number"
                  value={desiredProfitMargin}
                  onChange={(e) => setDesiredProfitMargin(e.target.value)}
                  placeholder="e.g., 35"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleSubmit} disabled={loading} size="lg">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Analyze Pricing
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-4 text-muted-foreground">Analyzing...</span>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>AI Pricing Strategy Suggestion</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div>
              <h3 className="font-semibold text-primary">Suggested Strategy</h3>
              <p className="text-muted-foreground mt-1">
                {result.suggestedPricingStrategy}
              </p>
            </div>
             <div>
              <h3 className="font-semibold text-primary">Justification</h3>
              <p className="text-muted-foreground mt-1">
                {result.priceJustification}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
