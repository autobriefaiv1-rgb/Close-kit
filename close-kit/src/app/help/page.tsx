import Link from 'next/link';
import { Logo } from '@/components/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const featureSections = [
  {
    title: 'Core Features',
    features: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        description:
          "The Dashboard is your command center. It provides a real-time overview of your business's health, showcasing key metrics like total revenue from accepted proposals, your overall proposal acceptance rate, and a stream of your most recent activity.",
      },
      {
        id: 'proposals',
        name: 'Proposals',
        description:
          "This is where you'll manage your entire sales pipeline. You can create new proposals, view proposals by status (Draft, Sent, Accepted, Rejected), and track your progress toward closing deals. Our mobile-friendly proposal builder allows you to create and send professional proposals directly from the job site.",
      },
      {
        id: 'customers',
        name: 'Customers',
        description:
          'A simple and effective Customer Relationship Management (CRM) tool. Keep all your customer contact information, addresses, and job history organized in one central location, accessible from anywhere.',
      },
      {
        id: 'pricebook',
        name: 'Price Book',
        description:
          'Your Price Book is the engine of your proposals. It allows you to create and manage a catalog of costs for all your materials, equipment, and labor rates. Maintaining an accurate price book ensures your proposals are both profitable and consistent.',
      },
    ],
  },
  {
    title: 'Team Management (Team Plan)',
    features: [
      {
        id: 'inviting-members',
        name: 'Inviting Members via User Key',
        description:
          "Close Kit uses a unique and secure invitation system based on User Keys. You do **not** invite members by email. The process is simple:",
        steps: [
          '1. The person you want to invite must first sign up for Close Kit on their own to get their unique 8-character User Key.',
          "2. They can find their User Key on their **Settings** page.",
          "3. They must give this User Key to you (the Team Admin).",
          "4. As the Admin, you go to the **Team > Members** page in your dashboard, click 'Invite Member', and enter the User Key they provided.",
          "5. The user will be instantly added to your organization, with all billing consolidated under your Team plan."
        ]
      },
      {
        id: 'roles',
        name: 'Role Management',
        description:
          'On the Team plan, administrators can assign roles to different members on the **Team > Roles** page. There are two roles: **Admin** (can manage team members, roles, and billing) and **Member** (standard access to create proposals and customers).',
      },
    ],
  },
  {
    title: 'AI Toolkit',
    features: [
      {
        id: 'narrative-translator',
        name: 'Narrative Translator (All Plans)',
        description:
          'This tool converts your technical, jargon-filled service notes into clear, customer-friendly explanations. It helps build trust, justifies your work, and reduces follow-up questions from clients.',
      },
      {
        id: 'gbb-generator',
        name: 'Good-Better-Best (GBB) Generator (Team Plan)',
        description:
          'A powerful tool that instantly generates three tiered options for a proposal based on your job details and pricing data. This makes it easy to upsell customers and increase your average ticket size without pressure.',
      },
      {
        id: 'competitor-analysis',
        name: 'Competitor Price Analysis (Team Plan)',
        description:
          'Gain a competitive edge by analyzing market data. This tool takes your job details and known competitor pricing to suggest an optimal pricing strategy, helping you to win more bids while protecting your profit margins.',
      },
    ],
  },
   {
    title: 'Subscription & Billing',
    features: [
      {
        id: 'free-trial',
        name: '7-Day Free Trial',
        description:
          'All new organizations start with a 7-day free trial. During this period, you have full access to the features of the plan you select. Your trial status and end date are always visible on your **Settings** page. After the trial, you must subscribe to a paid plan to continue using the dashboard.',
      },
      {
        id: 'plans',
        name: 'Solo and Team Plans',
        description:
          'Close Kit offers two main plans: **Solo ($69/mo)** for single users, and **Team ($129/mo)** for up to 5 users. The Team plan includes exclusive features like Team Management, the GBB Generator, Competitor Price Analysis, and the Proposal Analytics Dashboard.',
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-secondary/50">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
                Close Kit Help Center
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Your guide to all the features and functionality of the platform.
              </p>
            </div>
            
            <Card>
                <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {featureSections.map((section) => (
                             section.features.map((feature) => (
                                <AccordionItem value={feature.id} key={feature.id}>
                                    <AccordionTrigger className="text-lg font-semibold text-left">{feature.name}</AccordionTrigger>
                                    <AccordionContent className="prose prose-sm max-w-none text-muted-foreground pt-2">
                                        <p>{feature.description}</p>
                                        {feature.steps && (
                                            <ol className="list-decimal pl-5 mt-2 space-y-1">
                                                {feature.steps.map((step, index) => (
                                                    <li key={index} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></li>
                                                ))}
                                            </ol>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                             ))
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
