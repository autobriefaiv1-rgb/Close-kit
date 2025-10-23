'use client';

import {
  useDoc,
  useFirebase,
  useMemoFirebase,
  setDocumentNonBlocking,
} from '@/firebase';
import type { Proposal, Customer, UserProfile } from '@/lib/types';
import { doc, serverTimestamp } from 'firebase/firestore';
import {
  ArrowLeft,
  Copy,
  Share2,
  Signature,
  FileSignature,
} from 'lucide-react';
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

function ProposalDetailsSkeleton() {
    return (
        <div className="mx-auto grid max-w-6xl flex-1 auto-rows-max gap-4">
             <div className="flex items-center gap-4">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-20 rounded-full ml-auto" />
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
             <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
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
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                         <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">Customer</CardTitle>
                                <Skeleton className="h-4 w-40" />
                            </div>
                         </CardHeader>
                         <CardContent className="p-6 text-sm space-y-3">
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                         </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


export default function ProposalDetailsPage() {
  const { id } = useParams();
  const proposalId = Array.isArray(id) ? id[0] : id;

  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const proposalRef = useMemoFirebase(
    () =>
      userProfile
        ? doc(
            firestore,
            'organizations',
            userProfile.organizationId,
            'proposals',
            proposalId
          )
        : null,
    [firestore, userProfile, proposalId]
  );
  const { data: proposal, isLoading: isProposalLoading } = useDoc<Proposal>(
    proposalRef
  );

  const customerRef = useMemoFirebase(
    () =>
      userProfile && proposal?.customerId
        ? doc(
            firestore,
            'organizations',
            userProfile.organizationId,
            'customers',
            proposal.customerId
          )
        : null,
    [firestore, userProfile, proposal?.customerId]
  );
  const { data: customer, isLoading: isCustomerLoading } = useDoc<Customer>(
    customerRef
  );
  
  if (!isProposalLoading && !proposal) {
    notFound();
  }
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Link Copied!', description: 'Public proposal link copied to clipboard.' });
  };
  
  const handleSignatureSave = async () => {
    if (!proposalRef || !signatureDataUrl) return;
    setDocumentNonBlocking(proposalRef, { 
        status: 'Accepted',
        signatureDataUrl: signatureDataUrl,
        acceptedAt: serverTimestamp(),
    }, { merge: true });
    setIsSignatureDialogOpen(false);
    toast({ title: 'Proposal Accepted!', description: 'The proposal has been signed and marked as accepted.' });
  };


  const isLoading = isProfileLoading || isProposalLoading || isCustomerLoading;
  
  if (isLoading) {
    return <ProposalDetailsSkeleton />;
  }

  const statusVariant = (
    status?: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (status === 'Accepted') return 'default';
    if (status === 'Sent') return 'secondary';
    if (status === 'Draft') return 'outline';
    return 'destructive';
  };
  
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/proposal/${proposalId}` : '';


  return (
    <div className="mx-auto grid max-w-6xl flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/proposals">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Proposal Details
        </h1>
        <Badge variant={statusVariant(proposal?.status)} className="ml-auto sm:ml-0">
          {proposal?.status}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(publicUrl)}><Share2 className="mr-2 h-4 w-4"/>Share</Button>
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
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Proposal {proposalId.substring(0, 7)}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Proposal ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Date: {proposal?.createdAt.toDate().toLocaleDateString()}
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
                  <div className="font-semibold">Job Information</div>
                   <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>New AC unit installation</span>
                    <span>2000 sq ft home</span>
                    <span>Includes removal of old unit</span>
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
                      <span>$3,754.10</span>
                    </div>
                  </div>
                </div>
              </div>
               {proposal?.signatureDataUrl && (
                <>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Customer Signature</div>
                    <div className="rounded-md border bg-muted p-2">
                        <Image src={proposal.signatureDataUrl} alt="Customer Signature" width={200} height={100} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Signed on {proposal.acceptedAt ? proposal.acceptedAt.toDate().toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </>
                )}
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
           <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Customer
                </CardTitle>
                <CardDescription>
                  {customer?.email}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <>
                <div className="font-semibold">{customer?.name}</div>
                <address className="not-italic text-muted-foreground">
                  {customer?.address}
                </address>
                <div className="text-muted-foreground mt-2">{customer?.phone}</div>
                </>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
