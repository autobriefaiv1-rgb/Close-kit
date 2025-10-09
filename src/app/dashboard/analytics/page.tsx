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
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: 'January', proposals: 186, accepted: 80 },
  { month: 'February', proposals: 305, accepted: 200 },
  { month: 'March', proposals: 237, accepted: 120 },
  { month: 'April', proposals: 73, accepted: 190 },
  { month: 'May', proposals: 209, accepted: 130 },
  { month: 'June', proposals: 214, accepted: 140 },
];

const chartConfig: ChartConfig = {
  proposals: {
    label: 'Proposals',
    color: 'hsl(var(--primary))',
  },
  accepted: {
    label: 'Accepted',
    color: 'hsl(var(--accent))',
  },
};

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Last 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$125,430.50</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Acceptance Rate</CardTitle>
            <CardDescription>Last 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">82%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Deal Size</CardTitle>
            <CardDescription>Last 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$4,821.20</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Customers</CardTitle>
            <CardDescription>Last 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">+42</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proposal Performance</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="proposals" fill="var(--color-proposals)" radius={4} />
                <Bar dataKey="accepted" fill="var(--color-accepted)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
