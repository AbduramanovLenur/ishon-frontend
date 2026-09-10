import type { TWorkStatus } from "@shared/types";

export const todaysPresenceKeys = {
  all: ['todays-presence'],
  collection: () => [...todaysPresenceKeys.all, 'list'],
  list: (search: string, page: number, statusWork: TWorkStatus, objectId: number | string) => [...todaysPresenceKeys.collection(), search, page, statusWork, objectId],
  listCount: () => [...todaysPresenceKeys.all, 'todays-presence-count']
} as const;