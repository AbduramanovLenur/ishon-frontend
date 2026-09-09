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

export const formatNumber = (value: string | number): string => {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatHoursMinutes = (time?: string | null): string => {
  if (!time) return "";

  return time.slice(0, 5);
};