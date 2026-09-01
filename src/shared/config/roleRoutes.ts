import { roles } from "./roles";
import { routes } from "./routes";

export const roleHomeRoutes = {
  [roles.ADMIN]: routes.COMPANIES,
  [roles.COMPANY_OWNER]: routes.DASHBOARD,
  [roles.COMPANY_ADMIN]: routes.DASHBOARD
} as const;