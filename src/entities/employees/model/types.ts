import type { roles } from "@/shared/config";
import type { IManual, TDays, TRoles, TStatus } from "@shared/types";

export interface IEmployee {
  employeeId: string;
  fullName: string;
  position: string;
  phone: string;
  status: TStatus;
  type: Extract<TRoles, typeof roles.COMPANY_ADMIN | typeof roles.EMPLOYEE>;
  assignedObject: IManual;
  fileUrl: string;
  workingDays: TDays[];
  createdAt: string;
  updatedAt: string;
}