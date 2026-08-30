import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { roleHomeRoutes } from "@shared/config";
import type { TRoles } from "@shared/types";

interface IRequireRoleProps {
    roles: TRoles
};

const RequireRole: FC<IRequireRoleProps> = ({ roles }) => {
    const currentUser: { role: TRoles } = { role: 'ADMIN' };
    
    if (!roles.includes(currentUser.role)) {
        return <Navigate to={roleHomeRoutes[currentUser.role]} replace />
    }

    return <Outlet />
}

export default RequireRole;