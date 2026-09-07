import { useQuery } from "@tanstack/react-query";

import { systemLogsKeys } from "./keys";
import { api } from "../api/api";

export function useSystemLogList(search: string, page: number) {
  return useQuery({
    queryKey: systemLogsKeys.list(search, page),
    queryFn: () => api.list(search, page)
  })
}