import axios from 'axios';
import type { LoanApplication, LoanAssessment, LoanSubmissionPayload, LoanWorkflowResponse } from '../types/loan';

const loanWebhookUrl = import.meta.env.DEV
  ? '/webhook/ujima-loan'
  : (import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined);
const chatbotWebhookUrl = import.meta.env.DEV
  ? '/webhook/ujima-chatbot'
  : (import.meta.env.VITE_N8N_CHATBOT_WEBHOOK_URL as string | undefined);

const calculateMockAssessment = (application: LoanApplication): LoanAssessment => {
  const incomeRatio = application.loanAmount / Math.max(application.monthlyIncome, 1);
  const isInformal =
    application.occupation === 'Market Vendor' ||
    application.occupation === 'Smallholder Farmer' ||
    application.occupation === 'Boda Boda Rider';
  const riskScore = Math.min(82, Math.max(22, Math.round(incomeRatio * 18 + application.numberOfDependents * 4 + (isInformal ? 8 : 2))));
  const requiresHunterAgent = riskScore > 48 || application.occupation === 'Smallholder Farmer';

  return {
    applicantName: application.fullName,
    occupation: application.occupation,
    county: application.county,
    loanAmount: application.loanAmount,
    status: requiresHunterAgent ? 'Escalated to Human Loan Officer' : 'Approved for Tier-1 Review',
    riskScore,
    repaymentCapacity:
      incomeRatio <= 2.5
        ? 'Strong repayment capacity with manageable monthly obligation.'
        : 'Moderate repayment capacity requiring tailored repayment safeguards.',
    seasonalIncomeAssessment:
      application.occupation === 'Smallholder Farmer'
        ? 'Income likely varies by harvest cycle; repayment plan should include seasonal grace windows.'
        : 'Income pattern appears suitable for weekly or monthly micro-repayment scheduling.',
    requiresHunterAgent,
    phoneNumber: application.phoneNumber,
    email: application.email,
    agentContext: {
      decisionPath: [
        'ScoutAgent: initial screening',
        requiresHunterAgent ? 'HunterAgent: detailed check' : 'Tier1: auto-approve checks',
      ],
      explanations: [
        { factor: 'incomeRatio', weight: Math.round(incomeRatio * 10) },
        { factor: 'dependents', weight: application.numberOfDependents * 2 },
      ],
      confidence: Math.max(50, 100 - Math.abs(50 - riskScore)),
    },
    deviceInfo: {
      // Device info is populated client-side; in mock we include placeholders
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      platform: typeof navigator !== 'undefined' ? (navigator as any).platform : undefined,
      timezone: Intl && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined,
      accessTime: new Date().toISOString(),
    },
  };
};

const normalizeStatus = (response: LoanWorkflowResponse | undefined, fallback: LoanAssessment['status']) => {
  if (!response) {
    return fallback;
  }

  if (response.status === 'Human Review Required' || response.approved === false || response.escalated === true) {
  return 'Escalated to Human Loan Officer-Your application is under review by our team. We will contact you if we need more information or once a decision is made.';
}

  if (response.status === 'Bias Safe') {
    return 'Approved — Our team will contact you shortly with next steps';
  }

  if (response.status === 'Approved for Tier-1 Review') {
    return 'Approved — Our team will contact you shortly with next steps';
  }

  return fallback;
};

const mergeWorkflowAssessment = (application: LoanApplication, response?: LoanWorkflowResponse): LoanAssessment => {
  const fallback = calculateMockAssessment(application);

  return {
    ...fallback,
    applicantName: response?.applicantName ?? response?.applicant?.name ?? fallback.applicantName,
   loanAmount: Number(response?.amount) || Number(response?.loanAmount) || fallback.loanAmount,
    status: normalizeStatus(response, fallback.status),
    riskScore: response?.riskScore ?? fallback.riskScore,
    repaymentCapacity: response?.repaymentCapacity ?? fallback.repaymentCapacity,
    seasonalIncomeAssessment: response?.seasonalIncomeAssessment ?? fallback.seasonalIncomeAssessment,
    requiresHunterAgent: response?.requiresHunterAgent ?? response?.escalated ?? fallback.requiresHunterAgent,
    phoneNumber: response?.phoneNumber ?? response?.applicant?.phone ?? fallback.phoneNumber ?? application.phoneNumber,
    email: response?.email ?? response?.applicant?.email ?? fallback.email ?? application.email,
    agentContext: response?.agentContext ?? fallback.agentContext,
    deviceInfo: response?.deviceInfo ?? fallback.deviceInfo,
  };
};

export const submitLoanApplication = async (application: LoanApplication): Promise<LoanAssessment> => {
  if (!loanWebhookUrl) {
    throw new Error('Missing VITE_N8N_WEBHOOK_URL environment variable.');
  }

  const payload: LoanSubmissionPayload = {
    message: application.message,
    applicant: {
      name: application.fullName,
      email: application.email ?? '',
      phone: application.phoneNumber ?? '',
    },
    amount: Number(application.loanAmount),
  };

  try {
    const response = await axios.post<LoanWorkflowResponse>(loanWebhookUrl, payload, {
      timeout: 12000,
    });
    console.log('RAW n8n response:', JSON.stringify(response.data));
console.log('amount value:', response.data.amount);
console.log('loanAmount value:', response.data.loanAmount);
     
    return mergeWorkflowAssessment(application, response.data);
  } catch {
    
    throw new Error('Failed to submit application to the n8n webhook.');
  }
};

export const askScoutAgent = async (message: string): Promise<string> => {
  if (!chatbotWebhookUrl) {
    return `Scout Agent: Start with a simple cash-flow plan for "${message}". Track weekly income, separate school fees or harvest proceeds early, and keep a short repayment history SACCO officers can review.`;
  }

  try {
    const response = await axios.post<{ response?: string; message?: string }>(
      chatbotWebhookUrl,
      { message },
      { timeout: 12000 },
    );

    return response.data.response ?? response.data.message ?? 'Scout Agent received your question and recommends reviewing your cash flow before borrowing.';
  } catch {
    return 'Scout Agent: I could not reach the workflow right now, but a good next step is to document income, expenses, savings group records, and expected seasonal obligations.';
  }
};
