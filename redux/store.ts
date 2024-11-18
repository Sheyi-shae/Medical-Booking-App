import { configureStore } from '@reduxjs/toolkit';
import patientSlice from './slices/patientSlice';

export const store = configureStore({
  reducer: {
    patient: patientSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;