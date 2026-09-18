import type { TFunction } from "i18next";

import type { INavigation } from "../types/navigations";
import { roles } from "./roles";
import { routes } from "./routes";

export const getNavigations = (t: TFunction): INavigation[] => [
  {
    id: 1,
    label: t("navigation.companies"),
    path: routes.COMPANIES,
    icon: 'companies',
    roles: [roles.ADMIN]
  },
  {
    id: 2,
    label: t("navigation.directors"),
    path: routes.DIRECTORS,
    icon: 'directors',
    roles: [roles.ADMIN]
  },
  {
    id: 3,
    label: t("navigation.dashboard"),
    path: routes.DASHBOARD,
    icon: 'dashboard',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 4,
    label: t("navigation.objects"),
    path: routes.OBJECTS,
    icon: 'objects',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 5,
    label: t("navigation.employees"),
    path: routes.EMPLOYEES,
    icon: 'employees',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 6,
    label: t("navigation.logs"),
    path: routes.LOGS,
    icon: 'logs',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 7,
    label: t("navigation.todaysPresence"),
    path: routes.TODAYS_PRESENCE,
    icon: 'todays-presence',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  },
  {
    id: 8,
    label: t("navigation.settings"),
    path: routes.SETTINGS,
    icon: 'settings',
    roles: [roles.COMPANY_OWNER, roles.COMPANY_ADMIN]
  }
];