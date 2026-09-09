import type { periods } from "../config";

export type TPeriod = (typeof periods)[keyof typeof periods];