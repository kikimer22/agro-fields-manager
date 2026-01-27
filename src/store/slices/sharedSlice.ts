import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FieldFeature } from '@/shared/types.ts';

// type Flow = 'CreateField' | 'SelectField' | 'PutPoints';
//
// type Action = '' // TODO

interface FieldSliceState {
  isCreatingFieldFlow: boolean;
  isSelectingFieldFlow: boolean;
  isAddingPointsFlow: boolean;
  selectedField: FieldFeature | null;
}

const initialState: FieldSliceState = {
  isCreatingFieldFlow: false,
  isSelectingFieldFlow: true,
  isAddingPointsFlow: false,
  selectedField: null,
};

export const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    setCreatingFieldFlow: (state, action: PayloadAction<boolean>) => {
      state.isCreatingFieldFlow = action.payload;
      state.isSelectingFieldFlow = false;
      state.isAddingPointsFlow = false;
    },
    setSelectingFieldFlow: (state, action: PayloadAction<boolean>) => {
      state.isCreatingFieldFlow = false;
      state.isSelectingFieldFlow = action.payload;
      state.isAddingPointsFlow = false;
    },
    setAddingPointsFlow: (state, action: PayloadAction<boolean>) => {
      state.isCreatingFieldFlow = false;
      state.isSelectingFieldFlow = false;
      state.isAddingPointsFlow = action.payload;
    },
    setSelectedField: (state, action: PayloadAction<FieldFeature | null>) => {
      state.selectedField = action.payload;
    },
    reset: () => ({ ...initialState }),
  },
});

export const {
  setSelectingFieldFlow,
  setCreatingFieldFlow,
  setAddingPointsFlow,
  setSelectedField,
  reset
} = sharedSlice.actions;

export default sharedSlice.reducer;
