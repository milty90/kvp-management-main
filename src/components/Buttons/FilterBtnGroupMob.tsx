import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface FilterBtnGroupMobProps {
  selected: string;
  filter: (state: string) => void;
  tabs: string[];
  position: string;
  startState: string;
}
export function FilterBtnGroupMob({
  selected,
  filter,
  tabs,
  position,
  startState,
}: FilterBtnGroupMobProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const visibleTabs = isCollapsed ? [selected] : tabs;

  const { theme } = useTheme();

  return (
    <div
      className={`absolute z-30 flex flex-col items-center gap-1 -top-5 ${position} p-1 rounded-xl ${theme === "dark" ? "bg-gray-500" : "bg-gray-200/80"}`}
    >
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            const newSelected =
              selected === tab && tab !== startState ? selected : tab;
            filter(newSelected);
            setIsCollapsed((prev) => !prev);
          }}
          className={`py-1.5 w-18 rounded-lg text-sm font-medium transition-all duration-150 ${
            selected === tab
              ? `${theme === "dark" ? "text-text-primary bg-gray-600/80" : "text-text-primary bg-white"} shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]`
              : "text-text-primary hover:text-text-secondary/50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
