import type { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const InfoCard = ({ title, description, icon, children }: InfoCardProps) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-start gap-3">
      {icon && <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ujima-50 text-ujima-700">{icon}</div>}
      <div>
        <h3 className="text-base font-bold text-ink-950">{title}</h3>
        {description && <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>}
      </div>
    </div>
    {children}
  </article>
);
