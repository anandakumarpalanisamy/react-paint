import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import ColorPanel from "./components/ColorPanel";
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

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  const onColorChange = (color: string) => {
    setColor(color);
  };

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

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    const { context } = getCanvasWithContext();
    if (context) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    const { context } = getCanvasWithContext();
    if (!isDrawing || !context) return;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.stroke();
  };

  const endDrawing = () => {
    const { context } = getCanvasWithContext();
    if (!context || !isDrawing) return;
    context.closePath();
    setIsDrawing(false);
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
        <ColorPanel onColorChange={onColorChange} />
      </div>
    </div>
  );
}

export default App;
