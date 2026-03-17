import { useState } from "react";

const tabs = ["Keine", "Niedrig", "Mittel", "Hoch"];

export default function PriorityGroup() {
  const [selected, setSelected] = useState("Keine");

  const visibleTabs = selected === "Hoch" ? ["Keine", "Hoch"] : tabs;

  return (
    <div className="inline-flex items-center gap-1 bg-gray-200/80 p-1 rounded-xl">
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() =>
            setSelected(selected === tab && tab !== "Keine" ? "Keine" : tab)
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
    </div>
  );
}
