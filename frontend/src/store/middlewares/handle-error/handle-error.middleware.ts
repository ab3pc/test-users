import { Middleware } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { NotificationType } from '../../../common/enums/notification/notification';
import { appActions } from '../../actions';


type HandleErrorParams = {
  dispatch: AppDispatch;
};

const handleError: Middleware =
  ({ dispatch }: HandleErrorParams) =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error;
      dispatch(appActions.notify({ type: NotificationType.ERROR, message }));
    }

    return next(action);
  };

export { handleError };
