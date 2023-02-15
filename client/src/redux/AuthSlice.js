import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:localStorage.getItem('token'),
    isAuth: null,
    user: null,
    success: null,
    error: "",
    loading: false
  },
  reducers : {
    getUser: (state,action) => {
      state.loading = false,
      state.success = true
      state.error = "",
      state.user = action.payload
    },
    registerUser: (state) => {
      state.loading = false,
      state.success = true
      state.error = ""
    },
    loginUser: (state,action) => {
      state.isAuth = true,
      state.loading = false,
      state.success = true,
      state.user = action.payload,
      state.error = ""
    },
    logoutUser: (state) => {
      state.isAuth = false,
      state.loading = false,
      state.success = true,
      state.user = null,
      state.error = ""
    },
    getError: (state,action) => {
      state.error = action.payload,
      state.loading = false,
      state.success = false
    },
    isLoading: (state) => {
      state.loading = true
    }
  }
})

export const {getUser,registerUser,loginUser,logoutUser,getError,isLoading} = authSlice.actions

export default authSlice.reducer