import type { eventTypes } from "../config";

export type TEvent = (typeof eventTypes)[keyof typeof eventTypes];