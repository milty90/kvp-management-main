import { toast } from "react-toastify";
import ButtonGroup from "../buttons/ButtonGroup";
import ColorButton from "../buttons/ColorButton";
import PriorityGroup from "../buttons/PriorityGroup";
import WhiteButton from "../buttons/WhiteButton";

interface ActionBarProps {
  onOpenModal: () => void;
}

function ActionBar({ onOpenModal }: ActionBarProps) {
  return (
    <div className="flex items-center gap-2 w-full bg-white px-2.5 py-2 rounded-xl shadow-md justify-between">
      <div className="flex items-center gap-4">
        <ButtonGroup />
        <PriorityGroup />
      </div>
      <div className="flex items-center gap-4">
        <WhiteButton
          onClick={() =>
            toast.info("Archivierungsfunktion ist derzeit nicht verfügbar.", {
              position: "top-center",
              className: "mt-6 text-gray-500 text-sm font-poppins ",
            })
          }
          icon=""
        >
          Archive
        </WhiteButton>
        <ColorButton onClick={onOpenModal} color="blue" icon="/add.svg">
          Neue KVP
        </ColorButton>
      </div>
    </div>
  );
}
export default ActionBar;
