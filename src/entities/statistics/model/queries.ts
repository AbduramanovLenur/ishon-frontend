import { useQuery } from "@tanstack/react-query";

import { statisticsKeys } from "./keys";
import { api } from "../api/api";

import type { TPeriod } from "@shared/types";

export function useStatistics() {
  return useQuery({
    queryKey: statisticsKeys.statistics(),
    queryFn: () => api.statistics()
  });
}

export function useStatisticsChart(period: TPeriod) {
  return useQuery({
    queryKey: statisticsKeys.chart(period),
    queryFn: () => api.chart(period)
  });
}