import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth-slice'
import { authStoreMiddleware } from './features/auth/auth-store-middleware';
import { loadAuth } from './features/auth/auth-persister';
import { studentsApiSlice } from './features/students/students-api-slice';
import { questionsApiSlice } from './features/questions/questions-api-slice';

const store = configureStore({
  preloadedState: {
    auth: loadAuth()
  },
  reducer: {
    auth: authReducer,
    [studentsApiSlice.reducerPath]: studentsApiSlice.reducer,
    [questionsApiSlice.reducerPath]: questionsApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authStoreMiddleware.middleware,
    studentsApiSlice.middleware,
    questionsApiSlice.middleware,
  ]
})
export default store;