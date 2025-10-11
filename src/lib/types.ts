import { Timestamp } from "firebase/firestore";

export type UserProfile = {
  id: string;
  companyName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  defaultTaxRate?: number;
  fixedOverhead?: number;
  desiredProfitMargin?: number;
};

export type Customer = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type ProposalStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

export type Proposal = {
  id: string;
  userId: string;
  customerId: string;
  customerName: string;
  status: ProposalStatus;
  amount: number;
  createdAt: Timestamp;
};

export type PriceBookItem = {
  id: string;
  userId: string;
  name: string;
  category: 'Material' | 'Equipment' | 'Labor';
  cost: number;
  unit: string;
};
