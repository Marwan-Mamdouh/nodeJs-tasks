import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserLogin: !localStorage.getItem("userToken") ? false : true,
  },
  reducers: {
    loginAction(state, { payload }) {
      localStorage.setItem("userToken", payload);
      state.isUserLogin = true;
    },
    logoutAction(state) {
      localStorage.removeItem("userToken");
      state.isUserLogin = false;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
