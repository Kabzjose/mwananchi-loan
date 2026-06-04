import { useEffect, useState } from 'react';
import type { LoanAssessment } from '../types/loan';

const storageKey = 'mwananchi-loan-assessment';

export const saveLoanAssessment = (assessment: LoanAssessment) => {
  sessionStorage.setItem(storageKey, JSON.stringify(assessment));
};

export const useLoanAssessment = () => {
  const [assessment, setAssessment] = useState<LoanAssessment | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      setAssessment(JSON.parse(stored) as LoanAssessment);
    }
  }, []);

  return assessment;
};
