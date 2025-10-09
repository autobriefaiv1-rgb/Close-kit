import {
  BarChart3,
  Book,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  Wrench,
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
];
