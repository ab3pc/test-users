import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppRoute, DataStatus, StorageKey } from "../../common/enums/enums";
import { Auth } from "../../pages/auth";
import { Main } from "../../pages/main";
import { NotFound } from "../../pages/not-found";
import { authActions } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { storage } from "../../store/services/services";
import { Spinner } from "../loader";
import { ProtectedRoute } from "../protected-route/protected-route";

const App: React.FC = () => {
	const { dataStatus } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const isLoading = dataStatus === DataStatus.PENDING;
	const hasToken = Boolean(storage.getItem(StorageKey.ACCESS_TOKEN));

	React.useEffect(() => {
		if (hasToken) {
			dispatch(authActions.getCurrentUser());
		}
	}, [dispatch, hasToken]);

	const router = createBrowserRouter([
		{
			path: AppRoute.ROOT,
			element: <ProtectedRoute component={<Main />} />,
		},
		{
			path: AppRoute.USERS,
			element: <ProtectedRoute component={<Main />} />,
		},
		{
			path: AppRoute.SIGN_IN,
			element: <Auth />,
		},
		{
			path: AppRoute.SIGN_UP,
			element: <Auth />,
		},
		{
			path: AppRoute.ANY,
			element: <NotFound />,
		},
	]);

	if (isLoading)
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Spinner size="large" />
			</div>
		);

	return <RouterProvider router={router} />;
};

export { App };
