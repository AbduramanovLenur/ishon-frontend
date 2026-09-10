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
  });
}

export function useEmployeeUsername(employeeId: string | number | null, enabled: boolean) {
  return useQuery({
    queryKey: employeesKeys.username(employeeId),
    queryFn: () => api.username(employeeId),
    enabled
  });
}

export function useEmployeeProfile(employeeId: string | number) {
  return useQuery({
    queryKey: employeesKeys.profile(employeeId),
    queryFn: () => api.profile(employeeId)
  });
}

export function useEmployeeHistory(
  employeeId: string | number,
  eventType: string,
  late: boolean | null,
  early: boolean | null,
  page: number
) {
  return useQuery({
    queryKey: employeesKeys.history(employeeId, eventType, late, early, page),
    queryFn: () => api.history(employeeId, eventType, late, early, page)
  });
}