import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Point } from '@/features/points/types';
import type { Sort } from '@/shared/types';
import applySelection from '@/features/points/utils/applySelection';
import { INIT_FILTER_VALUE, INIT_SEARCH_VALUE, INIT_SORT_VALUE } from '@/shared/constants';

interface PointsSliceState {
  points: Point[];
  selectedPoints: Point[];
  filter: string;
  search: string;
  sort: Sort;
}

const initialState: PointsSliceState = {
  points: [],
  selectedPoints: [],
  filter: INIT_FILTER_VALUE,
  search: INIT_SEARCH_VALUE,
  sort: INIT_SORT_VALUE,
};

export const pointsSlice = createSlice({
  name: 'pointsSlice',
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
      state.selectedPoints = applySelection(state.points, state.filter, state.search, state.sort);
    },
    removePoint: (state, action: PayloadAction<string>) => {
      state.points = state.points.filter((p) => p.id !== action.payload);
      state.selectedPoints = applySelection(state.points, state.filter, state.search, state.sort);
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.selectedPoints = applySelection(state.points, state.filter, state.search, state.sort);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.selectedPoints = applySelection(state.points, state.filter, state.search, state.sort);
    },
    toggleSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
      state.selectedPoints = applySelection(state.points, state.filter, state.search, state.sort);
    },
    resetFilters: (state) => {
      state.filter = INIT_FILTER_VALUE;
      state.search = INIT_SEARCH_VALUE;
      state.sort = INIT_SORT_VALUE;
      state.selectedPoints = applySelection(state.points, state.filter, state.search, state.sort);
    },
    reset: () => ({ ...initialState }),
  },
});

export const {
  addPoint,
  removePoint,
  setFilter,
  setSearch,
  toggleSort,
  resetFilters,
  reset
} = pointsSlice.actions;

export default pointsSlice.reducer;
