export type OwnershipStatus = "OWNED" | "NOT_OWNED";

export interface ICompany {
  id: string;
  name: string;
  address: string;
  objectLimit: number;
  usedObjectCount: number;
  employeeLimit: number;
  usedEmployeeCount: number;
  ownershipStatus: OwnershipStatus;
  createdAt: string;
  updatedAt: string;
}