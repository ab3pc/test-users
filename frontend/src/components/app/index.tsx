import React from "react"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppRoute, DataStatus, StorageKey } from "../../common/enums/enums"
import { Auth } from "../../pages/auth"
import { Main } from "../../pages/main"
import { ProtectedRoute } from "../protected-route/protected-route"
import { NotFound } from "../../pages/not-found"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { storage } from "../../store/services/services"
import { authActions } from "../../store/actions"
import { Spinner } from "../loader"

const App: React.FC = () => {
  const { user, dataStatus } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const isLoading = dataStatus === DataStatus.PENDING
  const hasUser = Boolean(user)
  const hasToken = Boolean(storage.getItem(StorageKey.ACCESS_TOKEN))

  React.useEffect(() => {
    if (hasToken) {
      dispatch(authActions.getCurrentUser())
    }
  }, [dispatch, hasToken])

  const router = createBrowserRouter([
    {
      path: AppRoute.ROOT,
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
  ])

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
    )

  return <RouterProvider router={router} />
}

export { App }
