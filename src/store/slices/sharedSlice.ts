import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FieldFeature } from '@/shared/types';
import { selectFieldAction } from '@/store/actions/selectFieldAction';
// import { fieldFeature2 } from '@/mock/fieldFeature';

interface FieldSliceState {
  isCreatingFieldFlow: boolean;
  isSelectingFieldFlow: boolean;
  isAddingPointsFlow: boolean;
  selectedField: FieldFeature | null;
}

const initialState: FieldSliceState = {
  isCreatingFieldFlow: true,
  isSelectingFieldFlow: false,
  isAddingPointsFlow: false,
  // selectedField: fieldFeature2,
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
  extraReducers: (builder) => {
    builder
      .addCase(selectFieldAction.rejected, (state) => {
        state.selectedField = null;
      });
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
