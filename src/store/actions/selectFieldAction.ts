import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { setSelectedFieldId } from '@/features/fields/slice/fieldsSlice';
import { setSelectedField } from '@/store/slices/sharedSlice.ts';

export const selectFieldAction = createAsyncThunk(
  'action/selectField',
  async (id: string | null, { getState, dispatch }) => {
    const state = getState() as RootState;
    console.log('Selecting field with id:', id);
    dispatch(setSelectedFieldId(id));
    const features = state.fieldsSlice.fieldsCollection.features;
    let selected = null;
    if (id) selected = features.find((f) => f.properties.id === id) ?? null;
    if (!selected?.properties?.id) throw new Error('Field not added');
    dispatch(setSelectedField(selected));
  }
);
