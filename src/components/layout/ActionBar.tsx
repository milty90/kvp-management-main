import ButtonGroup from "../buttons/ButtonGroup";
import ColorButton from "../buttons/ColorButton";
import PriorityGroup from "../buttons/PriorityGroup";
import WhiteButton from "../buttons/WhiteButton";
import { useKvpContext } from "../../context/KvpContext";

interface ActionBarProps {
  isArchiveOpen: boolean;
  onOpenModal: () => void;
  onOpenArchive: () => void;
}

function ActionBar({
  isArchiveOpen,
  onOpenModal,
  onOpenArchive,
}: ActionBarProps) {
  const { setSelectedKvp } = useKvpContext();

  const handleCreateClick = () => {
    setSelectedKvp(null);
    onOpenModal();
  };
  return (
    <div className="flex items-center gap-2 w-full bg-white px-2.5 py-2 rounded-xl shadow-md justify-between">
      <div className="flex items-center gap-3">
        <ButtonGroup />
        <PriorityGroup />
      </div>
      <div className="flex items-center gap-3">
        <WhiteButton onClick={onOpenArchive} icon="">
          {isArchiveOpen ? "Aktive KVPs" : "Inaktive KVPs"}
        </WhiteButton>
        <ColorButton onClick={handleCreateClick} color="blue" icon="/add.svg">
          Neue KVP
        </ColorButton>
      </div>
    </div>
  );
}
export default ActionBar;
