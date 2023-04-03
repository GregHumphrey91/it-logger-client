import { SHOW_TOAST, HIDE_TOAST } from '../actions/types';

const initialState = {
  showToast: false,
  message: '',
};

type ToastState = {
  showToast: boolean;
  message: string;
};

export default (state: ToastState = initialState, action: any) => {
  switch (action.type) {
    // Fetch all technicians
    case SHOW_TOAST:
      return {
        ...state,
        showToast: true,
        message: action.payload,
      };
    case HIDE_TOAST:
      return {
        ...state,
        showToast: false,
        message: '',
      };
    default:
      return state;
  }
};
