export const objectsKeys = {
  all: ['objects'],
  collection: () => [...objectsKeys.all, 'list'],
  list: (search: string, page: number) => [...objectsKeys.collection(), search, page ],
  byId: (objectId: string | number | null) => [...objectsKeys.all, objectId],
  manualList: () => [...objectsKeys.all, 'manual-list']
}