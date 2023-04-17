import { ReactNode } from 'react';

interface IShowProps {
  condition: boolean;
  children: ReactNode;
}

export default function Show({ condition, children }: IShowProps): JSX.Element | null {
  if (!condition) {
    return null;
  }

  return <>{children}</>;
}
