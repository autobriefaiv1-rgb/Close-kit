'use server';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export async function MissingApiKeyWarning() {
  if (process.env.GEMINI_API_KEY) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-white p-3 text-center text-sm sticky top-0 z-50">
      <div className="container flex items-center justify-center gap-3">
        <AlertTriangle className="h-5 w-5" />
        <div>
          <span className="font-semibold">Warning:</span> AI features are disabled. Your{' '}
          <code className="bg-yellow-400/50 text-white px-1 py-0.5 rounded text-xs">
            GEMINI_API_KEY
          </code>{' '}
          is missing. Please get one from{' '}
          <Link
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:text-white/80"
          >
            Google AI Studio
          </Link>{' '}
          and add it to your <code className="bg-yellow-400/50 text-white px-1 py-0.5 rounded text-xs">.env</code> file.
        </div>
      </div>
    </div>
  );
}
