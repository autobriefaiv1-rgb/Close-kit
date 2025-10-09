export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  jobHistory: string[];
};

export type ProposalStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

export type Proposal = {
  id: string;
  customerName: string;
  status: ProposalStatus;
  amount: number;
  createdAt: string;
};

export type PriceBookItem = {
  id: string;
  name: string;
  category: 'Material' | 'Equipment' | 'Labor';
  cost: number;
  unit: string;
};
