import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { authApi, storage, usersApi, notification } from "./services/services"
import { rootReducer } from "./root-reducer"
import { handleError, handleUnauthorized } from "./middlewares/middlewares"

export const extraArgument = {
  authApi,
  usersApi,
  storage,
  notification,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat([handleError, handleUnauthorized])
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
