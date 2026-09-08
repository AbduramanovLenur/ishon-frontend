export const transformAttendanceDateData = <T extends {
  date: string;
  attendancePercent: number;
}>(data: T[]) => {
  return data.map((item) => ({
    date: item.date,
    value: item.attendancePercent,
  }));
};