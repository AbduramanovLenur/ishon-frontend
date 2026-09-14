import { useQuery } from "@tanstack/react-query";

import { todaysPresenceKeys } from "./keys";
import { api } from "../api/api";

import type { TWorkStatus } from "@shared/types";

export function useTodaysPresenceList(search: string, page: number, statusWork: TWorkStatus, objectId: number | string, date: string) {
  return useQuery({
    queryKey: todaysPresenceKeys.list(search, page, statusWork, objectId, date),
    queryFn: () => api.list(search, page, statusWork, objectId, date),
  });
}

export function useTodaysPresenceListCount(date: string) {
  return useQuery({
    queryKey: todaysPresenceKeys.collectionCount(date),
    queryFn: () => api.collectionCount(date)
  })
}