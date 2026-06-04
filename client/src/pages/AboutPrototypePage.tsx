import { AgentFlow } from '../components/AgentFlow';
import { InfoCard } from '../components/InfoCard';
import { PageShell } from '../components/PageShell';
import workflowImage from '../assets/image.png';

const builtUsing = ['React', 'TypeScript', 'Tailwind CSS', 'n8n Workflow Automation', 'Vercel Deployment'];

const frameworks = [
  {
    title: 'RANK',
    items: ['Role', 'Authority', 'Notification Triggers', 'Kill Switch'],
  },
  {
    title: 'TRAIL',
    items: ['Transient Memory', 'Relational Memory', 'Archival Memory', 'Inheritance Rules', 'Land Rights'],
  },
  {
    title: 'HUNT',
    items: ['Handoff Triggers', 'Unified Context', 'Negotiation Rules', 'Termination Conditions'],
  },
  {
    title: 'GUARD',
    items: ['Guardrails', 'Unusual Pattern Detection', 'Audit Trail', 'Red Team Testing', 'Dignity Preservation'],
  },
  {
    title: 'CYCLE',
    items: ['Capture', 'Yield Insights', 'Course-Correct', 'Loop Validation', 'Explain'],
  },
];

export const AboutPrototypePage = () => (
  <PageShell
    eyebrow="Assessment page"
    title="About Prototype"
    description="This capstone prototype demonstrates how ethical AI agents can support SACCO lending decisions while protecting dignity, oversight, and regulatory accountability."
  >
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-ink-950">Built Using</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {builtUsing.map((item) => (
            <span key={item} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
              {item}
            </span>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-ink-950">Workflow Automation</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This prototype uses n8n workflows to simulate agent collaboration and loan processing decisions.
        </p>
        <div className="mt-4">
          <img src={workflowImage} alt="n8n workflow" className="w-full rounded-md border border-slate-100 shadow-sm" />
          <p className="mt-2 text-xs text-slate-500">Workflow preview — replace with your screenshot at <span className="font-mono">src/assets/n8n-workflow.svg</span></p>
        </div>
      </section>
    </div>

    <section className="mt-6">
      <h2 className="mb-3 text-lg font-bold text-ink-950">Architecture Diagram</h2>
      <AgentFlow steps={['Member Application', 'Scout Agent', 'Guardian Agent', 'Hunter Agent', 'Human Review']} />
    </section>

    <section className="mt-8">
      <h2 className="mb-4 text-lg font-bold text-ink-950">Frameworks Implemented</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {frameworks.map((framework) => (
          <InfoCard key={framework.title} title={framework.title}>
            <ul className="mt-2 space-y-2">
              {framework.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-mwananchi-600" />
                  {item}
                </li>
              ))}
            </ul>
          </InfoCard>
        ))}
      </div>
    </section>

    <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-ink-950">Regulatory Alignment</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {['Kenya Data Protection Act 2022', 'SASRA Governance Principles', 'Responsible AI Design Practices'].map((item) => (
          <div key={item} className="rounded-md bg-slate-50 p-4 text-sm font-bold text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </section>
  </PageShell>
);
