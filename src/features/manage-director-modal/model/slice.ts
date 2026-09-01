import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IManageCompanyOwnerState } from "./types";

const initialState: IManageCompanyOwnerState = {
  isOpen: false,
  companyOwnerId: null,
};

const slice = createSlice({
  name: "manageCompanyOwner",
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

export const stateManageCompanyOwner = (state: { manageCompanyOwner: IManageCompanyOwnerState }) => state.manageCompanyOwner;