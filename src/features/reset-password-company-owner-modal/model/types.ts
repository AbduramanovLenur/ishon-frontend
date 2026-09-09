export interface IResetPasswordFields {
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUpdatePasswordCompanyOwnerFields extends IResetPasswordFields {
  companyOwnerId: string | number;
}

export interface IState {
  isOpen: boolean;
  companyOwnerId: number | string | null;
}