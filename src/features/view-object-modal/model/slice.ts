import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IState } from "./types";

const initialState: IState = {
  isOpen: false,
  objectId: null,
};

const slice = createSlice({
  name: "viewObject",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<number | string | null>) => {
      state.isOpen = true;
      state.objectId = action.payload;
    },

    close: (state) => {
      state.isOpen = false;
      state.objectId = null;
    },
  },
});

export const { open, close } = slice.actions;
export const reducer = slice.reducer;

export const stateViewObject = (state: { viewObject: IState }) => state.viewObject;