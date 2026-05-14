import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import { themeSlice } from '../../theme/theme/themeSlice';

const appReducer = combineReducers({
  theme: themeSlice.reducer,
  authReducer: authSlice.reducer,
  userReducer: userSlice.reducer
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: any): RootState => {
  // Don't reassign state - return directly
  if (action.type === 'resetRedux/resetReduxState') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
});

export type AppDispatch = typeof store.dispatch;