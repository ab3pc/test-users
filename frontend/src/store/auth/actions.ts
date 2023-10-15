import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionType } from "./common";
import {
	UserDetailsResponseDto,
	UserSignInRequestDto,
	UserSignUpRequestDto,
} from "../../common/enums/users/users";
import { AsyncThunkConfig } from "../../common/types/types";
import { StorageKey } from "../../common/enums/enums";

const signUp = createAsyncThunk<
	UserDetailsResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
	const { authApi, storage } = extra;
	const {
		data: { token, user },
	} = await authApi.signUp(registerPayload);

	storage.setItem(StorageKey.ACCESS_TOKEN, token);

	return user;
});

const signIn = createAsyncThunk<
	UserDetailsResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
	const { authApi, storage } = extra;
	const {
		data: { token, user },
	} = await authApi.signIn(loginPayload);

	storage.setItem(StorageKey.ACCESS_TOKEN, token);

	return user;
});

const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
	ActionType.LOGOUT,
	(_request, { extra }) => {
		const { storage } = extra;

		storage.removeItem(StorageKey.ACCESS_TOKEN);
	},
);

const getCurrentUser = createAsyncThunk<
	UserDetailsResponseDto,
	void,
	AsyncThunkConfig
>(ActionType.LOAD_CURRENT_USER, async (_payload, { extra }) => {
	const { authApi } = extra;
	const { data } = await authApi.getCurrentUser();

	return data;
});

export { getCurrentUser, logout, signIn, signUp };
