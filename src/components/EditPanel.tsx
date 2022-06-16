import { useDispatch } from "react-redux";
import { redo, undo } from "../store/actions";

const EditPanel = () => {
  const dispatch = useDispatch();

  return (
    <div className="edit-panel">
      <div className="buttons">
        <button className="button" onClick={() => dispatch(undo())}>
          Undo
        </button>
        <button className="button" onClick={() => dispatch(redo())}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default EditPanel;
