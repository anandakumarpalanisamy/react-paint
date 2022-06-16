import { useDispatch } from "react-redux";
import { setStrokeColor } from "../store/actions";
import { COLORS } from "../utils/colors";

const ColorPanel = () => {
  const dispatch = useDispatch();

  const onColorChange = (color: string) => {
    dispatch(setStrokeColor(color));
  };

  return (
    <div className="color-panel">
      <div className="colors">
        {COLORS.map((color, index) => (
          <div
            key={color}
            className="color"
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPanel;
