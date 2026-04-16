import ButtonGroup from "../buttons/CycleButtonGroup";
import ColorButton from "../buttons/ColorButton";
import PriorityGroup from "../buttons/PriorityGroup";
import WhiteButton from "../buttons/WhiteButton";
import { useKvpContext } from "../../context/KvpContext";
import { CycleBtnGroupMob } from "../buttons/CycleBtnGroupMob";

import { useWindowWidth } from "../../utils/useWindowWidth";
import { PriorityBtnGroupMob } from "../buttons/PriorityBtnGroupMob";

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

  const width = useWindowWidth();

  const handleCreateClick = () => {
    setSelectedKvp(null);
    onOpenModal();
  };

  return (
    <div className="flex items-center gap-2 w-full bg-white px-1.5 -ml-1 md:px-2 h-13 rounded-2xl shadow-md justify-between">
      <div className="flex justify-start items-center gap-2 md:gap-3">
        {isArchiveOpen ? null : (
          <div className="relative z-10">
            {width < 768 ? (
              <div className="relative">
                <CycleBtnGroupMob filter={onFilter} />
                <PriorityBtnGroupMob filter={onPriority} />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ButtonGroup filter={onFilter} />
                <PriorityGroup filter={onPriority} />
              </div>
            )}
          </div>
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
