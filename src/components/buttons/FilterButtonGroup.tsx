import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface FilterButtonGroupProps {
  selected: string;
  filter: (state: string) => void;
  onChange?: (state: boolean) => void;
  tabs: string[];
  startState: string;
}

export default function FilterButtonGroup({
  selected,
  filter,
  onChange,
  tabs,
  startState,
}: FilterButtonGroupProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { theme } = useTheme();

  const visibleTabs = isCollapsed ? [selected] : tabs;
  const arrow = isCollapsed ? ">" : "<";

  function handleToggle() {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    onChange?.(nextState);
  }

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl ${theme === "dark" ? "bg-gray-500/50" : "bg-gray-200/80"}`}
    >
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            const newSelected =
              selected === tab && tab !== startState ? startState : tab;
            filter(newSelected);
          }}
          className={`px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
              ${
                selected === tab
                  ? `${theme === "dark" ? "text-text-primary bg-gray-500" : "text-gray-900 bg-white"} shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]`
                  : `${theme === "dark" ? "text-gray-300 hover:text-text-primary" : "text-gray-600 hover:text-text-primary"}`
              }
            `}
        >
          {tab}
        </button>
      ))}
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex px-2 md:px-3 py-0.5 ml-1 rounded-lg text-xl font-medium text-gray-500 hover:text-gray-700
          ${
            isCollapsed
              ? " bg-transparent hover:bg-gray-300/50"
              : ` ${theme === "dark" ? "text-text-primary bg-gray-500" : "text-gray-900 bg-white"} shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]`
          }
        `}
      >
        {arrow}
      </button>
    </div>
  );
}
