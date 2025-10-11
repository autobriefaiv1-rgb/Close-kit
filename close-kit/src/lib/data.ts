import type { Customer, PriceBookItem, Proposal } from '@/lib/types';

export const mockCustomers: Customer[] = [
  {
    id: 'cus_1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '555-1234',
    address: '123 Main St, Anytown, USA',
    jobHistory: ['prop_1', 'prop_3'],
  },
  {
    id: 'cus_2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '555-5678',
    address: '456 Oak Ave, Anytown, USA',
    jobHistory: ['prop_2'],
  },
  {
    id: 'cus_3',
    name: 'Bob Johnson',
    email: 'bob.j@email.com',
    phone: '555-9012',
    address: '789 Pine Ln, Anytown, USA',
    jobHistory: [],
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 'prop_1',
    customerName: 'John Doe',
    status: 'Accepted',
    amount: 8500,
    createdAt: '2023-10-15',
  },
  {
    id: 'prop_2',
    customerName: 'Jane Smith',
    status: 'Sent',
    amount: 12000,
    createdAt: '2023-10-28',
  },
  {
    id: 'prop_3',
    customerName: 'John Doe',
    status: 'Draft',
    amount: 650,
    createdAt: '2023-11-01',
  },
  {
    id: 'prop_4',
    customerName: 'Alice Williams',
    status: 'Rejected',
    amount: 5200,
    createdAt: '2023-09-20',
  },
];

export const mockPriceBook: PriceBookItem[] = [
  {
    id: 'pb_1',
    name: 'Standard Condenser Unit',
    category: 'Equipment',
    cost: 1800,
    unit: 'Each',
  },
  {
    id: 'pb_2',
    name: 'High-Efficiency Furnace',
    category: 'Equipment',
    cost: 2500,
    unit: 'Each',
  },
  {
    id: 'pb_3',
    name: 'Copper Tubing',
    category: 'Material',
    cost: 5.5,
    unit: 'per foot',
  },
  {
    id: 'pb_4',
    name: 'Senior HVAC Technician',
    category: 'Labor',
    cost: 120,
    unit: 'per hour',
  },
  {
    id: 'pb_5',
    name: 'Apprentice Labor',
    category: 'Labor',
    cost: 65,
    unit: 'per hour',
  },
];
