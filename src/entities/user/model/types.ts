import type { TRoles } from "@shared/types";

export interface IUserResponse {
  success: boolean;
  data: IUser;
  error: IApiError | null;
  timestamp: string;
}

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

export interface IApiError {
  code: number;
  key: string;
  message: string;
  path: string;
  details: Record<string, string>;
}