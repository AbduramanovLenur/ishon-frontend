import { days } from "@shared/config";
import type { TFunction } from "i18next";

export const getWorkingDaysOptions = (t: TFunction) => [
  {
    label: t("days.monday"),
    value: days.MONDAY,
  },
  {
    label: t("days.tuesday"),
    value: days.TUESDAY,
  },
  {
    label: t("days.wednesday"),
    value: days.WEDNESDAY,
  },
  {
    label: t("days.thursday"),
    value: days.THURSDAY,
  },
  {
    label: t("days.friday"),
    value: days.FRIDAY,
  },
  {
    label: t("days.saturday"),
    value: days.SATURDAY,
  },
  {
    label: t("days.sunday"),
    value: days.SUNDAY,
  },
];
