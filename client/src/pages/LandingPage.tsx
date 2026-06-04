import { ArrowRight, BadgeCheck, BookOpenCheck, CalendarClock, Scale } from 'lucide-react';
import { brandName } from '../assets/brand';
import { Button } from '../components/Button';
import { InfoCard } from '../components/InfoCard';

const features = [
  {
    title: 'Financial Literacy Support',
    description: 'Scout Agent coaching helps members prepare for fees, seasonal income, and savings goals before borrowing.',
    icon: <BookOpenCheck size={22} />,
  },
  {
    title: 'Ethical Loan Screening',
    description: 'Structured assessment reduces unfair denial patterns for informal traders while preserving credit discipline.',
    icon: <Scale size={22} />,
  },
  {
    title: 'Human Review Protection',
    description: 'Borderline, unusual, or sensitive cases are escalated to a human loan officer before final action.',
    icon: <BadgeCheck size={22} />,
  },
  {
    title: 'Harvest-Aware Repayment Planning',
    description: 'Repayment guidance adapts to harvest cycles, school terms, and daily market cash flow.',
    icon: <CalendarClock size={22} />,
  },
];

const stats = [
  { value: '37%', label: 'projected increase in female vendor approvals' },
  { value: '<3%', label: 'projected default rate' },
  { value: '100%', label: 'African data governance' },
];

export const LandingPage = () => (
  <>
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-mwananchi-700">Ethical AI for SACCO inclusion</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
            {brandName} AI Assistant
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            An ethical AI-powered lending support platform designed to improve financial inclusion for informal traders across East Africa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/apply" icon={<ArrowRight size={18} />}>
              Apply for Loan
            </Button>
            <Button to="/architecture" variant="secondary">
              Explore Agent System
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-soft">
            <div className="rounded-md bg-ink-950 p-5 text-white">
            <p className="text-sm font-semibold text-mwananchi-100">Loan decision support</p>
            <div className="mt-6 grid gap-3">
              {['Bias-aware screening', 'Guardian compliance checks', 'Human escalation ready'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-md bg-white/10 px-4 py-3">
                  <span className="text-sm font-semibold">{item}</span>
                  <span className="rounded-md bg-mwananchi-500 px-2 py-1 text-xs font-bold text-ink-950">Active</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.value} className="rounded-md border border-slate-200 bg-white p-4">
                <p className="text-2xl font-bold text-ink-950">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase leading-5 text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <InfoCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  </>
);
