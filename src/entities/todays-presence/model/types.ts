import type { TWorkStatus } from "@shared/types";

export interface IEmployee {
  employeeId: string;
  photoUrl: string;
  fullName: string;
  position: string;
  objectId: string;
  objectName: string;
  status: TWorkStatus;
  lastSeenDate: string;
  checkInTime: string;
  checkOutTime: string;
}

export interface IEmployeesPagination {
  content: IEmployee[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface IEmployeeCounts {
  totalEmployees: number;
  atWork: number;
  left: number;
  notCheckedIn: number;
  notLeft: number;
}

export interface IEmployeesResponse {
  selectedStatus: TWorkStatus;
  employees: IEmployeesPagination;
}