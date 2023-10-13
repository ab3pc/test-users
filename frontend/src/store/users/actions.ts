import { createAsyncThunk } from "@reduxjs/toolkit"

import {
  UserDeleteRequestDto,
  UserDetailsResponseDto,
} from "../../common/enums/users/users"
import { AsyncThunkConfig, UsersFilterOptions } from "../../common/types/types"
import { ActionType } from "./common"
import { appActions } from "../actions"
import {
  NotificationMessage,
  NotificationType,
} from "../../common/enums/notification/notification"

const getUsers = createAsyncThunk<
  UserDetailsResponseDto[],
  UsersFilterOptions,
  AsyncThunkConfig
>(ActionType.GET_ALL, async (payload, { extra }) => {
  const { usersApi } = extra
  const { data } = await usersApi.getAll(payload)

  return data
})

const updateUser = createAsyncThunk<
  UserDetailsResponseDto,
  UserDetailsResponseDto,
  AsyncThunkConfig
>(ActionType.UPDATE, async (payload, { dispatch, extra }) => {
  const { usersApi } = extra
  const { data } = await usersApi.update(payload)
  dispatch(
    appActions.notify({
      type: NotificationType.SUCCESS,
      message: NotificationMessage.USER_DETAILS_UPDATE,
    }),
  )
  return data
})

const deleteUser = createAsyncThunk<
  UserDetailsResponseDto,
  UserDeleteRequestDto,
  AsyncThunkConfig
>(ActionType.DELETE, async (payload, { dispatch, extra }) => {
  const { usersApi } = extra
  const { data } = await usersApi.delete(payload)
  dispatch(
    appActions.notify({
      type: NotificationType.SUCCESS,
      message: NotificationMessage.USER_DELETE,
    }),
  )
  return data
})

export { getUsers, updateUser, deleteUser }
