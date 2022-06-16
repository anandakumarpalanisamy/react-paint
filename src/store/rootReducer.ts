import { RootState } from "../models/types";
import {
  Action,
  BEGIN_STROKE,
  UPDATE_STROKE,
  END_STROKE,
  SET_STROKE_COLOR,
} from "./actions";

const initialState: RootState = {
  currentStroke: { points: [], color: "#000000" },
  strokes: [],
};

export const rootReducer = (
  state: RootState = initialState,
  action: Action
): RootState => {
  switch (action.type) {
    case BEGIN_STROKE:
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      };
    case UPDATE_STROKE:
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        },
      };
    case END_STROKE:
      if (!state.currentStroke.points.length) {
        return state;
      }
      return {
        ...state,
        currentStroke: { ...state.currentStroke, points: [] },
        strokes: [...state.strokes, state.currentStroke],
      };
    case SET_STROKE_COLOR:
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          ...{ color: action.payload },
        },
      };
    default:
      return state;
  }
};

export const currentStrokeSelector = (state: RootState) => state.currentStroke;
