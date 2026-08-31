import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IManageCompanyState } from "./types";

const initialState: IManageCompanyState = {
  isOpen: false,
  companyId: null,
};

const manageCompanySlice = createSlice({
  name: "company",
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

export const { open, close } = manageCompanySlice.actions;
export const reducer = manageCompanySlice.reducer;

export const stateManageCompany = (state: { company: IManageCompanyState }) => state.company;