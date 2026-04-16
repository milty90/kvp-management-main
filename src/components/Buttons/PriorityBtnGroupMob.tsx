import { useState } from "react";

const tabs = ["Alle", "Niedrig", "Mittel", "Hoch"];

interface PriorityBtnGroupMobProps {
  filter: (state: string) => void;
}
export function PriorityBtnGroupMob({ filter }: PriorityBtnGroupMobProps) {
  const [selected, setSelected] = useState("Alle");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const visibleTabs = isCollapsed ? [selected] : tabs;

  return (
    <div className="absolute z-30 flex flex-col items-center gap-1 -top-5 left-22 bg-gray-200/80 p-1 rounded-xl">
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
              ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
