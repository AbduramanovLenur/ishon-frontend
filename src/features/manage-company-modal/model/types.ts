export interface IManageCompanyFields {
  name: string,
  address: string,
  objectLimit: number,
  employeeLimit: number,
  isActive?: boolean
}

export interface IUpdateCompanyFields extends IManageCompanyFields {
  companyId: string | number;
}

export interface IManageCompanyState {
  isOpen: boolean;
  companyId: number | string | null;
}