export type Occupation =
  | 'Market Vendor'
  | 'Smallholder Farmer'
  | 'Boda Boda Rider'
  | 'Formal Employee'
  | 'Other';

export type County = 'Nairobi' | 'Kakamega' | 'Busia' | 'Kisumu' | 'Mombasa';

export interface LoanApplication {
  fullName: string;
  occupation: Occupation;
  county: County;
  monthlyIncome: number;
  numberOfDependents: number;
  loanAmount: number;
}

export interface LoanAssessment {
  applicantName: string;
  occupation: Occupation;
  county: County;
  loanAmount: number;
  status: 'Approved for Tier-1 Review' | 'Escalated to Human Loan Officer';
  riskScore: number;
  repaymentCapacity: string;
  seasonalIncomeAssessment: string;
  requiresHunterAgent: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
