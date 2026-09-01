import type { FC, ReactNode } from "react";
import { App } from "antd";

import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

interface IProps {
  children: ReactNode;
};

const AppProviders : FC<IProps> = ({ children }) => {
  return (
    <StoreProvider>
      <QueryProvider>
        <App>
          {children}
        </App>
      </QueryProvider>
    </StoreProvider>
  );
}

export default AppProviders;