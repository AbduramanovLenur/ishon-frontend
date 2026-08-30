import { Suspense, useEffect, type FC } from "react";
import { RouterProvider } from "react-router-dom";
import { Spin } from "antd";

import { AppProviders } from "./providers";
import router from "./routes";

const App : FC = () => {
  useEffect(() => {
    document.body.classList.add('is-loaded');
  }, []);
  
  return (
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
  );
}

export default App;