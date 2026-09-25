import { useQuery } from "@tanstack/react-query";

import { userKeys } from "./keys";
import { api } from "../api/api";

export function useUser() {
  return useQuery({
    queryKey: userKeys.user,
    queryFn: ({ signal }) => api.me(signal),
  })
}