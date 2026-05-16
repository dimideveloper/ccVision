import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
};

export function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="auth-card w-full p-8 md:p-10">
      <h1 className="heading-display text-center text-2xl text-[#1d1d1f]">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-center text-sm text-[#6e6e73]">{subtitle}</p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}
