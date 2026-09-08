import type { IManual, TEvent } from "@shared/types";

export interface IEmployeeEvent {
  eventId: string;
  employeeId: string;
  photoUrl: string;
  eventTime: string;
  fullName: string;
  position: string;
  eventType: TEvent;
  latitude: string;
  longitude: string;
  object: IManual;
  similarity: number;
}