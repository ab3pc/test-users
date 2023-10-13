import { createReducer } from "@reduxjs/toolkit"

import { deleteUser, getUsers, updateUser } from "./actions"
import { UserDetailsResponseDto } from "../../common/enums/users/users"
import { DataStatus } from "../../common/enums/enums"

type State = {
  dataStatus: DataStatus
  users: UserDetailsResponseDto[] | null
}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: null,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(getUsers.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED
    state.users = payload
  })
  builder.addCase(getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED
    state.users = null
  })
  
  builder.addCase(deleteUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED
    if(!state.users) return;
    const { id } = payload
    const filteredUsers = state.users.filter(user => user.id !== id);
    state.users = filteredUsers;
  })
  builder.addCase(deleteUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED
    state.users = null
  })

  builder.addCase(updateUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED    
    const { id } = payload
    const newUsersArray = state.users?.map((user) => {
      if (user.id !== id) return user
      return {
        ...payload,
      }
    })
    state.users = newUsersArray || null
  })
  builder.addCase(updateUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED
  })
})

export { reducer }
