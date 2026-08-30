import { useQuery } from "@tanstack/react-query";

import { manageCompanyKeys } from "./keys";
import { manageCompanyApi } from "../api/manageCompanyApi";

export function useCompanyList(search: string, page: number) {
  return useQuery({
    queryKey: manageCompanyKeys.list(search, page),
    queryFn: () => manageCompanyApi.list(search, page),
  });
}