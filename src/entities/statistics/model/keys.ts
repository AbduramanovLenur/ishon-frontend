import type { TPeriod } from "@shared/types";

export const statisticsKeys = {
  all: ['statistics'],
  statistics: () => [...statisticsKeys.all, 'stats'],
  chart: (period: TPeriod) => [...statisticsKeys.all, 'chart', period]
}