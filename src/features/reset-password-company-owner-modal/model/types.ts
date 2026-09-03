export interface IResetPasswordFields {
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUpdatePasswordCompanyOwnerPayload extends IResetPasswordFields {
  companyOwnerId: string | number;
}

export interface IResetPasswordCompanyOwnerState {
  isOpen: boolean;
  companyOwnerId: number | string | null;
}