import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Point, PointsCollection } from '@/features/points/types';
import type { Sort } from '@/shared/types';
import applyFilters from '@/features/points/utils/applyFilters';
import { INIT_FILTER_VALUE, INIT_SEARCH_VALUE, INIT_SORT_VALUE } from '@/shared/constants';

interface PointsSliceState {
  pointsCollection: PointsCollection;
  filteredPointsCollection: PointsCollection;
  filter: string;
  search: string;
  sort: Sort;
}

const initialState: PointsSliceState = {
  pointsCollection: {},
  filteredPointsCollection: {},
  filter: INIT_FILTER_VALUE,
  search: INIT_SEARCH_VALUE,
  sort: INIT_SORT_VALUE,
};

export const pointsSlice = createSlice({
  name: 'pointsSlice',
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<{ fieldId: string; point: Point }>) => {
      const { fieldId, point } = action.payload;
      if (!state.pointsCollection[fieldId]) {
        state.pointsCollection[fieldId] = [];
      }
      state.pointsCollection[fieldId].push(point);
      state.filteredPointsCollection = applyFilters(
        state.pointsCollection,
        state.filter,
        state.search,
        state.sort
      );
    },
    removePoint: (state, action: PayloadAction<{ fieldId: string; pointId: string }>) => {
      const { fieldId, pointId } = action.payload;
      if (state.pointsCollection[fieldId]) {
        state.pointsCollection[fieldId] = state.pointsCollection[fieldId].filter(
          (p) => p.id !== pointId
        );
      }
      state.filteredPointsCollection = applyFilters(
        state.pointsCollection,
        state.filter,
        state.search,
        state.sort
      );
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.filteredPointsCollection = applyFilters(
        state.pointsCollection,
        state.filter,
        state.search,
        state.sort
      );
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filteredPointsCollection = applyFilters(
        state.pointsCollection,
        state.filter,
        state.search,
        state.sort
      );
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
      state.filteredPointsCollection = applyFilters(
        state.pointsCollection,
        state.filter,
        state.search,
        state.sort
      );
    },
    removePointsCollection: (state, action: PayloadAction<string>) => {
      const fieldId = action.payload;
      delete state.pointsCollection[fieldId];
      delete state.filteredPointsCollection[fieldId];
    },
    resetFilters: (state) => {
      state.filter = INIT_FILTER_VALUE;
      state.search = INIT_SEARCH_VALUE;
      state.sort = INIT_SORT_VALUE;
      state.filteredPointsCollection = applyFilters(
        state.pointsCollection,
        state.filter,
        state.search,
        state.sort
      );
    },
    reset: () => ({ ...initialState }),
  },
});

export const {
  addPoint,
  removePoint,
  setFilter,
  setSearch,
  setSort,
  resetFilters,
  removePointsCollection,
  reset,
} = pointsSlice.actions;

export default pointsSlice.reducer;
