import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Point } from '@/features/points/types';

interface PointsSliceState {
  points: Point[];
}

const initialState: PointsSliceState = {
  points: [],
};

export const pointsSlice = createSlice({
  name: 'pointsSlice',
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    removePoint: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.points = state.points.filter((p) => p.id !== id);
    },
    reset: () => ({ ...initialState }),
  },
});

export const {
  addPoint,
  removePoint,
  reset
} = pointsSlice.actions;

export default pointsSlice.reducer;
