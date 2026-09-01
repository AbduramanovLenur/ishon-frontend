interface IBaseFields {
  name: string,
  address: string,
  objectLimit: number,
  employeeLimit: number,
}

export interface IManageCompanyFields extends IBaseFields {
  isActive: boolean
}

export type TCreateCompanyFields = IBaseFields;

export interface IUpdateCompanyFields extends IBaseFields {
  companyId: string | number;
  isActive?: boolean
}

export interface IManageCompanyState {
  isOpen: boolean;
  companyId: number | string | null;
}