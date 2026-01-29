import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fieldFeature1, fieldFeature2, fieldFeature3 } from '@/mock/fieldFeature.ts';
import type { FieldFeature, FieldsCollection } from '@/shared/types.ts';

interface FieldsState {
  fieldsCollection: FieldsCollection;
  selectedFieldId: string | null;
}

const initialState: FieldsState = {
  fieldsCollection: {
    type: 'FeatureCollection',
    features: [
      fieldFeature1,
      fieldFeature2,
      fieldFeature3
    ],
  },
  // selectedFieldId: fieldFeature2.properties.id,
  selectedFieldId: null,
};

export const fieldsSlice = createSlice({
  name: 'fieldsSlice',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FieldFeature>) => {
      state.fieldsCollection.features.push(action.payload);
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fieldsCollection.features = state.fieldsCollection.features.filter((f) => f.properties.id !== action.payload);
    },
    setSelectedFieldId: (state, action: PayloadAction<string | null>) => {
      state.selectedFieldId = action.payload;
    },
  },
});

export const { addField, removeField, setSelectedFieldId } = fieldsSlice.actions;

export default fieldsSlice.reducer;
