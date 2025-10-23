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
import { Input } from '@/components/ui/input';
import {
  analyzeDocument,
  AnalyzeDocumentOutput,
} from '@/ai/flows/analyze-document';
import { Loader2, Wand2, FileSearch, Upload, Paperclip, X, Lock } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile, Organization } from '@/lib/types';
import Link from 'next/link';

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


export function DocumentAnalyzer() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const organizationRef = useMemoFirebase(() => userProfile?.organizationId ? doc(firestore, 'organizations', userProfile.organizationId) : null, [firestore, userProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);
  
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState('Summarize this document and identify any potential issues or opportunities for an HVAC installation.');
  const [result, setResult] = useState<AnalyzeDocumentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    const fileInput = document.getElementById('document-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  const handleSubmit = async () => {
    if (!file) {
        toast({variant: 'destructive', title: 'No file selected', description: 'Please upload a document to analyze.'})
        return;
    }
    setLoading(true);
    setResult(null);
    try {
      const documentDataUri = await fileToDataUri(file);
      const output = await analyzeDocument({
        documentDataUri,
        query,
      });
      setResult(output);
    } catch (error) {
      console.error('Error analyzing document:', error);
      toast({variant: 'destructive', title: 'Analysis Failed', description: 'There was an error analyzing the document. Please try again.'})
    } finally {
      setLoading(false);
    }
  };
  
  const isLoading = isProfileLoading || isOrgLoading;
  
  if (isLoading) {
    return <Skeleton className="h-96 mt-6" />;
  }

  if (organization?.subscriptionPlan !== 'team') {
    return (
     <div className="mt-6">
        <Card className="flex flex-col items-center justify-center text-center p-12">
            <div className="bg-primary/10 rounded-full p-4 mb-6">
            <Lock className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl mb-2">Upgrade to Unlock Document Analysis</CardTitle>
            <CardDescription className="max-w-md mb-6">
            The AI Document Analyzer is a premium feature. Upgrade to the Team plan to instantly analyze blueprints, manuals, and job site photos to identify key details, potential issues, and upsell opportunities.
            </CardDescription>
            <Button asChild>
            <Link href="/pricing">View Upgrade Options</Link>
            </Button>
        </Card>
     </div>
   );
 }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <div>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Document Analyzer</CardTitle>
            <CardDescription>
              Upload a document (blueprint, photo, PDF) and ask AI to analyze it for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
             <div className="grid gap-2">
                 <Label htmlFor="document-upload">Document</Label>
                 {!file ? (
                    <label htmlFor="document-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PDF, PNG, JPG, or WEBP</p>
                        </div>
                        <Input id="document-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg,.webp" />
                    </label>
                 ) : (
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-sm">
                            <Paperclip className="h-4 w-4" />
                            <span className="truncate">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={removeFile}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                 )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="query">Your Question</Label>
              <Textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What should the AI look for in this document?"
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={handleSubmit} disabled={loading || !file} size="lg">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Analyze Document
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-headline font-semibold">AI Analysis Result</h2>
        {loading && (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>
        )}

        {result ? (
          <Card>
            <CardContent className="pt-6 grid gap-6">
              <div>
                <p className="text-muted-foreground mt-1 leading-relaxed whitespace-pre-wrap">
                  {result.analysis}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : !loading && (
             <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-10 border-2 border-dashed rounded-lg h-full">
                <FileSearch className="h-10 w-10 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Awaiting analysis</h3>
                <p>Upload a document and ask a question to get an AI-powered analysis.</p>
            </div>
        )}
      </div>
    </div>
  );
}
