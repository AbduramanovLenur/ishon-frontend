export const objectsKeys = {
  all: ['objects'],
  list: (search?: string, page?: number) => [...objectsKeys.all, search, page ],
  byId: (objectId: string | number | null) => [...objectsKeys.all, objectId]
}