'use server';

import {createNextHandler} from '@genkit-ai/next';
import '@/ai/flows/analyze-competitor-pricing';
import '@/ai/flows/translate-technical-details';
import '@/ai/flows/generate-good-better-best-options';
import '@/ai/flows/aria-support-flow';

export const {GET, POST} = createNextHandler();
