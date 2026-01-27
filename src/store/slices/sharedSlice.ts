import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FieldFeature } from '@/shared/types.ts';

// type Flow = 'CreateField' | 'SelectField' | 'PutPoints';
//
// type Action = '' // TODO

interface FieldSliceState {
  isSelectingFieldFlow: boolean;
  isCreatingFieldFlow: boolean;
  isAddingPointsFlow: boolean;
  selectedField: FieldFeature | null;
}

const initialState: FieldSliceState = {
  isCreatingFieldFlow: false,
  isAddingPointsFlow: false,
  isSelectingFieldFlow: true,
  selectedField: null,
};

export const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    setSelectingFieldFlow: (state, action: PayloadAction<boolean>) => {
      state.isCreatingFieldFlow = false;
      state.isAddingPointsFlow = false;
      state.isSelectingFieldFlow = action.payload;
    },
    setCreatingFieldFlow: (state, action: PayloadAction<boolean>) => {
      state.isCreatingFieldFlow = action.payload;
      state.isAddingPointsFlow = false;
      state.isSelectingFieldFlow = false;
    },
    setAddingPointsFlow: (state, action: PayloadAction<boolean>) => {
      state.isCreatingFieldFlow = false;
      state.isAddingPointsFlow = action.payload;
      state.isSelectingFieldFlow = false;
    },
    setSelectedField: (state, action: PayloadAction<FieldFeature | null>) => {
      state.selectedField = action.payload;
    },
    reset: () => initialState,
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
