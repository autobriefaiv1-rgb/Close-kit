'use client';

import {
  useDoc,
  useFirebase,
  useMemoFirebase,
  setDocumentNonBlocking,
  initializeFirebase,
} from '@/firebase';
import type { Proposal, Customer } from '@/lib/types';
import { doc, serverTimestamp } from 'firebase/firestore';
import { FileSignature } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SignaturePad } from '@/components/signature-pad';
import { useState } from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';

function ProposalDetailsSkeleton() {
    return (
        <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4 p-4">
             <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-20 rounded-full ml-auto" />
            </div>
             <div className="grid gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                           <Skeleton className="h-6 w-40" />
                           <Skeleton className="h-4 w-32 mt-1" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="font-semibold">Line Items</div>
                                <Skeleton className="h-24 w-full" />
                        </div>
                         <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                 <div className="font-semibold">Job Information</div>
                                 <Skeleton className="h-4 w-full" />
                                 <Skeleton className="h-4 w-full" />
                            </div>
                            <div className="grid auto-rows-max gap-3">
                                 <div className="font-semibold">Totals</div>
                                <Skeleton className="h-16 w-full" />
                            </div>
                        </div>
                    </CardContent>
                    </Card>
            </div>
        </div>
    )
}


export default function PublicProposalPage() {
  const { id } = useParams();
  const proposalId = Array.isArray(id) ? id[0] : id;

  const { firestore } = initializeFirebase();
  const { toast } = useToast();
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);

  // We don't know the organization ID, so we can't build the full path here.
  // This hook will need a different implementation for public pages.
  // For now, this will fail, but we'll simulate loading.
  // In a real app, you would need a cloud function or a different data structure to fetch this.
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [proposalRef, setProposalRef] = useState<any>(null);


  // This is a placeholder for fetching logic. In a real app, you would need
  // a way to find which organization a proposal belongs to. This might be
  // done via a public "proposals" collection lookup or a backend function.
  useEffect(() => {
    // This is a mock to simulate fetching the proposal and customer
    // A real implementation would require a backend call.
    async function fetchPublicProposal() {
        console.log(`Fetching public proposal for ID: ${proposalId}`);
        // Simulate a delay
        await new Promise(res => setTimeout(res, 1500));

        // This is where you would have a cloud function or a special firestore rule
        // to fetch proposal data without knowing the organization id.
        // For now, we are creating mock data.
        
        // Let's assume we found the orgId somehow, e.g. from a backend function
        const orgId = "mock-org-id"; // This would come from your backend
        const propRef = doc(firestore, 'organizations', orgId, 'proposals', proposalId);

        // Since we can't actually fetch, we'll create mock data
        const mockProposal: Proposal = {
            id: proposalId,
            organizationId: orgId,
            customerId: 'mock-customer-id',
            customerName: 'John Doe',
            status: 'Sent',
            amount: 3754.10,
            createdAt: new Date() as any,
        };
        const mockCustomer: Customer = {
            id: 'mock-customer-id',
            organizationId: orgId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '555-123-4567',
            address: '123 Main St, Anytown, USA'
        };

        setProposal(mockProposal);
        setCustomer(mockCustomer);
        setProposalRef(propRef); // This ref won't work for writes without correct permissions.
        setIsLoading(false);
    }
    fetchPublicProposal();
  }, [proposalId, firestore]);
  
  
  if (isLoading) {
    return <div className="min-h-screen bg-muted"><ProposalDetailsSkeleton /></div>;
  }
  
  if (!proposal) {
    notFound();
  }
  
  const handleSignatureSave = async () => {
    if (!proposalRef || !signatureDataUrl) return;

    // This operation would fail without proper Firestore rules and a valid reference
    // For the demo, we optimistically update the UI.
    setProposal({
        ...proposal,
        status: 'Accepted',
        signatureDataUrl: signatureDataUrl,
        acceptedAt: new Date() as any,
    });
    
    setDocumentNonBlocking(proposalRef, { 
        status: 'Accepted',
        signatureDataUrl: signatureDataUrl,
        acceptedAt: serverTimestamp(),
    }, { merge: true });
    setIsSignatureDialogOpen(false);
    toast({ title: 'Proposal Accepted!', description: 'Thank you! The contractor has been notified.' });
  };


  const statusVariant = (
    status?: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (status === 'Accepted') return 'default';
    if (status === 'Sent') return 'secondary';
    if (status === 'Draft') return 'outline';
    return 'destructive';
  };
  

  return (
    <div className="min-h-screen bg-muted">
         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                  <Logo />
              </div>
            </div>
      </header>
        <main className="py-8">
            <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4 p-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Proposal from Close Kit
                </h1>
                <Badge variant={statusVariant(proposal?.status)} className="ml-auto sm:ml-0">
                  {proposal?.status}
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
                    <DialogTrigger asChild>
                        {proposal?.status !== 'Accepted' && (
                            <Button><FileSignature className="mr-2 h-4 w-4"/>Accept & Sign</Button>
                        )}
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Accept Proposal</DialogTitle>
                            <DialogDescription>Please provide a signature below to accept this proposal.</DialogDescription>
                        </DialogHeader>
                        <SignaturePad onSignatureEnd={setSignatureDataUrl} />
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsSignatureDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSignatureSave} disabled={!signatureDataUrl}>Save Signature & Accept</Button>
                        </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                            Proposal for {customer?.name}
                            </CardTitle>
                            <CardDescription>
                            Date: {proposal?.createdAt ? new Date(proposal.createdAt as any).toLocaleDateString() : 'N/A'}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="font-semibold">Line Items</div>
                            <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[40%]">Item</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                    <>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                        High-Efficiency Furnace
                                        </TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>$2,500.00</TableCell>
                                        <TableCell className="text-right">$2,500.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                        Senior HVAC Technician
                                        </TableCell>
                                        <TableCell>8</TableCell>
                                        <TableCell>$120.00</TableCell>
                                        <TableCell className="text-right">$960.00</TableCell>
                                    </TableRow>
                                    </>
                            </TableBody>
                            </Table>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                            <div className="font-semibold">Prepared For</div>
                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                                <span>{customer?.name}</span>
                                <span>{customer?.address}</span>
                                <span>{customer?.email}</span>
                            </address>
                            </div>
                            <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold">Totals</div>
                            <div className="grid gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                <span>Subtotal</span>
                                <span>$3,460.00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                <span>Tax</span>
                                <span>$294.10</span>
                                </div>
                                <Separator className="my-1" />
                                <div className="flex items-center justify-between font-medium">
                                <span>Total</span>
                                <span>${proposal.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        {proposal?.signatureDataUrl && (
                            <>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Signed & Accepted</div>
                                <div className="rounded-md border bg-muted p-2 w-fit">
                                    <Image src={proposal.signatureDataUrl} alt="Customer Signature" width={200} height={100} />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Signed on {proposal.acceptedAt ? new Date(proposal.acceptedAt as any).toLocaleString() : 'N/A'}
                                </p>
                            </div>
                            </>
                        )}
                    </CardContent>
                </Card>
              </div>
            </div>
        </main>
    </div>
  );
}
