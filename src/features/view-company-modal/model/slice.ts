import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IViewCompanyState } from "./types";

const initialState: IViewCompanyState = {
  isOpen: false,
  companyId: null,
};

const slice = createSlice({
  name: "viewCompany",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<number | string | null>) => {
      state.isOpen = true;
      state.companyId = action.payload;
    },

    close: (state) => {
      state.isOpen = false;
      state.companyId = null;
    },
  },
});

export const { open, close } = slice.actions;
export const reducer = slice.reducer;

export const stateViewCompany = (state: { viewCompany: IViewCompanyState }) => state.viewCompany;