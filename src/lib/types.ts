import { Timestamp } from "firebase/firestore";

export type Organization = {
  id: string;
  name: string;
  ownerId: string;
  subscriptionPlan?: 'solo' | 'team';
}

export type UserProfile = {
  id: string; // matches auth uid
  organizationId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  role?: 'admin' | 'member';
  trade?: 'hvac' | 'plumbing' | 'electrical' | 'other';
  companySize?: '1-5' | '6-15' | '16-50' | '50+';
};

export type Customer = {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type ProposalStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

export type Proposal = {
  id:string;
  organizationId: string;
  customerId: string;
  customerName: string; // Denormalized
  status: ProposalStatus;
  amount: number;
  createdAt: Timestamp;
};

export type PriceBookItem = {
  id: string;
  organizationId: string;
  name: string;
  category: 'Material' | 'Equipment' | 'Labor';
  cost: number;
  unit: string;
};
