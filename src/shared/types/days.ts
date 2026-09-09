import { days } from "../config";

export type TDays = (typeof days)[keyof typeof days];