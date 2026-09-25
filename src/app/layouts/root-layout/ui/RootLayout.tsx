import { Suspense, type FC } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

import { Sidebar } from "@widgets/sidebar";
import { Header } from "@widgets/header";

const RootLayout : FC = () => {
  return (
    <div className="wrapper">
      <div className="horizontal">
        <Sidebar />
        <div className="content">
          <Header />
          <main className="main">
            <Suspense
              fallback={
                <div className="centered main-loading">
                  <Spin size="large" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;