import { createSlice } from "@reduxjs/toolkit";

export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    allschools: []
  },
  reducers : {
    getSchools: (state,action) => {
      state.allschools = action.payload
    }
  }
})

export const {getSchools} = schoolsSlice.actions

export default schoolsSlice.reducer