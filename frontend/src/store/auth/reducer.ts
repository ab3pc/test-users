import { createReducer } from "@reduxjs/toolkit";
import { getCurrentUser, logout, signIn, signUp } from "./actions";
import { UserDetailsResponseDto } from "../../common/enums/users/users";
import { DataStatus } from "../../common/enums/enums";

type State = {
	dataStatus: DataStatus;
	user: UserDetailsResponseDto | null;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	user: null,
};

const reducer = createReducer(initialState, (builder) => {
	builder.addCase(signUp.pending, (state) => {
		state.dataStatus = DataStatus.PENDING;
	});
	builder.addCase(signIn.pending, (state) => {
		state.dataStatus = DataStatus.PENDING;
	});
	builder.addCase(getCurrentUser.pending, (state) => {
		state.dataStatus = DataStatus.PENDING;
	});
	builder.addCase(signUp.fulfilled, (state, { payload }) => {
		state.dataStatus = DataStatus.FULFILLED;
		state.user = payload;
	});
	builder.addCase(signIn.fulfilled, (state, { payload }) => {
		console.log(payload, "signIn.fulfilled");

		state.dataStatus = DataStatus.FULFILLED;
		state.user = payload;
	});
	builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
		state.dataStatus = DataStatus.FULFILLED;
		state.user = payload;
	});
	builder.addCase(logout.fulfilled, (state) => {
		state.dataStatus = DataStatus.FULFILLED;
		state.user = null;
	});
	builder.addCase(signUp.rejected, (state) => {
		state.dataStatus = DataStatus.REJECTED;
		state.user = null;
	});
	builder.addCase(signIn.rejected, (state) => {
		state.dataStatus = DataStatus.REJECTED;
		state.user = null;
	});
	builder.addCase(getCurrentUser.rejected, (state) => {
		state.dataStatus = DataStatus.REJECTED;
		state.user = null;
	});
	builder.addCase(logout.rejected, (state) => {
		state.dataStatus = DataStatus.REJECTED;
		state.user = null;
	});
});

export { reducer };
