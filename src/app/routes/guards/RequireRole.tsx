import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { roleHomeRoutes } from "@shared/config";
import type { Roles } from "@shared/types";

interface IRequireRoleProps {
    roles: Roles
};

const RequireRole: FC<IRequireRoleProps> = ({ roles }) => {
    const currentUser: { role: Roles } = { role: 'superadmin' };
    
    if (!roles.includes(currentUser.role)) {
        return <Navigate to={roleHomeRoutes[currentUser.role]} replace />
    }

    return <Outlet />
}

export default RequireRole;