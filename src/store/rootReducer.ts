import { Point, RootState } from "../models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState = {
  currentStroke: { points: [], color: "#000000" },
  strokes: [],
  historyIndex: 0,
};

export const slice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    beginStroke: (state: RootState, action: PayloadAction<Point>) => {
      state.currentStroke.points = [action.payload];
    },
    updateStroke: (state: RootState, action: PayloadAction<Point>) => {
      state.currentStroke.points.push(action.payload);
    },
    endStroke: (state: RootState) => {
      const historyIndex = state.strokes.length - state.historyIndex;
      const currentStroke = { ...state.currentStroke };
      state.strokes = [...state.strokes.slice(0, historyIndex), currentStroke];
      state.currentStroke.points = [];
      state.historyIndex = 0;
    },
    setStrokeColor: (state: RootState, action: PayloadAction<string>) => {
      state.currentStroke.color = action.payload;
    },
    undo: (state: RootState) => {
      state.historyIndex = Math.min(
        state.historyIndex + 1,
        state.strokes.length
      );
    },
    redo: (state: RootState) => {
      state.historyIndex = Math.max(state.historyIndex - 1, 0);
    },
  },
});

export default slice.reducer;

export const {
  beginStroke,
  updateStroke,
  endStroke,
  setStrokeColor,
  undo,
  redo,
} = slice.actions;

export const currentStrokeSelector = (state: RootState) => state.currentStroke;

export const historyIndexSelector = (state: RootState) => state.historyIndex;

export const strokesSelector = (state: RootState) => state.strokes;
