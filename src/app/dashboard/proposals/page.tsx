'use client';

import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Proposal, ProposalStatus, UserProfile } from '@/lib/types';
import { useFirebase, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProposalsPage() {
  const { firestore, user } = useFirebase();
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status') as ProposalStatus | null;
  const defaultTab = statusFilter || 'all';

  const userProfileRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  const proposalsQuery = useMemoFirebase(() => {
    if (!userProfile) return null;
    const baseCollection = collection(firestore, 'organizations', userProfile.organizationId, 'proposals');
    if (statusFilter && statusFilter !== 'all') {
      return query(baseCollection, where('status', '==', statusFilter));
    }
    return baseCollection;
  }, [firestore, userProfile, statusFilter]);

  const { data: proposals, isLoading } = useCollection<Proposal>(proposalsQuery);

  const statusVariant = (
    status: Proposal['status']
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (status === 'Accepted') return 'default';
    if (status === 'Sent') return 'secondary';
    if (status === 'Draft') return 'outline';
    return 'destructive';
  };

  const renderProposalRows = (proposalsToList: Proposal[] | null) => {
    if (isLoading) {
      return [...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-5 w-24" /></TableCell>
          <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
          <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
          <TableCell><Skeleton className="h-5 w-20" /></TableCell>
          <TableCell className="text-right"><Skeleton className="h-8 w-16" /></TableCell>
        </TableRow>
      ));
    }

    if (!proposalsToList || proposalsToList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            No proposals found.
          </TableCell>
        </TableRow>
      );
    }
    return proposalsToList.map(proposal => (
      <TableRow key={proposal.id}>
        <TableCell className="font-medium">{proposal.customerName}</TableCell>
        <TableCell>
          <Badge variant={statusVariant(proposal.status)}>{proposal.status}</Badge>
        </TableCell>
        <TableCell className="text-right">
          ${proposal.amount.toLocaleString()}
        </TableCell>
        <TableCell>
          {proposal.createdAt.toDate().toLocaleDateString()}
        </TableCell>
        <TableCell className="text-right">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/proposals/${proposal.id}`}>View</Link>
          </Button>
        </TableCell>
      </TableRow>
    ));
  };
  
  return (
    <Tabs defaultValue={defaultTab}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" asChild><Link href="/dashboard/proposals">All</Link></TabsTrigger>
          <TabsTrigger value="Draft" asChild><Link href="/dashboard/proposals?status=Draft">Draft</Link></TabsTrigger>
          <TabsTrigger value="Sent" asChild><Link href="/dashboard/proposals?status=Sent">Sent</Link></TabsTrigger>
          <TabsTrigger value="Accepted" asChild><Link href="/dashboard/proposals?status=Accepted">Accepted</Link></TabsTrigger>
          <TabsTrigger value="Rejected" asChild><Link href="/dashboard/proposals?status=Rejected">Rejected</Link></TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/dashboard/proposals/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Proposal
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Proposals</CardTitle>
          <CardDescription>
            Manage your proposals and track their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderProposalRows(proposals)}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </Tabs>
  );
}
