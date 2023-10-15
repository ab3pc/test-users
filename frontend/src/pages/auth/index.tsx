import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Navigate, useLocation } from "react-router-dom";
import {
	UserSignInRequestDto,
	UserSignUpRequestDto,
} from "../../common/enums/users/users";
import { authActions } from "../../store/actions";
import { AppRoute } from "../../common/enums/enums";
import { Login } from "../login";
import { Register } from "../register";

export const Auth: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const { user } = useAppSelector((state) => state.auth);
	console.log(pathname, "pathname");

	const hasUser = Boolean(user);

	const handleSignInSubmit = (payload: UserSignInRequestDto): void => {
		dispatch(authActions.signIn(payload));
	};

	const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
		dispatch(authActions.signUp(payload));
	};

	const getScreen = (screen: string): React.ReactElement | null => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <Login onSubmit={handleSignInSubmit} />;
			}
			case AppRoute.SIGN_UP: {
				return <Register onSubmit={handleSignUpSubmit} />;
			}
			default:
				return <Login onSubmit={handleSignInSubmit} />;
		}
	};

	if (hasUser) {
		return <Navigate to={AppRoute.USERS} />;
	}

	return <>{getScreen(pathname)}</>;
};
