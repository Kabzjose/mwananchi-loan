import { ArrowDown } from 'lucide-react';

interface AgentFlowProps {
  steps: string[];
}

export const AgentFlow = ({ steps }: AgentFlowProps) => (
  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex flex-col items-center gap-3">
      {steps.map((step, index) => (
        <div className="flex w-full flex-col items-center gap-3" key={step}>
          <div className="w-full max-w-md rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-ink-900">
            {step}
          </div>
          {index < steps.length - 1 && <ArrowDown aria-hidden="true" className="text-mwananchi-600" size={22} />}
        </div>
      ))}
    </div>
  </div>
);
