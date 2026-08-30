import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@shared/config";
import { hasValidSession } from "@shared/api";

const RequireAuth: FC = () => {
  if (!hasValidSession()) {
    return <Navigate to={routes.AUTH} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;