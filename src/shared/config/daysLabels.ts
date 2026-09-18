import { days } from "@shared/config";
import type { TDays } from "@shared/types";
import type { TFunction } from "i18next";

export const getDaysLabels = (t: TFunction): Record<TDays, string> => ({
  [days.MONDAY]: t("days.monday"),
  [days.TUESDAY]: t("days.tuesday"),
  [days.WEDNESDAY]: t("days.wednesday"),
  [days.THURSDAY]: t("days.thursday"),
  [days.FRIDAY]: t("days.friday"),
  [days.SATURDAY]: t("days.saturday"),
  [days.SUNDAY]: t("days.sunday"),
});
