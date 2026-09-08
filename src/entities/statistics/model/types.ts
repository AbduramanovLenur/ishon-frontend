import type { TPeriod } from "@shared/types";

export interface IAttendanceStatistics {
  totalEmployees: number;
  currentlyWorking: number;
  notCheckedIn: number;
}

export interface IAttendanceChart {
  period: TPeriod;
  from: string;
  to: string;
  chart: IAttendanceChartItem[];
}

export interface IAttendanceChartItem {
  date: string;
  checkedInEmployees: number;
  totalEmployees: number;
  attendancePercent: number;
}