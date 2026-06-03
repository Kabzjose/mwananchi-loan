import { Link } from 'react-router-dom';
import { AgentFlow } from '../components/AgentFlow';
import { Button } from '../components/Button';
import { PageShell } from '../components/PageShell';
import { StatusBadge } from '../components/StatusBadge';
import { useLoanAssessment } from '../hooks/useLoanAssessment';

export const LoanResultsPage = () => {
  const assessment = useLoanAssessment();

  if (!assessment) {
    return (
      <PageShell title="Loan Assessment Results" description="No application assessment is currently stored for this session.">
        <Button to="/apply">Start Application</Button>
      </PageShell>
    );
  }

  const flow = ['Applicant', 'Scout Agent', 'Guardian Agent', ...(assessment.requiresHunterAgent ? ['Hunter Agent'] : []), 'Human Review'];

  return (
    <PageShell
      eyebrow="Assessment results"
      title="Loan Assessment Results"
      description="Decision support output from the agent workflow, with human review protection included for governance."
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-ink-950">Application Summary</h2>
            <StatusBadge label={assessment.status} tone={assessment.status.includes('Escalated') ? 'gold' : 'green'} />
          </div>
          <dl className="grid gap-4 text-sm">
            {[
              ['Applicant Name', assessment.applicantName],
              ['Occupation', assessment.occupation],
              ['County', assessment.county],
              ['Loan Amount', `KES ${assessment.loanAmount.toLocaleString()}`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="font-semibold text-slate-500">{label}</dt>
                <dd className="text-right font-bold text-ink-950">{value}</dd>
              </div>
            ))}
          </dl>
          <Link to="/apply" className="mt-5 inline-block text-sm font-bold text-mwananchi-700 hover:text-mwananchi-600">
            Review another application
          </Link>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-ink-950">Agent Journey</h2>
          <AgentFlow steps={flow} />
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-ink-950">Results Card</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-500">Risk Score</p>
            <p className="mt-2 text-3xl font-bold text-ink-950">{assessment.riskScore}</p>
              <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-mwananchi-600" style={{ width: `${Math.min(assessment.riskScore, 100)}%` }} />
            </div>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-500">Repayment Capacity</p>
            <p className="mt-2 text-sm leading-6 text-ink-900">{assessment.repaymentCapacity}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-500">Seasonal Income Assessment</p>
            <p className="mt-2 text-sm leading-6 text-ink-900">{assessment.seasonalIncomeAssessment}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
};
