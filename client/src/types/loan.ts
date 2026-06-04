export type Occupation =
  | 'Market Vendor'
  | 'Smallholder Farmer'
  | 'Boda Boda Rider'
  | 'Formal Employee'
  | 'Other';

export type County = 'Nairobi' | 'Kakamega' | 'Busia' | 'Kisumu' | 'Mombasa';

export interface LoanApplication {
  fullName: string;
  message: string;
  occupation: Occupation;
  county: County;
  phoneNumber?: string;
  email?: string;
  monthlyIncome: number;
  numberOfDependents: number;
  loanAmount: number;
}

export interface LoanAssessment {
  applicantName: string;
  occupation: Occupation;
  county: County;
  loanAmount: number;
  status: 'Approved for Tier-1 Review' | 'Escalated to Human Loan Officer' | 'Human Review Required' | 'Bias Safe';
  riskScore: number;
  repaymentCapacity: string;
  seasonalIncomeAssessment: string;
  requiresHunterAgent: boolean;
  phoneNumber?: string;
  email?: string;
  agentContext?: {
    decisionPath: string[];
    explanations: { factor: string; weight: number }[];
    confidence: number; // 0-100
  };
  deviceInfo?: {
    userAgent?: string;
    platform?: string;
    timezone?: string;
    accessTime?: string; // ISO timestamp
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface LoanSubmissionPayload {
  message: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
  };
  amount: number;
}

export interface LoanWorkflowResponse {
  applicantName?: string;
  applicant?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  amount?: number;
  loanAmount?: number;
  approved?: boolean;
  escalated?: boolean;
  status?: string;
  riskScore?: number;
  riskFlags?: number;
  requiresHunterAgent?: boolean;
  repaymentCapacity?: string;
  seasonalIncomeAssessment?: string;
  phoneNumber?: string;
  email?: string;
  agentContext?: LoanAssessment['agentContext'];
  deviceInfo?: LoanAssessment['deviceInfo'];
}
