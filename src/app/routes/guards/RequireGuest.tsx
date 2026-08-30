import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@shared/config";
import { hasValidSession } from "@shared/api";

const RequireGuest: FC = () => {
  if (hasValidSession()) {
    return <Navigate to={routes.HOME} replace />;
  }

  return <Outlet />;
}

export default RequireGuest;
