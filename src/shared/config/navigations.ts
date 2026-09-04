import type { INavigation } from "../types/navigations";
import { roles } from "./roles";
import { routes } from "./routes";



export const navigations: INavigation[] = [
  {
    id: 1,
    label: 'Kompaniyalar',
    path: routes.COMPANIES,
    icon: 'companies',
    roles: [roles.ADMIN]
  },
  {
    id: 2,
    label: 'Direktorlar',
    path: routes.DIRECTORS,
    icon: 'directors',
    roles: [roles.ADMIN]
  },
  {
    id: 3,
    label: 'Dashboard',
    path: routes.DASHBOARD,
    icon: 'dashboard',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 4,
    label: 'Obyektlar',
    path: routes.OBJECTS,
    icon: 'objects',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 5,
    label: 'Xodimlar',
    path: routes.EMPLOYEES,
    icon: 'employees',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 6,
    label: 'Jurnallar',
    path: routes.LOGS,
    icon: 'logs',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 7,
    label: 'Bugungi davomat',
    path: routes.TODAYS_PRESENCE,
    icon: 'todays-presence',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  }
] as const;