import { Loader2, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { PageShell } from '../components/PageShell';
import { saveLoanAssessment } from '../hooks/useLoanAssessment';
import { submitLoanApplication } from '../services/api';
import type { County, LoanApplication, Occupation } from '../types/loan';

const occupations: Occupation[] = ['Market Vendor', 'Smallholder Farmer', 'Boda Boda Rider', 'Formal Employee', 'Other'];
const counties: County[] = ['Nairobi', 'Kakamega', 'Busia', 'Kisumu', 'Mombasa'];

const initialForm: LoanApplication = {
  fullName: '',
  message: '',
  occupation: 'Market Vendor',
  county: 'Nairobi',
  phoneNumber: '',
  email: '',
  monthlyIncome: 0,
  numberOfDependents: 0,
  loanAmount: 0,
};

export const LoanApplicationPage = () => {
  const [form, setForm] = useState<LoanApplication>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateField = <K extends keyof LoanApplication>(key: K, value: LoanApplication[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const assessment = await submitLoanApplication(form);
      saveLoanAssessment(assessment);
      navigate('/results');
    } catch {
      setError('Unable to process this application. Please review the fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      eyebrow="Loan application"
      title="Applicant Information"
      description="Submit a Mwananchi Loan application directly to the n8n webhook. The message field is required because it drives the Scout Agent stress check."
    >
      <form onSubmit={handleSubmit} className="max-w-3xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-sm font-bold text-ink-900">Full Name</span>
            <input
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              required
              value={form.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              placeholder="Grace Achieng"
            />
          </label>
          <label className="sm:col-span-2">
            <span className="text-sm font-bold text-ink-900">Loan Message</span>
            <textarea
              className="focus-ring mt-2 min-h-32 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              required
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              placeholder="I am struggling to pay school fees and need support to cover this term."
            />
            <p className="mt-2 text-xs leading-5 text-slate-500">Use this to describe your situation in plain language. It is sent to n8n as the `message` field.</p>
          </label>
          <label>
            <span className="text-sm font-bold text-ink-900">Phone Number</span>
            <input
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              required
              type="tel"
              value={form.phoneNumber || ''}
              onChange={(event) => updateField('phoneNumber', event.target.value)}
              placeholder="+254700000000"
            />
          </label>
          <label>
            <span className="text-sm font-bold text-ink-900">Email</span>
            <input
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              required
              type="email"
              value={form.email || ''}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="grace@example.com"
            />
          </label>
          <label>
            <span className="text-sm font-bold text-ink-900">Occupation</span>
            <select
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              value={form.occupation}
              onChange={(event) => updateField('occupation', event.target.value as Occupation)}
            >
              {occupations.map((occupation) => (
                <option key={occupation}>{occupation}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-sm font-bold text-ink-900">County</span>
            <select
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              value={form.county}
              onChange={(event) => updateField('county', event.target.value as County)}
            >
              {counties.map((county) => (
                <option key={county}>{county}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-sm font-bold text-ink-900">Monthly Income</span>
            <input
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              min={1}
              required
              type="number"
              value={form.monthlyIncome || ''}
              onChange={(event) => updateField('monthlyIncome', Number(event.target.value))}
              placeholder="18000"
            />
          </label>
          <label>
            <span className="text-sm font-bold text-ink-900">Number of Dependents</span>
            <input
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              min={0}
              required
              type="number"
              value={form.numberOfDependents || ''}
              onChange={(event) => updateField('numberOfDependents', Number(event.target.value))}
              placeholder="3"
            />
          </label>
          <label className="sm:col-span-2">
            <span className="text-sm font-bold text-ink-900">Loan Amount</span>
            <input
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm"
              min={1}
              required
              type="number"
              value={form.loanAmount || ''}
              onChange={(event) => updateField('loanAmount', Number(event.target.value))}
              placeholder="45000"
            />
          </label>
        </div>
        {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={loading} icon={loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}>
            {loading ? 'Processing' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </PageShell>
  );
};
