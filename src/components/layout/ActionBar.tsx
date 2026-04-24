import ButtonGroup from "../buttons/CycleButtonGroup";
import ColorButton from "../buttons/ColorButton";
import PriorityGroup from "../buttons/PriorityGroup";
import { useKvpContext } from "../../context/KvpContext";
import { CycleBtnGroupMob } from "../buttons/CycleBtnGroupMob";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { PriorityBtnGroupMob } from "../buttons/PriorityBtnGroupMob";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { KvpSwitchTab } from "../buttons/KvpSwitchTab";

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
  const { theme } = useTheme();

  const [isCycleCollapsed, setIsCycleCollapsed] = useState(true);
  const [isPriorityCollapsed, setIsPriorityCollapsed] = useState(true);

  const handleCreateClick = () => {
    setSelectedKvp(null);
    onOpenModal();
  };

  const handleCycleChange = (isCollapsed: boolean) => {
    setIsCycleCollapsed(isCollapsed);
  };

  const handlePriorityChange = (isCollapsed: boolean) => {
    setIsPriorityCollapsed(isCollapsed);
  };

  return (
    <div className="flex z-30 items-center gap-2 w-full bg-surface px-1.5 py-1.5 -ml-1 md:px-2 h-13 rounded-xl shadow-sm justify-between">
      <div className="flex justify-start items-center gap-2 md:gap-3">
        {isArchiveOpen ? null : (
          <div className="relative">
            {width < 768 ? (
              <div className="relative">
                <CycleBtnGroupMob filter={onFilter} />
                <PriorityBtnGroupMob filter={onPriority} />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <ButtonGroup filter={onFilter} onChange={handleCycleChange} />
                <PriorityGroup
                  filter={onPriority}
                  onChange={handlePriorityChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {isCycleCollapsed && isPriorityCollapsed ? (
        <div className="flex items-center gap-2 md:w-full md:justify-between  md:gap-3">
          <ColorButton
            onClick={onOpenArchive}
            color={theme === "dark" ? "gray" : "white"}
            isTextOnly={true}
          >
            {isArchiveOpen ? "Aktive KVPs" : "Inaktive KVPs"}
          </ColorButton>
          <KvpSwitchTab />

          <ColorButton
            onClick={handleCreateClick}
            color={theme === "dark" ? "green" : "blue"}
            icon="/add.svg"
          >
            Neue KVP
          </ColorButton>
        </div>
      ) : null}
    </div>
  );
}
export default ActionBar;
