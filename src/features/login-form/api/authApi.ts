import type { IAuthFields } from "../model/types";

export const authApi = {
  login: async (values: IAuthFields) => {
    console.log(values);
  }
}