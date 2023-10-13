
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, StorageKey } from '../../common/enums/enums';
import { storage } from '../../store/services/services';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  const hasToken = Boolean(storage.getItem(StorageKey.ACCESS_TOKEN))


  if (!hasToken) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { ProtectedRoute };
