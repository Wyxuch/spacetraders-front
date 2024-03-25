import { ReactNode } from 'react';

const Span = ({ children, className }: { children: ReactNode; className: string }) => {
  return <span className={`opacity-65 ${className}`}>{children}</span>;
};

export default Span;
