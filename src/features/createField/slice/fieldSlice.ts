import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { FieldFeature, FieldProperties } from '@/shared/types';
import { ensureClosedPolygon } from '@/lib/utils';
import { saveFieldAction } from '@/store/actions/saveFieldAction';
import { EPS } from '@/shared/constants';

interface FieldSliceState {
  feature: FieldFeature;
  isAddingPointsMode: boolean;
  isSaving: boolean;
  isConfirm: boolean;
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
  isSaving: false,
  isConfirm: false,
};

export const fieldSlice = createSlice({
  name: 'fieldSlice',
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<[number, number]>) => {
      state.feature.geometry.coordinates[0].push(action.payload);
    },
    removePoint: (state, action: PayloadAction<[number, number]>) => {
      const [lng, lat] = action.payload;
      state.feature.geometry.coordinates[0] = state.feature.geometry.coordinates[0].filter(
        ([x, y]) => Math.abs(x - lng) > EPS || Math.abs(y - lat) > EPS
      );
      if (!state.feature.geometry.coordinates[0].length) {
        state.isAddingPointsMode = true;
      }
    },
    generateField: {
      reducer: (state, action: PayloadAction<FieldProperties>) => {
        const coords = ensureClosedPolygon(state.feature?.geometry?.coordinates[0] || []);
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
    setConfirm: (state, action: PayloadAction<boolean>) => {
      state.isConfirm = action.payload;
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    reset: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFieldAction.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(saveFieldAction.fulfilled, () => ({ ...initialState }))
      .addCase(saveFieldAction.rejected, (state) => {
        state.isSaving = false;
      });
  },
});

export const {
  addPoint,
  removePoint,
  generateField,
  setAddingPointsMode,
  setConfirm,
  setSaving,
  reset
} = fieldSlice.actions;

export default fieldSlice.reducer;
