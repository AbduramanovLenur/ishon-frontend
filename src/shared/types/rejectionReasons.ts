import type { rejectionReasons } from "../config";

export type TRejectionReason = (typeof rejectionReasons)[keyof typeof rejectionReasons];