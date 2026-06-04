import { AgentFlow } from '../components/AgentFlow';
import { InfoCard } from '../components/InfoCard';
import { PageShell } from '../components/PageShell';
import { StatusBadge } from '../components/StatusBadge';

const agents = [
  {
    title: 'Frontend (React)',
    description: 'Collects member data, shows results, and provides financial literacy coaching through responsive dashboard pages.',
  },
  {
    title: 'n8n Workflow',
    description: 'Coordinates webhook intake, agent routing, context passing, audit logging, and fallback decision paths.',
  },
  {
    title: 'Scout Agent',
    description: 'Guides members, reviews affordability signals, and prepares inclusive application context.',
  },
  {
    title: 'Guardian Agent',
    description: 'Applies fairness, compliance, privacy, and dignity guardrails before decision support is presented.',
  },
  {
    title: 'Hunter Agent',
    description: 'Investigates unusual or incomplete cases, requests added context, and prevents premature rejection.',
  },
  {
    title: 'Human Loan Officer',
    description: 'Owns final accountability for sensitive, escalated, or borderline decisions.',
  },
];

export const ArchitecturePage = () => (
  <PageShell
    eyebrow="System architecture"
    title="Agent-Based Lending Workflow"
    description="A presentation-ready view of how the React frontend connects to n8n workflow automation and ethical loan support agents."
  >
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <AgentFlow steps={['Frontend (React)', 'n8n Workflow', 'Scout Agent', 'Guardian Agent', 'Hunter Agent', 'Human Loan Officer']} />
      </section>
      <section className="grid gap-4">
        {agents.map((agent, index) => (
          <InfoCard key={agent.title} title={agent.title} description={agent.description}>
            <StatusBadge label={index < 2 ? 'Platform layer' : index === 5 ? 'Human oversight' : 'Agent layer'} tone={index === 5 ? 'gold' : 'blue'} />
          </InfoCard>
        ))}
      </section>
    </div>
  </PageShell>
);
