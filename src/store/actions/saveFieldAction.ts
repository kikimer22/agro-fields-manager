import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { generateField } from '@/features/createField/slice/fieldSlice';
import { addField } from '@/features/fields/slice/fieldsSlice';

interface Props {
  name: string;
  area: number;
  crop?: string;
}

export const saveFieldAction = createAsyncThunk(
  'action/createField',
  async (props: Props, { getState, dispatch }) => {
    dispatch(generateField(props));
    const state = getState() as RootState;
    const field = state.fieldSlice.feature;
    dispatch(addField(field));
  }
);
