import { useQuery } from "@tanstack/react-query";

import { userKeys } from "./keys";
import { userApi } from "../api/userApi";

export function useUser() {
  return useQuery({
    queryKey: userKeys.user,
    queryFn: userApi.me,
  })
}