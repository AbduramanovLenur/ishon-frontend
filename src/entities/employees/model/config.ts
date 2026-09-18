import type { TFunction } from "i18next";

export const getEventTypes = (t: TFunction) => ({
  ENTER: t("eventTypes.entry"),
  EXIT: t("eventTypes.exit"),
  LATE: t("eventTypes.late"),
  EARLY: t("eventTypes.early"),
  NOT_LEFT: t("eventTypes.notLeft"),
  NOT_CHECKED_IN: t("eventTypes.notCheckedIn")
});
