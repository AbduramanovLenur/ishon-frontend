import type { TWorkStatus } from "@shared/types";

export const todaysPresenceKeys = {
  all: ['todays-presence'],
  list: (search?: string, page?: number, statusWork?: TWorkStatus, objectId?: number | string) => [...todaysPresenceKeys.all, search, page, statusWork, objectId],
  listCount: () => [...todaysPresenceKeys.all, 'todays-presence-count']
} as const;