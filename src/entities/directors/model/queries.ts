import { useQuery } from "@tanstack/react-query";

import { companiesOwnerKeys } from "./keys";
import { api } from "../api/api";

export function useCompanyOwnerList(search: string, page: number) {
  return useQuery({
    queryKey: companiesOwnerKeys.list(search, page),
    queryFn: () => api.list(search, page),
  });
}

export function useCompanyOwnerById(companyOwnerId: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: companiesOwnerKeys.byId(companyOwnerId),
    queryFn: () => api.getById(companyOwnerId),
    enabled
  })
}