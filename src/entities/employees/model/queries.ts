import { useQuery } from "@tanstack/react-query";

import { api } from "../api/api";
import { employeesKeys } from "./keys";

export function useEmployeeList(search: string, page: number) {
  return useQuery({
    queryKey: employeesKeys.list(search, page),
    queryFn: () => api.list(search, page),
  });
}

export function useEmployeeById(employeeId: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: employeesKeys.byId(employeeId),
    queryFn: () => api.getById(employeeId),
    enabled
  })
}

export function useEmployeeLogin(employeeId: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: employeesKeys.login(employeeId),
    queryFn: () => api.login(employeeId),
    enabled
  })
}