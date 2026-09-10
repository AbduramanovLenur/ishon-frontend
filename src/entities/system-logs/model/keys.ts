export const systemLogsKeys = {
  all: ['system-logs'],
  collection: () => [...systemLogsKeys.all, 'list'],
  list: (search: string, page: number) => [...systemLogsKeys.collection(), search, page ]
}