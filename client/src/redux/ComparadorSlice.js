import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
export const comparadorSlice = createSlice({
  name: "comparador",
  initialState: {
    arrColegios: ["asd"],
  },
  reducers: {
    getDataColegios: (state, action) => {
      console.log(action.payload)
      if (state.arrColegios.length < 3) {
        state.arrColegios = [...state.arrColegios, action.payload];
      } else {
        console.log("oli")
      }
    },
  },
});

export const { getDataColegios } = comparadorSlice.actions;

export default comparadorSlice.reducer;
