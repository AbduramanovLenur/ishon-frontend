import { useQuery } from "@tanstack/react-query";

import { systemLogsKeys } from "./keys";
import { api } from "../api/api";

export function useSystemLogList(search: string, page: number, objectId: number | string, from: string, to: string) {
  return useQuery({
    queryKey: systemLogsKeys.list(search, page, objectId, from, to),
    queryFn: () => api.list(search, page, objectId, from, to)
  })
}

export function useSystemLogsExcel(search: string, objectId: number | string, fromDate: string, toDate: string) {
  return useQuery({
    queryKey: systemLogsKeys.excelFilters(search, objectId, fromDate, toDate),
    queryFn: () => api.excel(search, objectId, fromDate, toDate)
  })
}