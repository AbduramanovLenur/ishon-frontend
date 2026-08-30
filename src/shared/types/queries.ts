export type QueryValue = string | number | boolean;

export type QueryValues = QueryValue | QueryValue[];

export interface SetParams {
  [key: string]: QueryValues | null | undefined;
}