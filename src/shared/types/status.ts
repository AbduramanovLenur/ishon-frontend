import { status } from "./../config/status";

export type TStatus = (typeof status)[keyof typeof status];