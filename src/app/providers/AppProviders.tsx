import type { FC, ReactNode } from "react";
import { App, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

import { antdLocales } from "@shared/config";

interface IProps {
  children: ReactNode;
};

const AppProviders : FC<IProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const locale = antdLocales[i18n.language] || antdLocales.uz;

  return (
    <ConfigProvider locale={locale}>
      <StoreProvider>
        <QueryProvider>
          <App>
            {children}
          </App>
        </QueryProvider>
      </StoreProvider>
    </ConfigProvider>
  );
}

export default AppProviders;
