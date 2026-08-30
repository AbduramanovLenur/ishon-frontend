import type { FC, ReactNode } from "react";

import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

interface IProps {
  children: ReactNode
};

const AppProviders : FC<IProps> = ({ children }) => {
  return (
    <StoreProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </StoreProvider>
  );
}

export default AppProviders;