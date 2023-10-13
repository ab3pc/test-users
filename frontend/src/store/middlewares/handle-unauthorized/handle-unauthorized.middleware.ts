import { Middleware } from "@reduxjs/toolkit"
import { ExceptionMessage } from "../../../common/enums/enums"
import { authActions } from "../../actions"
import { AppDispatch } from "../../store"

type HandleErrorParams = {
  dispatch: AppDispatch
}

const handleUnauthorized: Middleware =
  ({ dispatch }: HandleErrorParams) =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error
      const isUnauthorized = message === ExceptionMessage.UNAUTHORIZED_USER
      isUnauthorized && dispatch(authActions.logout())
    }

    return next(action)
  }

export { handleUnauthorized }
