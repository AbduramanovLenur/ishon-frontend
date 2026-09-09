import type { workStatus } from "../config";

export type TWorkStatus = (typeof workStatus)[keyof typeof workStatus];
