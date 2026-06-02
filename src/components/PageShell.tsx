import type { ReactNode } from 'react';

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export const PageShell = ({ eyebrow, title, description, children }: PageShellProps) => (
  <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <div className="mb-8 max-w-3xl">
      {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-wide text-ujima-700">{eyebrow}</p>}
      <h1 className="text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{title}</h1>
      {description && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>}
    </div>
    {children}
  </section>
);
