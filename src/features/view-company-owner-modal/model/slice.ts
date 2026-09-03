import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IState } from "./types";

const initialState: IState = {
  isOpen: false,
  companyOwnerId: null,
};

const slice = createSlice({
  name: "viewCompanyOwner",
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

export const stateViewCompanyOwner = (state: { viewCompanyOwner: IState }) => state.viewCompanyOwner;