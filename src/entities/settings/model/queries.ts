import { useQuery } from "@tanstack/react-query";

import { settingsKeys } from "./keys";
import { api } from "../api/api";

export function useGetTelegramSettings() {
  return useQuery({
    queryKey: settingsKeys.telegramSettings(),
    queryFn: () => api.telegramSettings()
  })
}