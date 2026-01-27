import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { addField } from '@/features/fields/slice/fieldsSlice';

export const saveFieldAction = createAsyncThunk(
  'action/createField',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const field = state.fieldSlice.feature;
    if (!field?.properties?.id) throw new Error('Field not added');
    dispatch(addField(field));
  }
);
