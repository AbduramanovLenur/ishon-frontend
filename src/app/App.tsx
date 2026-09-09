import { Suspense, useEffect, type FC } from "react";
import { RouterProvider } from "react-router-dom";
import { Spin } from "antd";

import { AppProviders } from "./providers";
import { ErrorBoundary } from "@shared/ui";
import router from "./routes";

const App : FC = () => {
  useEffect(() => {
    document.body.classList.add('is-loaded');
  }, []);
  
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="spin">
            <Spin className="spin-loader" size="large" />
          </div>
        }
      >
        <AppProviders>
          <RouterProvider router={router} />
        </AppProviders>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;