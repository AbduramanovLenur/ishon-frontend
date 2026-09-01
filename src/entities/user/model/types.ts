import type { TRoles } from "@shared/types";

export interface IUser {
  id: string;
  fullName: string;
  phone: string;
  position: string;
  type: TRoles;
  companyId: string;
  companyOwnerId: string;
  employeeId: string;
}