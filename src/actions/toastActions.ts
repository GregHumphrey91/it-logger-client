import { AppDispatch } from '../store';

import { HIDE_TOAST, SHOW_TOAST } from './types';

export const hideToast = () => {
  return {
    type: HIDE_TOAST,
  };
};

// Dispatch toast message to reducer
export const showToastMessage =
  (message: string) =>
  (dispatch: AppDispatch): any => {
    dispatch({
      type: SHOW_TOAST,
      payload: message,
    });
  };
