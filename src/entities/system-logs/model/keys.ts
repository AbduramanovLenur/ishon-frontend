export const systemLogsKeys = {
  all: ['system-logs'],
  collection: () => [...systemLogsKeys.all, 'list'],
  list: (search: string, page: number, objectId: number | string, from: string, to: string) => [...systemLogsKeys.collection(), search, page, objectId, from, to]
}