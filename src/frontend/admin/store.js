import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth-slice'
import { authStoreMiddleware } from './features/auth/auth-store-middleware';
import { loadAuth } from './features/auth/auth-persister';

const store = configureStore({
  preloadedState: {
    auth: loadAuth()
  },
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authStoreMiddleware.middleware
  ]
})
export default store;