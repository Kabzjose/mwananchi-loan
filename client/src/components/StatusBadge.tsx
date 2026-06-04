interface StatusBadgeProps {
  label: string;
  tone?: 'green' | 'gold' | 'blue';
}

const toneClass = {
  green: 'bg-mwananchi-50 text-mwananchi-700 ring-mwananchi-100',
  gold: 'bg-gold-100 text-gold-700 ring-orange-100',
  blue: 'bg-sky-50 text-sky-700 ring-sky-100',
};

export const StatusBadge = ({ label, tone = 'green' }: StatusBadgeProps) => (
  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ring-1 ${toneClass[tone]}`}>
    {label}
  </span>
);
