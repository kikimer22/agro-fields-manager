import { configureStore } from '@reduxjs/toolkit';
import fieldsSlice from '@/features/fields/slice/fieldsSlice';
import fieldSlice from '@/features/createField/slice/fieldSlice';
import pointsSlice from '@/features/points/slice/pointsSlice';
import sharedSlice from '@/store/slices/sharedSlice';

export const store = configureStore({
  reducer: {
    fieldsSlice,
    fieldSlice,
    pointsSlice,
    sharedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
