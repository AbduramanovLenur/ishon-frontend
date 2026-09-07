import type { TEvent } from "@shared/types";

export interface IEventObject {
  id: string;
  name: string;
}

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
  object: IEventObject;
  similarity: number;
}