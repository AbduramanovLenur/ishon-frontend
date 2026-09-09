import { type FC } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@entities/user";
import { roleHomeRoutes, roles } from "@shared/config";
import type { TRoles } from "@shared/types";

const IndexRedirect: FC = () => {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return <Navigate to={roleHomeRoutes[user.type as Exclude<TRoles, typeof roles.EMPLOYEE>]} replace />;
}

export default IndexRedirect;