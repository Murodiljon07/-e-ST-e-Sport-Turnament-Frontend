import { createSlice } from "@reduxjs/toolkit";

const initialState: Boolean = false;

export const AuthSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    auth: (state, action) => {},
  },
});
