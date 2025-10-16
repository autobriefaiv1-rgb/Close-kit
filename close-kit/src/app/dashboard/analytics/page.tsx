'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useFirebase, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import type { Organization, Proposal, UserProfile } from '@/lib/types';
import { collection, doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Lock, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const chartConfig: ChartConfig = {
  proposals: {
    label: 'Proposals Sent',
    color: 'hsl(var(--chart-2))',
  },
  accepted: {
    label: 'Proposals Accepted',
    color: 'hsl(var(--chart-1))',
  },
};

export default function AnalyticsPage() {
  const { firestore, user } = useFirebase();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

   const organizationRef = useMemoFirebase(() => userProfile?.organizationId ? doc(firestore, 'organizations', userProfile.organizationId) : null, [firestore, userProfile]);
  const { data: organization, isLoading: isOrgLoading } = useDoc<Organization>(organizationRef);


  const proposalsQuery = useMemoFirebase(
    () =>
      userProfile && organization?.subscriptionPlan === 'team' && organization?.analyticsEnabled
        ? collection(
            firestore,
            'organizations',
            userProfile.organizationId,
            'proposals'
          )
        : null,
    [firestore, userProfile, organization]
  );
  const { data: proposals, isLoading: isProposalsLoading } = useCollection<Proposal>(proposalsQuery);

  const isLoading = isProfileLoading || isProposalsLoading || isOrgLoading;

  const {
    totalRevenue,
    acceptanceRate,
    avgDealSize,
    proposalsInPlay,
    monthlyChartData,
  } = useMemo(() => {
    if (!proposals || proposals.length === 0) {
      return {
        totalRevenue: 0,
        acceptanceRate: 0,
        avgDealSize: 0,
        proposalsInPlay: 0,
        monthlyChartData: [],
      };
    }

    const acceptedProposals = proposals.filter(p => p.status === 'Accepted');
    const totalRevenue = acceptedProposals.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    const sentOrClosedCount = proposals.filter(p =>
      ['Sent', 'Accepted', 'Rejected'].includes(p.status)
    ).length;
    const acceptanceRate =
      sentOrClosedCount > 0
        ? (acceptedProposals.length / sentOrClosedCount) * 100
        : 0;

    const avgDealSize =
      acceptedProposals.length > 0
        ? totalRevenue / acceptedProposals.length
        : 0;

    const proposalsInPlay = proposals
      .filter(p => p.status === 'Sent')
      .reduce((sum, p) => sum + p.amount, 0);

    const monthlyData: { [key: string]: { proposals: number; accepted: number } } = {};
    const proposalsByMonth = proposals.filter(p => p.status !== 'Draft' && p.createdAt);

    if (proposalsByMonth.length > 0) {
        proposalsByMonth.forEach(proposal => {
            const date = proposal.createdAt.toDate();
            const monthKey = format(date, 'yyyy-MM');
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { proposals: 0, accepted: 0 };
            }
            monthlyData[monthKey].proposals++;
            if (proposal.status === 'Accepted') {
                monthlyData[monthKey].accepted++;
            }
        });
    }

    const monthlyChartData = Object.keys(monthlyData).map(key => ({
        month: format(new Date(key + '-02'), 'MMM yyyy'), // Use day 2 to avoid timezone issues
        proposals: monthlyData[key].proposals,
        accepted: monthlyData[key].accepted,
    })).sort((a,b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    return {
      totalRevenue,
      acceptanceRate,
      avgDealSize,
      proposalsInPlay,
      monthlyChartData,
    };
  }, [proposals]);

  const renderStatCard = (title: string, value: string, description: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-9 w-3/4"/> : <p className="text-3xl font-bold">{value}</p>}
      </CardContent>
    </Card>
  );

  if (isLoading) {
     return (
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36" />)}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (organization?.subscriptionPlan !== 'team') {
     return (
      <Card className="flex flex-col items-center justify-center text-center p-12">
        <div className="bg-primary/10 rounded-full p-4 mb-6">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl mb-2">Upgrade to Unlock Analytics</CardTitle>
        <CardDescription className="max-w-md mb-6">
          The Analytics Dashboard is a premium feature. Upgrade to the Team plan to gain powerful insights into your proposal performance, revenue trends, and team productivity.
        </CardDescription>
        <Button asChild>
          <Link href="/pricing">View Upgrade Options</Link>
        </Button>
      </Card>
    );
  }

  if (!organization.analyticsEnabled) {
      return (
      <Card className="flex flex-col items-center justify-center text-center p-12">
        <div className="bg-primary/10 rounded-full p-4 mb-6">
          <Settings className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl mb-2">Analytics Disabled</CardTitle>
        <CardDescription className="max-w-md mb-6">
          An administrator has disabled the analytics feature for your organization. To re-enable it, please contact your team administrator.
        </CardDescription>
         {userProfile?.role === 'admin' && (
            <Button asChild>
                <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
        )}
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCard('Total Revenue', `$${totalRevenue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`, 'All-time accepted proposals')}
        {renderStatCard('Acceptance Rate', `${acceptanceRate.toFixed(1)}%`, 'Of all sent proposals')}
        {renderStatCard('Average Deal Size', `$${avgDealSize.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`, 'Average of accepted proposals')}
        {renderStatCard('Proposals in Play', `$${proposalsInPlay.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`, 'Value of all sent proposals')}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proposal Performance</CardTitle>
          <CardDescription>
            A monthly overview of sent vs. accepted proposals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            {isLoading ? <Skeleton className="h-full w-full" /> : (
            <ResponsiveContainer>
              <BarChart data={monthlyChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => value.substring(0,3)}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar
                  dataKey="proposals"
                  fill="var(--color-proposals)"
                  radius={4}
                />
                <Bar
                  dataKey="accepted"
                  fill="var(--color-accepted)"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
