'use client';
import Link from 'next/link';
import {
  ArrowUpRight,
  DollarSign,
  FileText,
  Users,
  Inbox,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProposals } from '@/lib/data';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

export default function Dashboard() {
  const recentProposals = mockProposals.slice(0, 5);

  const statusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (status === 'Accepted') return 'default';
    if (status === 'Sent') return 'secondary';
    if (status === 'Draft') return 'outline';
    return 'destructive';
  };

  const totalRevenue = mockProposals
    .filter(p => p.status === 'Accepted')
    .reduce((sum, p) => sum + p.amount, 0);

  const acceptanceRate =
    (mockProposals.filter(p => p.status === 'Accepted').length /
      mockProposals.filter(p => p.status === 'Sent' || p.status === 'Accepted' || p.status === 'Rejected').length) *
    100;

  const proposalsSent = mockProposals.filter(p => p.status === 'Sent').length;
  const draftProposals = mockProposals.filter(p => p.status === 'Draft').length;

  const proposalStatusData = [
    { name: 'Accepted', value: mockProposals.filter(p => p.status === 'Accepted').length, fill: 'hsl(var(--chart-1))' },
    { name: 'Sent', value: proposalsSent, fill: 'hsl(var(--chart-2))'  },
    { name: 'Draft', value: draftProposals, fill: 'hsl(var(--chart-3))'  },
    { name: 'Rejected', value: mockProposals.filter(p => p.status === 'Rejected').length, fill: 'hsl(var(--chart-4))' },
  ];

  const chartConfig: ChartConfig = {
    proposals: {
      label: 'Proposals',
    },
    Accepted: {
      label: 'Accepted',
      color: 'hsl(var(--chart-1))',
    },
    Sent: {
      label: 'Sent',
      color: 'hsl(var(--chart-2))',
    },
    Draft: {
      label: 'Draft',
      color: 'hsl(var(--chart-3))',
    },
    Rejected: {
      label: 'Rejected',
      color: 'hsl(var(--chart-4))',
    },
  };


  return (
    <div className="grid gap-6">
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
         <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/dashboard/analytics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Link>
        </Card>
         <Card className="hover:bg-muted/50 transition-colors">
           <Link href="/dashboard/analytics">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Acceptance Rate
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptanceRate.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                +10.5% from last month
              </p>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/dashboard/proposals?status=sent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proposals Sent</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{proposalsSent}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/dashboard/proposals?status=draft">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Proposals</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftProposals}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting completion
            </p>
          </CardContent>
          </Link>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Proposals</CardTitle>
              <CardDescription>
                An overview of your most recent proposals.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/proposals">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProposals.map((proposal) => (
                  <TableRow key={proposal.id}>
                    <TableCell>
                      <div className="font-medium">{proposal.customerName}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(proposal.status)}>
                        {proposal.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${proposal.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(proposal.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle>Proposal Status</CardTitle>
            <CardDescription>A breakdown of all your proposals by their current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={proposalStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {proposalStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend iconSize={10} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
             </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
