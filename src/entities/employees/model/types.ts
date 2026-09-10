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
  fileId: string | number;
  workingDays: TDays[];
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeAdmin {
  employeeId: string;
  companyId: string;
  fullName: string;
  phone: string;
  position: string;
  active: boolean;
  promotedAt: string;
  createdAt: string;
}

export interface IEmployeeLogin {
  login: string;
}