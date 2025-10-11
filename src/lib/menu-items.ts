import {
  BarChart3,
  Book,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Users,
  Wrench,
  Users2,
} from 'lucide-react';

export const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Proposals',
    href: '/dashboard/proposals',
    icon: FileText,
  },
  {
    label: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
  },
    {
    label: 'Team',
    href: '/dashboard/team',
    icon: Users2,
  },
  {
    label: 'Price Book',
    href: '/dashboard/price-book',
    icon: Book,
  },
  {
    label: 'AI Tools',
    isGroup: true,
  },
  {
    label: 'GBB Generator',
    href: '/dashboard/tools/gbb-generator',
    icon: Wrench,
  },
  {
    label: 'Narrative Translator',
    href: '/dashboard/tools/translator',
    icon: Wrench,
  },
  {
    label: 'Competitor Analysis',
    href: '/dashboard/tools/competitor-analysis',
    icon: Wrench,
  },
   {
    label: 'Reports',
    isGroup: true,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    label: 'Account',
    isGroup: true,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    label: 'Support',
    href: '/support',
    icon: LifeBuoy,
  },
];
