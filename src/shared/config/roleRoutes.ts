import { roles } from "./roles";
import { routes } from "./routes";

export const roleHomeRoutes = {
  [roles.SUPERADMIN]: routes.COMPANIES,
  [roles.ADMIN]: routes.DASHBOARD
}