import { useQuery } from "@tanstack/react-query";

import { todaysPresenceKeys } from "./keys";
import { api } from "../api/api";

import type { TWorkStatus } from "@shared/types";

export function useTodaysPresenceList(search: string, page: number, statusWork: TWorkStatus, objectId: number | string) {
  return useQuery({
    queryKey: todaysPresenceKeys.list(search, page, statusWork, objectId),
    queryFn: () => api.list(search, page, statusWork, objectId),
  });
}

export function useTodaysPresenceListCount() {
  return useQuery({
    queryKey: todaysPresenceKeys.listCount(),
    queryFn: () => api.listCount()
  })
}