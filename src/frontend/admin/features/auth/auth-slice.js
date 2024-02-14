import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './auth-slice-actions'

const initialState = {
  pending: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userToken = null;
      state.userInfo = null;
      state.success = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.userToken = payload.token;
        state.userInfo = payload.userInfo;

        state.pending = false;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        state.userInfo = 'xxx';
        console.error('rejected');
      })
  }
 })
export default authSlice.reducer