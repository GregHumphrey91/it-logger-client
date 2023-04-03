import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// Typescript Redux types
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export default store;
