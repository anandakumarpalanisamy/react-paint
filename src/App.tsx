import { useCallback, useEffect } from "react";
import "./App.css";
import { useCanvas } from "./providers/CanvasProvider";
import { clearCanvas, setCanvasSize } from "./utils/canvas";

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  const canvasRef = useCanvas();

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

  return (
    <div className="App">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
