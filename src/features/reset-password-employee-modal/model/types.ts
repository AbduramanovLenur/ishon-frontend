export interface IResetPasswordEmployeeFields {
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUpdatePasswordEmployeeFields extends IResetPasswordEmployeeFields {
  employeeId: string | number;
}

export interface IState {
  isOpen: boolean;
  employeeId: number | string | null;
}