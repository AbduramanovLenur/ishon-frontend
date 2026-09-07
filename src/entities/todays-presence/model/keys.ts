import type { TWorkStatus } from "@shared/types";

export const todaysPresenceKeys = {
  all: ['todays-presence'],
  list: (search?: string, page?: number, statusWork?: TWorkStatus) => [...todaysPresenceKeys.all, search, page, statusWork],
  listCount: () => [...todaysPresenceKeys.all, 'todays-presence-count']
} as const;