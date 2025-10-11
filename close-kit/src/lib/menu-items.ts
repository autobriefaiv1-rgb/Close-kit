import {
  BarChart3,
  Book,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Users,
  Wand2,
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
    label: 'AI Toolkit',
    href: '/dashboard/tools',
    icon: Wand2,
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
