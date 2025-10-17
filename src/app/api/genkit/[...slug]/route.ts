'use server';
import { appRoute } from '@genkit-ai/next';
import { analyzeCompetitorPricingFlow } from '@/ai/flows/analyze-competitor-pricing';
import { translateTechnicalDetailsFlow } from '@/ai/flows/translate-technical-details';
import { generateGoodBetterBestOptionsFlow } from '@/ai/flows/generate-good-better-best-options';
import { ariaSupportFlow } from '@/ai/flows/aria-support-flow';

export const { GET, POST } = appRoute({
  flows: [
    analyzeCompetitorPricingFlow,
    translateTechnicalDetailsFlow,
    generateGoodBetterBestOptionsFlow,
    ariaSupportFlow,
  ],
});
