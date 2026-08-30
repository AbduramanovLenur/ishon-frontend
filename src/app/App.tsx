import { useEffect, type FC } from "react";
import { RouterProvider } from "react-router-dom";

import { AppProviders } from "./providers";
import { router } from "./routes";

const App : FC = () => {
  useEffect(() => {
    document.body.classList.add('is-loaded');
  }, []);
  
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;