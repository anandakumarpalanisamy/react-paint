import { COLORS } from "../utils/colors";

interface ColorPanelProps {
  onColorChange: (color: string) => void;
}

const ColorPanel = ({ onColorChange }: ColorPanelProps) => {
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
