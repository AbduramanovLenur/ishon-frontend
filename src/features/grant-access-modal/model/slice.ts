import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IState } from "./types";

const initialState: IState = {
  isOpen: false,
  employeeId: null,
};

const slice = createSlice({
  name: "grantAccessEmployee",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<number | string | null>) => {
      state.isOpen = true;
      state.employeeId = action.payload;
    },

    close: (state) => {
      state.isOpen = false;
      state.employeeId = null;
    },
  },
});

export const { open, close } = slice.actions;
export const reducer = slice.reducer;

export const stateGrantAccessEmployee = (state: { grantAccessEmployee: IState }) => state.grantAccessEmployee;