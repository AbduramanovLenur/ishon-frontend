import { days } from "@shared/config";
import type { TDays } from "@shared/types";

export const daysLabels: Record<TDays, string> = {
  [days.MONDAY]: "Dushanba",
  [days.TUESDAY]: "Seshanba",
  [days.WEDNESDAY]: "Chorshanba",
  [days.THURSDAY]: "Payshanba",
  [days.FRIDAY]: "Juma",
  [days.SATURDAY]: "Shanba",
  [days.SUNDAY]: "Yakshanba",
};