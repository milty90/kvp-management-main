import FilterButtonGroup from "../buttons/FilterButtonGroup";
import ColorButton from "../buttons/ColorButton";
import { useKvpContext } from "../../context/KvpContext";
import { FilterBtnGroupMob } from "../buttons/FilterBtnGroupMob";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { KvpSwitchTab } from "../buttons/KvpSwitchTab";
import { useSpaceCalculation } from "../../utils/useSpaceCalculation";
import { useTranslation } from "../../utils/useTranslation";

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
  const translation = useTranslation();

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
                startState={translation.actionBar.startState}
                selected={activeFilter}
                filter={onFilter}
                tabs={translation.actionBar.archive}
                position="left-0"
              />
              <FilterBtnGroupMob
                startState={translation.actionBar.startState}
                selected={activePriority}
                filter={onPriority}
                tabs={translation.actionBar.priority}
                position="left-22"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FilterButtonGroup
                selected={activeFilter}
                filter={onFilter}
                onChange={handleCycleChange}
                tabs={translation.actionBar.archive}
                startState={translation.actionBar.startState}
              />
              <FilterButtonGroup
                selected={activePriority}
                filter={onPriority}
                onChange={handlePriorityChange}
                tabs={translation.actionBar.priority}
                startState={translation.actionBar.startState}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {width < 768 ? (
            <div className="relative">
              <FilterBtnGroupMob
                startState={translation.actionBar.startState}
                selected={activeFilter}
                filter={onFilter}
                tabs={translation.actionBar.filter}
                position="left-0"
              />
              <FilterBtnGroupMob
                startState={translation.actionBar.startState}
                selected={activePriority}
                filter={onPriority}
                tabs={translation.actionBar.priority}
                position="left-22"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FilterButtonGroup
                selected={activeFilter}
                filter={onFilter}
                onChange={handleCycleChange}
                tabs={translation.actionBar.filter}
                startState={translation.actionBar.startState}
              />
              <FilterButtonGroup
                selected={activePriority}
                filter={onPriority}
                onChange={handlePriorityChange}
                tabs={translation.actionBar.priority}
                startState={translation.actionBar.startState}
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
          {isArchiveOpen
            ? translation.actionBar.actionButton[0]
            : translation.actionBar.actionButton[1]}
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
        {translation.actionBar.newPCDAButton.openModal}
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
