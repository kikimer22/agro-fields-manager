import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeField, setSelectedFieldId } from '@/features/fields/slice/fieldsSlice';
import { removePointsCollection } from '@/features/points/slice/pointsSlice';
import { setSelectedField } from '@/store/slices/sharedSlice';
import type { RootState } from '@/store/store.ts';

export const removeFieldAction = createAsyncThunk(
  'action/removeField',
  async (fieldId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const selectedFieldId = state.fieldsSlice.selectedFieldId;
    dispatch(removeField(fieldId));
    if (fieldId === selectedFieldId) {
      dispatch(setSelectedFieldId(null));
      dispatch(setSelectedField(null));
    }
    dispatch(removePointsCollection(fieldId));
  }
);
