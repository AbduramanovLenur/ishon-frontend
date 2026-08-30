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
  }
]