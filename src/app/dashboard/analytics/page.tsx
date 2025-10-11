
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
import type { Proposal, UserProfile } from '@/lib/types';
import { collection, doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { format, getMonth, getYear, useMemo } from 'date-fns';

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
  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  const proposalsQuery = useMemoFirebase(
    () =>
      userProfile
        ? collection(
            firestore,
            'organizations',
            userProfile.organizationId,
            'proposals'
          )
        : null,
    [firestore, userProfile]
  );
  const { data: proposals, isLoading } = useCollection<Proposal>(proposalsQuery);

  const {
    totalRevenue,
    acceptanceRate,
    avgDealSize,
    proposalsInPlay,
    monthlyChartData,
  } = useMemo(() => {
    if (!proposals) {
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
    const proposalsByMonth = proposals.filter(p => p.status !== 'Draft');

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
