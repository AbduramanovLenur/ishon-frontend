export interface IManageCompanyFields {
  name: string,
  address: string,
  objectLimit: number,
  employeeLimit: number,
  isActive?: boolean
}

export interface IManageCompanyState {
  isOpen: boolean;
  companyId: number | string | null;
}