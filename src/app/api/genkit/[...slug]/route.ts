import {appRoute} from '@genkit-ai/next';
import {analyzeCompetitorPricingFlow} from '@/ai/flows/analyze-competitor-pricing';
import {translateTechnicalDetailsFlow} from '@/ai/flows/translate-technical-details';
import {generateGoodBetterBestOptionsFlow} from '@/ai/flows/generate-good-better-best-options';
import {ariaSupportFlow} from '@/ai/flows/aria-support-flow';
import {NextRequest} from 'next/server';

const flows: Record<string, typeof analyzeCompetitorPricingFlow> = {
  analyzeCompetitorPricing: analyzeCompetitorPricingFlow,
  translateTechnicalDetails: translateTechnicalDetailsFlow,
  generateGoodBetterBestOptions: generateGoodBetterBestOptionsFlow,
  ariaSupportFlow: ariaSupportFlow,
};

const genkitHandler = appRoute({
  flows,
  getFlow: (slug) => {
    // The slug will be in the format `flow_name`.
    return flows[slug];
  },
});

export async function GET(req: NextRequest) {
  return genkitHandler(req);
}

export async function POST(req: NextRequest) {
  return genkitHandler(req);
}
