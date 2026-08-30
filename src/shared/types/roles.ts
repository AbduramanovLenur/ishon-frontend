import { roles } from "../config/roles";

export type Roles = (typeof roles)[keyof typeof roles];