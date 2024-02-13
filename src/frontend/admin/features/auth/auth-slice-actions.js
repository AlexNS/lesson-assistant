import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = ''

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      const response = await axios.post(
        `${backendURL}/api/login`,
        { login, password },
        config
      );

      return response.data;
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
