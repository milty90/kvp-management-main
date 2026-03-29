import { useState } from "react";

const tabs = ["Alle", "Plan", "Do", "Check", "Act"];

export default function ButtonGroup() {
  const [selected, setSelected] = useState("Alle");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const visibleTabs = isCollapsed ? ["Alle"] : tabs;
  const arrow = isCollapsed ? ">" : "<";

  return (
    <div className="inline-flex  items-center gap-1 bg-gray-200/80 p-1 rounded-xl">
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() =>
            setSelected(selected === tab && tab !== "Alle" ? "Alle" : tab)
          }
          className={`
              px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
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
           px-3 py-0.5 rounded-lg text-xl font-medium text-gray-500 hover:text-gray-700
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
