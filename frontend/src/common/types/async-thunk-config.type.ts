import { AppDispatch, RootState, extraArgument } from "../../store/store"

type AsyncThunkConfig = {
  state: RootState
  dispatch: AppDispatch
  extra: typeof extraArgument
}

export { type AsyncThunkConfig }
