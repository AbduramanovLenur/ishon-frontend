import type { TRoles } from "./roles";

export interface INavigation {
  id: string | number;
  path: string;
  label: string;
  icon: string;
  roles: TRoles[];
}