import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const tabs = ["Alle", "Plan", "Do", "Check", "Act"];

interface CycleBtnGroupMobProps {
  filter: (state: string) => void;
}
export function CycleBtnGroupMob({ filter }: CycleBtnGroupMobProps) {
  const [selected, setSelected] = useState("Alle");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const visibleTabs = isCollapsed ? [selected] : tabs;

  const { theme } = useTheme();

  return (
    <div
      className={`absolute z-30 flex flex-col items-center gap-1 -top-5 left-0 p-1 rounded-xl ${theme === "dark" ? "bg-gray-500" : "bg-gray-200/80"}`}
    >
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            const newSelected =
              selected === tab && tab !== "Alle" ? selected : tab;
            setSelected(newSelected);
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
