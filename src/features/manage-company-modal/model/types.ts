export interface IManageCompanyFields {
  name: string,
  address: string,
  objectLimit: number,
  employeeLimit: number,
  isActive: boolean
}

export interface IManageCompanyState {
  isOpen: boolean;
  companyId: number | string | null;
}

export type OwnershipStatus = "OWNED" | "NOT_OWNED";

export interface ICompany {
  id: string;
  name: string;
  address: string;
  objectLimit: number;
  usedObjectCount: number;
  employeeLimit: number;
  usedEmployeeCount: number;
  ownershipStatus: OwnershipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IApiError {
  code: number;
  key: string;
  message: string;
  path: string;
  details: Record<string, string>;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  error: IApiError | null;
  timestamp: string;
}

export interface IPaginatedData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}