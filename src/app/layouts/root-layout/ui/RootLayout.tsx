import type { FC } from "react";
import { Outlet } from "react-router-dom";

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
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;