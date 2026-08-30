import type { TRoles } from "@shared/types";

export interface IAuthFields {
  username: string;
  password: string;
}

export interface IAuthUser {
  id: string;
  fullName: string;
  phone: string;
  position: string;
  type: TRoles;
  companyId: string;
  companyOwnerId: string;
  employeeId: string;
}

export interface IAuthData {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  user: IAuthUser;
}

export interface IApiErrorDetails {
  [key: string]: string;
}

export interface IApiError {
  code: number;
  key: string;
  message: string;
  path: string;
  details: IApiErrorDetails;
}

export interface IAuthResponse {
  success: boolean;
  data: IAuthData;
  error: IApiError | null;
  timestamp: string;
}