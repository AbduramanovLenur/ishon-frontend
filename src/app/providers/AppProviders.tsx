import { useEffect, type FC, type ReactNode } from "react";
import { App, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import QueryProvider from "./QueryProvider";
import SessionProvider from "./SessionProvider";
import StoreProvider from "./StoreProvider";
import { handleUnauthorized } from "../api";

import { antdLocales } from "@shared/config";
import { setUnauthorizedHandler } from "@shared/api";

interface IProps {
  children: ReactNode;
};

const AppProviders : FC<IProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const locale = antdLocales[i18n.language] || antdLocales.uz;

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
  }, []);

  return (
    <ConfigProvider locale={locale}>
      <StoreProvider>
        <QueryProvider>
          <App>
            <SessionProvider>
              {children}
            </SessionProvider>
          </App>
        </QueryProvider>
      </StoreProvider>
    </ConfigProvider>
  );
}

export default AppProviders;
