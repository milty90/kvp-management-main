import ButtonGroup from "../buttons/ButtonGroup";
import ColorButton from "../buttons/ColorButton";
import PriorityGroup from "../buttons/PriorityGroup";
import WhiteButton from "../buttons/WhiteButton";
import { useKvpContext } from "../../context/KvpContext";

interface ActionBarProps {
  isArchiveOpen: boolean;
  onFilter: (filter: string) => void;
  onPriority: (priority: string) => void;
  onOpenModal: () => void;
  onOpenArchive: () => void;
}

function ActionBar({
  isArchiveOpen,
  onFilter,
  onPriority,
  onOpenModal,
  onOpenArchive,
}: ActionBarProps) {
  const { setSelectedKvp } = useKvpContext();

  const handleCreateClick = () => {
    setSelectedKvp(null);
    onOpenModal();
  };

  return (
    <div className="flex items-center gap-2 w-full bg-white px-1.5 -ml-1 md:px-2.5 py-2 h-14 rounded-xl shadow-md justify-between">
      <div className="relative z-10 flex justify-start items-center gap-2 md:gap-3">
        {isArchiveOpen ? null : (
          <>
            <ButtonGroup filter={onFilter} />
            <PriorityGroup filter={onPriority} />
          </>
        )}
      </div>
      <div className="flex items-center gap-2 md:gap-3">
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
