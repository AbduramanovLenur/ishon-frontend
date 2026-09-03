export interface IPhoneNumber {
  countryCode: number;
  areaCode: string;
  phoneNumber: string;
  isoCode: string;
  valid: (strict?: boolean) => boolean;
}

interface IBaseFields {
  fullName: string;
  position: string;
  companyId: string | number;
  phone: string;
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
  username: string;
  companyOwnerId: string | number;
}

export interface IState {
  isOpen: boolean;
  companyOwnerId: number | string | null;
}