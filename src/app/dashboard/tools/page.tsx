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

export default function AIToolkitPage() {
  return (
    <Tabs defaultValue="gbb-generator" className="flex-1">
      <div className="flex justify-center">
        <TabsList className="grid grid-cols-3 w-full max-w-lg">
          <TabsTrigger value="gbb-generator">Options Generator</TabsTrigger>
          <TabsTrigger value="translator">Narrative Translator</TabsTrigger>
          <TabsTrigger value="competitor-analysis">Price Analysis</TabsTrigger>
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
    </Tabs>
  );
}
