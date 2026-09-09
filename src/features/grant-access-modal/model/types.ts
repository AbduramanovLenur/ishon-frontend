export interface IGrantAccessFields {
  username: string;
  password: string;
}

export interface IUpdateAccessFields extends IGrantAccessFields {
  employeeId: string | number;
}

export interface IState {
  isOpen: boolean;
  employeeId: number | string | null;
}