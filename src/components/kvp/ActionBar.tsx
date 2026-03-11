import ButtonGroup from "../Buttons/ButtonGroup";
import ColorButton from "../Buttons/ColorButton";
import WhiteButton from "../Buttons/WhiteButton";

function ActionBar() {
  return (
    <div className="flex items-center gap-2 w-full bg-white p-4 rounded-lg shadow-lg justify-between">
      <ButtonGroup />
      <div className="flex items-center gap-4">
        <WhiteButton icon="">Archive</WhiteButton>
        <ColorButton color="blue" icon="/add.svg">
          Neue Verbesserung
        </ColorButton>
      </div>
    </div>
  );
}
export default ActionBar;
