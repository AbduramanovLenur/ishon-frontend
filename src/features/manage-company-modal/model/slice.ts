import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IState } from "./types";

const initialState: IState = {
  isOpen: false,
  companyId: null,
};

const slice = createSlice({
  name: "manageCompany",
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

export const stateManageCompany = (state: { manageCompany: IState }) => state.manageCompany;