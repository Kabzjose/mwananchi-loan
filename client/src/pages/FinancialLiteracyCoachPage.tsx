import { Loader2, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '../components/Button';
import { PageShell } from '../components/PageShell';
import { askScoutAgent } from '../services/api';
import type { ChatMessage } from '../types/loan';

const examples = [
  'How do I prepare for school fees?',
  'How should I manage harvest income?',
  'How can I improve my loan eligibility?',
];

export const FinancialLiteracyCoachPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Scout Agent: Ask about budgeting, school fees, harvest income, or improving loan readiness.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: message };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setLoading(true);

    const response = await askScoutAgent(message);
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', content: response }]);
    setLoading(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <PageShell
      eyebrow="Financial literacy coach"
      title="Ask the Scout Agent"
      description="A chatbot-style coaching surface for savings, repayment readiness, and informal trader cash-flow planning."
    >
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-ink-950">Example questions</h2>
          <div className="mt-4 grid gap-3">
            {examples.map((example) => (
              <button
                key={example}
                className="focus-ring rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-white"
                onClick={() => void sendMessage(example)}
                type="button"
              >
                {example}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-h-[560px] flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
                    message.role === 'user' ? 'bg-ink-950 text-white' : 'bg-slate-100 text-ink-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">
                  <Loader2 className="animate-spin" size={16} />
                  Scout Agent is reviewing
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                aria-label="Ask the Scout Agent"
                className="focus-ring min-h-11 flex-1 rounded-md border border-slate-300 px-3 py-3 text-sm"
                placeholder="Ask the Scout Agent"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button type="submit" disabled={loading} icon={<Send size={18} />}>
                Send
              </Button>
            </div>
          </form>
        </section>
      </div>
    </PageShell>
  );
};
