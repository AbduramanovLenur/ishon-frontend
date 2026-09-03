import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IResetPasswordCompanyOwnerState } from "./types";

const initialState: IResetPasswordCompanyOwnerState = {
  isOpen: false,
  companyOwnerId: null,
};

const slice = createSlice({
  name: "resetPasswordCompanyOwner",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<number | string | null>) => {
      state.isOpen = true;
      state.companyOwnerId = action.payload;
    },

    close: (state) => {
      state.isOpen = false;
      state.companyOwnerId = null;
    },
  },
});

export const { open, close } = slice.actions;
export const reducer = slice.reducer;

export const stateResetPasswordCompanyOwner = (state: { resetPasswordCompanyOwner: IResetPasswordCompanyOwnerState }) => state.resetPasswordCompanyOwner;