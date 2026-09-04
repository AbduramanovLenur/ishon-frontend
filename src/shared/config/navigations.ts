import { roles } from "./roles";
import { routes } from "./routes";

export const navigations = [
  {
    id: 1,
    label: 'Kompaniyalar',
    path: routes.COMPANIES,
    icon: 'companies',
    role: roles.ADMIN
  },
  {
    id: 2,
    label: 'Direktorlar',
    path: routes.DIRECTORS,
    icon: 'directors',
    role: roles.ADMIN
  },
  {
    id: 3,
    label: 'Dashboard',
    path: routes.DASHBOARD,
    icon: 'dashboard',
    role: roles.COMPANY_OWNER
  },
  {
    id: 4,
    label: 'Obyektlar',
    path: routes.OBJECTS,
    icon: 'objects',
    role: roles.COMPANY_OWNER
  }
] as const;