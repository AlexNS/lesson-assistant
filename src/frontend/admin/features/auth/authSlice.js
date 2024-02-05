import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './authSliceActions'

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
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