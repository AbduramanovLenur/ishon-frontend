import { roles } from "../config/roles";

export type TRoles = (typeof roles)[keyof typeof roles];