import React, { ReactNode } from 'react';
import { createContext, useState } from 'react';

export const ExpandContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => '']);
export const ExpandProvider = ({ children }: { children: ReactNode }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <ExpandContext.Provider value={[expanded, setExpanded]}>{children}</ExpandContext.Provider>
  );
};
