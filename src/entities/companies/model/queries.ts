import { useQuery } from "@tanstack/react-query";

import { companiesKeys } from "./keys";
import { companiesApi } from "../api/сompaniesApi";

export function useCompanyList(search: string, page: number) {
  return useQuery({
    queryKey: companiesKeys.list(search, page),
    queryFn: () => companiesApi.list(search, page),
  });
}

export function useCompanyById(companyId: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: companiesKeys.byId(companyId),
    queryFn: () => companiesApi.getById(companyId),
    enabled
  })
}