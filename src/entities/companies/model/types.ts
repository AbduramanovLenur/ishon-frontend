import type { TStatus } from "@shared/types";

export interface ICompany {
  id: string;
  name: string;
  address: string;
  objectLimit: number;
  usedObjectCount: number;
  employeeLimit: number;
  usedEmployeeCount: number;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
}