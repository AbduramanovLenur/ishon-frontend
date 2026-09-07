export const systemLogsKeys = {
  all: ['system-logs'],
  list: (search?: string, page?: number) => [...systemLogsKeys.all, search, page ]
}