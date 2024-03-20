import { ReactNode } from 'react';

const Paragraph = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <p className={`opacity-65 ${className}`}>{children}</p>;
};

export default Paragraph;
