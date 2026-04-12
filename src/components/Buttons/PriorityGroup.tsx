import { useState } from "react";
import { useWindowWidth } from "../../utils/useWindowWidth";

const tabs = ["Alle", "Niedrig", "Mittel", "Hoch"];

interface PriorityGroupProps {
  filter: (priority: string) => void;
}

export default function PriorityGroup({ filter }: PriorityGroupProps) {
  const [selected, setSelected] = useState("Alle");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const visibleTabs = isCollapsed ? ["Alle"] : tabs;
  const arrow = isCollapsed ? ">" : "<";
  const width = useWindowWidth();

  return (
    <div
      className={`${width < 768 ? "absolute -top-5 z-10 left-26 w-17 items-start bg-gray-200/80" : "inline-flex"} items-center gap-1 bg-gray-200/80 p-1 rounded-xl`}
    >
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            const newSelected =
              selected === tab && tab !== "Alle" ? "Alle" : tab;
            setSelected(newSelected);
            filter(newSelected);
          }}
          className={`
               ${width < 768 ? "min-w-15 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-150" : " px-3 md:px-4 py-1.5  rounded-lg text-sm font-medium transition-all duration-150"}
              ${
                selected === tab
                  ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
        >
          {tab}
        </button>
      ))}

      <button
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
        className={`
          ${width < 768 ? "absolute top-0.5 left-17.5 w-8 rotate-90" : "inline-flex"}
          px-2 md:px-3 py-0.5 rounded-lg text-xl font-medium text-gray-500 hover:text-gray-700
          ${
            isCollapsed
              ? " bg-transparent hover:bg-gray-300/50"
              : " bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]"
          }
        `}
      >
        {arrow}
      </button>
    </div>
  );
}
