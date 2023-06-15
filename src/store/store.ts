import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import { commonApi } from './services/commonApi';

export const store = configureStore({
  reducer: {
    form: formReducer,
    [commonApi.reducerPath]: commonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
