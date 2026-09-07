import { months } from "../config";

export const formatDate = (date: string | Date): string => {
  const value = new Date(date);

  return `${months[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`;
};

export const formatTime = (date: string | Date): string => {
  return new Intl.DateTimeFormat("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
};