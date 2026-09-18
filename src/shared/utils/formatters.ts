import type { TFunction } from "i18next";
import { getMonths } from "../config";

export const formatDate = (date: string | Date, t: TFunction): string => {
  const value = new Date(date);
  const months = getMonths(t);

  return `${months[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`;
};

export const formatDateToDisplay = (date: string, t: TFunction): string => {
  if (!date) {
    return '';
  }

  const [day, month, year] = date.split('-');
  const months = getMonths(t);

  return `${months[Number(month) - 1]} ${day}, ${year}`;
};

export const formatTime = (date: string | Date, lang?: string): string => {
  return new Intl.DateTimeFormat(lang || "uz-UZ", {
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
