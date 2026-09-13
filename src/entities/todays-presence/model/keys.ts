import type { TWorkStatus } from "@shared/types";

export const todaysPresenceKeys = {
  all: ['todays-presence'],
  collection: () => [...todaysPresenceKeys.all, 'list'],
  list: (search: string, page: number, statusWork: TWorkStatus, objectId: number | string, date: string) => [...todaysPresenceKeys.collection(), search, page, statusWork, objectId, date],
  listCount: () => [...todaysPresenceKeys.all, 'todays-presence-count']
} as const;