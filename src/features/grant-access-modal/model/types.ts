export interface IGrantAccessFields {
  employeeId: string | number;
  username: string;
  password: string;
}

export interface IState {
  isOpen: boolean;
  employeeId: number | string | null;
}