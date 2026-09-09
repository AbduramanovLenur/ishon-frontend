import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useLogout } from "@features/auth-form";
import { useUser } from "@entities/user";
import { roleHomeRoutes, roles as userRoles } from "@shared/config";
import type { TRoles } from "@shared/types";

interface IRequireRoleProps {
  roles: TRoles | TRoles[];
}

const RequireRole: FC<IRequireRoleProps> = ({ roles }) => {
  const { logout } = useLogout();
  const { data: user, error } = useUser();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (error) {
    logout();
  }

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.type)) {
    return <Navigate to={roleHomeRoutes[user.type as Exclude<TRoles, typeof userRoles.EMPLOYEE>]} replace />;
  }

  return <Outlet />;
}

export default RequireRole;