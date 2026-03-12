import ButtonGroup from "../buttons/ButtonGroup";
import ColorButton from "../buttons/ColorButton";
import PriorityGroup from "../buttons/PriorityGroup";
import WhiteButton from "../buttons/WhiteButton";

function ActionBar() {
  return (
    <div className="flex items-center gap-2 w-full bg-white p-4 rounded-lg shadow-lg justify-between">
      <div className="flex items-center gap-4">
        <ButtonGroup />
        <PriorityGroup />
      </div>
      <div className="flex items-center gap-4">
        <WhiteButton icon="">Archive</WhiteButton>
        <ColorButton
          onClick={() => alert("Add KVP")}
          color="blue"
          icon="/add.svg"
        >
          Neue Verbesserung
        </ColorButton>
      </div>
    </div>
  );
}
export default ActionBar;
