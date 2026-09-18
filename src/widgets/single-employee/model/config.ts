import type { TFunction } from "i18next";
import { earlyValues, eventTypes, lateValues } from "@shared/config";

export const getEvents = (t: TFunction) => [
  {
    label: t("eventTypes.entry"),
    value: eventTypes.ENTER
  },
  {
    label: t("eventTypes.exit"),
    value: eventTypes.EXIT
  },
  {
    label: t("eventTypes.notLeft"),
    value: eventTypes.NOT_LEFT
  },
  {
    label: t("eventTypes.notCheckedIn"),
    value: eventTypes.NOT_CHECKED_IN
  }
];

export const getLateStatuses = (t: TFunction) => [
  {
    label: t("eventTypes.onTime"),
    value: String(lateValues.FALSE)
  },
  {
    label: t("eventTypes.late"),
    value: String(lateValues.TRUE)
  },
];

export const getEarlyStatuses = (t: TFunction) => [
  {
    label: t("eventTypes.onTime"),
    value: String(earlyValues.FALSE)
  },
  {
    label: t("eventTypes.early"),
    value: String(earlyValues.TRUE)
  },
];
