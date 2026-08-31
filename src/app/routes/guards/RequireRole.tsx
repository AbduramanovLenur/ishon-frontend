import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useLogout } from "@features/auth-form";
import { useUser } from "@entities/user";
import { roleHomeRoutes } from "@shared/config";
import type { TRoles } from "@shared/types";

interface IRequireRoleProps {
  roles: TRoles | TRoles[]
}

const RequireRole: FC<IRequireRoleProps> = ({ roles }) => {
  const { logout } = useLogout();
  const { data: user, error } = useUser();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (error) {
    logout();
  }

  if (user && !allowedRoles.includes(user?.type)) {
    return <Navigate to={roleHomeRoutes[user.type as TRoles]} replace />;
  }

  return <Outlet />;
}

export default RequireRole;