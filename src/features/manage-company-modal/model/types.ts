import type { TStatus } from "@shared/types";

interface IBaseFields {
  name: string;
  address: string;
  objectLimit: number;
  employeeLimit: number;
}

export interface IManageCompanyFields extends IBaseFields {
  status: boolean;
}

export type TCreateCompanyFields = IBaseFields;

export interface IUpdateCompanyFields extends IBaseFields {
  companyId: string | number;
  status: TStatus;
}

export interface IManageCompanyState {
  isOpen: boolean;
  companyId: number | string | null;
}