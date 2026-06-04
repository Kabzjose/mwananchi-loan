import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  to?: string;
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-ink-950 text-white hover:bg-ink-800',
  secondary: 'border border-slate-300 bg-white text-ink-900 hover:bg-slate-50',
  ghost: 'text-ink-800 hover:bg-slate-100',
};

const baseClass =
  'focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60';

export const Button = ({ children, icon, to, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const classes = `${baseClass} ${variantClass[variant]} ${className}`;

  if (to) {
    return (
      <Link className={classes} to={to}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon}
      {children}
    </button>
  );
};
