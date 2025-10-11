import Link from "next/link";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProposals } from "@/lib/data";
import type { Proposal } from "@/lib/types";

export default function ProposalsPage() {
  const statusVariant = (status: Proposal["status"]): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (status === 'Accepted') return 'default';
    if (status === 'Sent') return 'secondary';
    if (status === 'Draft') return 'outline';
    return 'destructive';
  }

  const renderProposalRows = (proposals: Proposal[]) => {
    if (proposals.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            No proposals found.
          </TableCell>
        </TableRow>
      );
    }
    return proposals.map((proposal) => (
      <TableRow key={proposal.id}>
        <TableCell className="font-medium">{proposal.customerName}</TableCell>
        <TableCell>
          <Badge variant={statusVariant(proposal.status)}>{proposal.status}</Badge>
        </TableCell>
        <TableCell className="text-right">${proposal.amount.toLocaleString()}</TableCell>
        <TableCell>{new Date(proposal.createdAt).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">
            <Button variant="outline" size="sm" asChild>
                <Link href="#">View</Link>
            </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const getFilteredProposals = (status?: Proposal["status"]) => {
    if (!status) return mockProposals;
    return mockProposals.filter((p) => p.status === status);
  }

  return (
    <Tabs defaultValue="all" className="flex flex-col gap-4">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
           <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
      
        <Card>
          <TabsContent value="all">
            <CardHeader>
              <CardTitle>All Proposals</CardTitle>
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
                <TableBody>
                  {renderProposalRows(getFilteredProposals())}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>
          <TabsContent value="draft">
            <CardHeader>
              <CardTitle>Draft Proposals</CardTitle>
              <CardDescription>
                These proposals have not been sent yet.
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
                <TableBody>
                  {renderProposalRows(getFilteredProposals('Draft'))}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>
          <TabsContent value="sent">
              <CardHeader>
                <CardTitle>Sent Proposals</CardTitle>
                <CardDescription>
                  These proposals have been sent to customers and are awaiting a response.
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
                  <TableBody>
                    {renderProposalRows(getFilteredProposals('Sent'))}
                  </TableBody>
                </Table>
              </CardContent>
          </TabsContent>
          <TabsContent value="accepted">
              <CardHeader>
                <CardTitle>Accepted Proposals</CardTitle>
                <CardDescription>
                  These proposals have been accepted by customers.
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
                  <TableBody>
                    {renderProposalRows(getFilteredProposals('Accepted'))}
                  </TableBody>
                </Table>
              </CardContent>
          </TabsContent>
            <TabsContent value="rejected">
              <CardHeader>
                <CardTitle>Rejected Proposals</CardTitle>
                <CardDescription>
                  These proposals have been rejected by customers.
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
                  <TableBody>
                    {renderProposalRows(getFilteredProposals('Rejected'))}
                  </TableBody>
                </Table>
              </CardContent>
          </TabsContent>
        </Card>
    </Tabs>
  );
}
