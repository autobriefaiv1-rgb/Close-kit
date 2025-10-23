'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { GBBGenerator } from '@/components/ai-tools/gbb-generator';
import { NarrativeTranslator } from '@/components/ai-tools/narrative-translator';
import { CompetitorAnalysis } from '@/components/ai-tools/competitor-analysis';
import { DocumentAnalyzer } from '@/components/ai-tools/document-analyzer';

export default function AIToolkitPage() {
  return (
    <Tabs defaultValue="gbb-generator" className="flex-1">
      <div className="flex justify-center">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="gbb-generator">Options Generator</TabsTrigger>
          <TabsTrigger value="translator">Narrative Translator</TabsTrigger>
          <TabsTrigger value="competitor-analysis">Price Analysis</TabsTrigger>
          <TabsTrigger value="document-analyzer">Analyze Document</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="gbb-generator">
        <GBBGenerator />
      </TabsContent>
      <TabsContent value="translator">
        <NarrativeTranslator />
      </TabsContent>
      <TabsContent value="competitor-analysis">
        <CompetitorAnalysis />
      </TabsContent>
      <TabsContent value="document-analyzer">
        <DocumentAnalyzer />
      </TabsContent>
    </Tabs>
  );
}
