interface IBaseFields {
  fullName: string;
  position: string;
  companyId: string | number;
  phone: string | number;
}

export interface IManageCompanyOwnerFields extends IBaseFields {
  username: string;
  password: string;
}

export interface ICreateCompanyOwnerFields extends IBaseFields {
  username: string;
  password: string;
}

export interface IUpdateCompanyOwnerFields extends IBaseFields {
  companyOwnerId: string | number;
}

export interface IManageCompanyOwnerState {
  isOpen: boolean;
  companyOwnerId: number | string | null;
}