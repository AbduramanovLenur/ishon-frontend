import { useQuery } from "@tanstack/react-query";

import { objectsKeys } from "./keys";
import { api } from "../api/api";

export function useObjectList(search: string, page: number) {
  return useQuery({
    queryKey: objectsKeys.list(search, page),
    queryFn: () => api.list(search, page)
  })
}

export function useObjectById(objectId: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: objectsKeys.byId(objectId),
    queryFn: () => api.getById(objectId),
    enabled
  })
}