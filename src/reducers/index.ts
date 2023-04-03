import { combineReducers } from '@reduxjs/toolkit';
import logReducer from './logReducer';
import techReducer from './techReducer';
import toastReducer from './toastReducer';

export default combineReducers({
  logReducer,
  techReducer,
  toastReducer,
});
