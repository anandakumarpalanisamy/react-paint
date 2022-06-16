import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ColorPanel from "./components/ColorPanel";
import EditPanel from "./components/EditPanel";
import { RootState } from "./models/types";
import { useCanvas } from "./providers/CanvasProvider";
import { beginStroke, endStroke, updateStroke } from "./store/actions";
import {
  currentStrokeSelector,
  historyIndexSelector,
  strokesSelector,
} from "./store/rootReducer";
import { clearCanvas, drawStroke, setCanvasSize } from "./utils/canvas";

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  const canvasRef = useCanvas();

  const isDrawing = useSelector<RootState>(
    (state) => !!state.currentStroke.points.length
  );
  const currentStroke = useSelector<RootState, RootState["currentStroke"]>(
    currentStrokeSelector
  );
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);

  const dispatch = useDispatch();

  const getCanvasWithContext = useCallback(
    (canvas = canvasRef.current) => {
      return {
        canvas,
        context: canvas?.getContext("2d"),
      };
    },
    [canvasRef]
  );

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (canvas && context) {
      setCanvasSize(canvas, WIDTH, HEIGHT);
      context.lineJoin = "round";
      context.lineCap = "round";
      context.lineWidth = 5;
      clearCanvas(canvas);
    }
  }, [getCanvasWithContext]);

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) return;
    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color);
    });
  }, [currentStroke, getCanvasWithContext]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!context || !canvas) return;
    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes
        .slice(0, strokes.length - historyIndex)
        .forEach((stroke) => drawStroke(context, stroke.points, stroke.color));
    });
  }, [historyIndex, strokes, getCanvasWithContext]);

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isDrawing) return;
    dispatch(updateStroke(offsetX, offsetY));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke());
    }
  };

  return (
    <div className="App">
      <canvas
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        ref={canvasRef}
      />
      <div className="panels">
        <ColorPanel />
        <EditPanel />
      </div>
    </div>
  );
}

export default App;
