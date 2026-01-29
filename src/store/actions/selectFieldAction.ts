import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { setSelectedFieldId } from '@/features/fields/slice/fieldsSlice';
import { setSelectedField } from '@/store/slices/sharedSlice.ts';

export const selectFieldAction = createAsyncThunk(
  'action/selectField',
  async (fieldId: string | null, { getState, dispatch }) => {
    dispatch(setSelectedFieldId(fieldId));
    const state = getState() as RootState;
    const features = state.fieldsSlice.fieldsCollection.features;
    let selected = null;
    if (fieldId) selected = features.find((f) => f.properties.id === fieldId) ?? null;
    if (!selected?.properties?.id) throw new Error('Field not added');
    dispatch(setSelectedField(selected));
  }
);
