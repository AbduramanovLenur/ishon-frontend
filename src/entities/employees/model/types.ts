import type { IManual, TDays, TStatus } from "@shared/types";

export interface IEmployee {
  employeeId: string;
  fullName: string;
  position: string;
  phone: string;
  status: TStatus;
  assignedObject: IManual;
  fileUrl: string;
  workingDays: TDays[];
  createdAt: string;
  updatedAt: string;
}