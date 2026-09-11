import { earlyValues, eventTypes, lateValues } from "@shared/config";

export const events = [
  {
    label: 'Kirish',
    value: eventTypes.ENTER
  },
  {
    label: 'Chiqish',
    value: eventTypes.EXIT
  },
  {
    label: 'Chiqish qayd etilmagan',
    value: eventTypes.NOT_LEFT
  }
];

export const lateStatuses = [
  { 
    label: 'O‘z vaqtida', 
    value: String(lateValues.FALSE)
  },
  { 
    label: 'Kechikdi',
    value: String(lateValues.TRUE)
  },
];

export const earlyStatuses = [
  { 
    label: 'O‘z vaqtida', 
    value: String(earlyValues.FALSE)
  },
  { 
    label: 'Erta ketdi', 
    value: String(earlyValues.TRUE)
  },
];