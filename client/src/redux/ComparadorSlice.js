import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
export const comparadorSlice = createSlice({
  name: "comparador",
  initialState: {
    arrColegios: ["asd","dsad"],
  },
  reducers: {
    getDataColegios: (state, action) => {
      if (arrColegios.length < 3) {
        state.arrColegios = [...arrColegios, action.payload];
      } else {
        console.log("oli")
      }
    },
  },
});

export const { getDataColegios } = comparadorSlice.actions;

export default comparadorSlice.reducer;
