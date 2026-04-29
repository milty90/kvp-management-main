import FilterButtonGroup from "../buttons/FilterButtonGroup";
import ColorButton from "../buttons/ColorButton";
import { useKvpContext } from "../../context/KvpContext";
import { FilterBtnGroupMob } from "../buttons/FilterBtnGroupMob";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { KvpSwitchTab } from "../buttons/KvpSwitchTab";
import { useSpaceCalculation } from "../../utils/useSpaceCalculation";

interface ActionBarProps {
  isArchiveOpen: boolean;
  activeFilter: string;
  activePriority: string;
  onFilter: (filter: string) => void;
  onPriority: (priority: string) => void;
  onOpenModal: () => void;
  onOpenArchive: () => void;
}

export default function ActionBar({
  isArchiveOpen,
  activeFilter,
  activePriority,
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

  const { containerRef, leftRef, rightMeasureRef, hasEnoughSpace } =
    useSpaceCalculation({
      dependencies: [
        isArchiveOpen,
        activeFilter,
        activePriority,
        isCycleCollapsed,
        isPriorityCollapsed,
      ],
    });

  const showActions = width < 768 || hasEnoughSpace;

  const filterButtons = (
    <div className="flex justify-start items-center gap-2 ">
      {isArchiveOpen ? (
        <div className="relative">
          {width < 768 ? (
            <div className="relative">
              <FilterBtnGroupMob
                selected={activeFilter}
                filter={onFilter}
                tabs={["Alle", "Abgelehnt", "Archiv"]}
                position="left-0"
              />
              <FilterBtnGroupMob
                selected={activePriority}
                filter={onPriority}
                tabs={["Alle", "Niedrig", "Mittel", "Hoch"]}
                position="left-22"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FilterButtonGroup
                selected={activeFilter}
                filter={onFilter}
                onChange={handleCycleChange}
                tabs={["Alle", "Abgelehnt", "Archiv"]}
              />
              <FilterButtonGroup
                selected={activePriority}
                filter={onPriority}
                onChange={handlePriorityChange}
                tabs={["Alle", "Niedrig", "Mittel", "Hoch"]}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {width < 768 ? (
            <div className="relative">
              <FilterBtnGroupMob
                selected={activeFilter}
                filter={onFilter}
                tabs={["Alle", "Plan", "Do", "Check", "Act"]}
                position="left-0"
              />
              <FilterBtnGroupMob
                selected={activePriority}
                filter={onPriority}
                tabs={["Alle", "Niedrig", "Mittel", "Hoch"]}
                position="left-22"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FilterButtonGroup
                selected={activeFilter}
                filter={onFilter}
                onChange={handleCycleChange}
                tabs={["Alle", "Plan", "Do", "Check", "Act"]}
              />
              <FilterButtonGroup
                selected={activePriority}
                filter={onPriority}
                onChange={handlePriorityChange}
                tabs={["Alle", "Niedrig", "Mittel", "Hoch"]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  const actionButtons = (
    <div className="flex items-center gap-2 md:w-full md:justify-between md:gap-3">
      {width < 768 ? (
        <ColorButton
          onClick={onOpenArchive}
          color={theme === "dark" ? "gray" : "white"}
          isTextOnly={true}
        >
          {isArchiveOpen ? "KVPs" : "Archiv"}
        </ColorButton>
      ) : (
        <KvpSwitchTab
          isArchiveOpen={isArchiveOpen}
          onChange={(isKvpSelected) => {
            if (isKvpSelected && isArchiveOpen) onOpenArchive();
            else if (!isKvpSelected && !isArchiveOpen) onOpenArchive();
          }}
        />
      )}

      <ColorButton
        onClick={handleCreateClick}
        color={theme === "dark" ? "green" : "blue"}
        icon="/add.svg"
      >
        Neue KVP
      </ColorButton>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative flex z-30 items-center gap-2 w-full bg-surface px-1.5 py-1.5 -ml-1 md:px-2 h-13 rounded-xl shadow-sm justify-between"
    >
      <div ref={leftRef} className="flex justify-start items-center gap-2 ">
        {filterButtons}
      </div>

      {showActions ? actionButtons : null}

      <div
        ref={rightMeasureRef}
        className="absolute invisible pointer-events-none whitespace-nowrap"
      >
        {actionButtons}
      </div>
    </div>
  );
}
