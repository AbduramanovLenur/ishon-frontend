import { endpoints } from "./endpoints";
import type { ITelegramSettings } from "../model/types";

import { axiosInstance } from "@shared/api"
import type { IApiResponse } from "@shared/types";

export const api = {
  telegramSettings: () => {
    return axiosInstance
      .get<IApiResponse<ITelegramSettings>>(endpoints.TELEGRAM_SETTINGS)
      .then((response) => response.data.data);
  }
}