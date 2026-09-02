import { useQuery } from "@tanstack/react-query";

import { companiesKeys } from "./keys";
import { api } from "../api/api";

export function useCompanyList(search: string, page: number) {
  return useQuery({
    queryKey: companiesKeys.list(search, page),
    queryFn: () => api.list(search, page),
  });
}

export function useCompanyById(companyId: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: companiesKeys.byId(companyId),
    queryFn: () => api.getById(companyId),
    enabled
  })
}

export function useManualCompanyList(enabled: boolean) {
  return useQuery({
    queryKey: companiesKeys.manualList(),
    queryFn: () => api.manualList(),
    enabled
  })
}