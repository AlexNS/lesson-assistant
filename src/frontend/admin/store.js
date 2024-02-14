import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth-slice'
import { authStoreMiddleware } from './features/auth/auth-store-middleware';
import { loadAuth } from './features/auth/auth-persister';
import { studentsApiSlice } from './features/students/students-api-slice';

const store = configureStore({
  preloadedState: {
    auth: loadAuth()
  },
  reducer: {
    auth: authReducer,
    [studentsApiSlice.reducerPath]: studentsApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authStoreMiddleware.middleware,
    studentsApiSlice.middleware
  ]
})
export default store;