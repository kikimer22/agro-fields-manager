import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { FieldFeature, FieldProperties } from '@/shared/types';
import { ensureClosedPolygon } from '@/lib/utils';
import { saveFieldAction } from '@/store/actions/saveFieldAction.ts';

interface FieldSliceState {
  feature: FieldFeature;
  isAddingPointsMode: boolean;
  isShowingField: boolean;
  isConfirmCreation: boolean;
}

const initialState: FieldSliceState = {
  feature: {
    type: 'Feature',
    properties: {
      id: '',
      name: '',
      area: 0,
      crop: '',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[]],
    },
  },
  isAddingPointsMode: true,
  isShowingField: false,
  isConfirmCreation: false,
};

export const fieldSlice = createSlice({
  name: 'fieldSlice',
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<[number, number]>) => {
      state.feature.geometry.coordinates[0].push(action.payload);
      state.isShowingField = state.feature.geometry.coordinates[0].length >= 3;
    },
    removePoint: (state, action: PayloadAction<[number, number]>) => {
      const [lng, lat] = action.payload;
      state.feature.geometry.coordinates[0] = state.feature.geometry.coordinates[0].filter(
        ([x, y]) => x !== lng || y !== lat
      );
      state.isShowingField = state.feature.geometry.coordinates[0].length >= 3;
    },
    generateField: {
      reducer: (state, action: PayloadAction<FieldProperties>) => {
        const coords = ensureClosedPolygon(state.feature.geometry.coordinates[0]);
        return {
          ...state,
          feature: {
            ...state.feature,
            properties: { ...state.feature.properties, ...action.payload },
            geometry: {
              ...state.feature.geometry,
              coordinates: [coords],
            },
          }
        };
      },
      prepare: (pld: Omit<FieldProperties, 'id'>) => ({
        payload: { id: nanoid(), ...pld },
      }),
    },
    setAddingPointsMode: (state, action: PayloadAction<boolean>) => {
      state.isAddingPointsMode = action.payload;
    },
    setConfirmCreation: (state, action: PayloadAction<boolean>) => {
      state.isConfirmCreation = action.payload;
    },
    reset: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFieldAction.fulfilled, () => ({ ...initialState }));
  },
});

export const {
  addPoint,
  removePoint,
  generateField,
  setAddingPointsMode,
  setConfirmCreation,
  reset
} = fieldSlice.actions;

export default fieldSlice.reducer;
