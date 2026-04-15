import { useState } from "react";

const tabs = ["Alle", "Plan", "Do", "Check", "Act"];

interface CycleBtnGroupMobProps {
  filter: (state: string) => void;
}
export function CycleBtnGroupMob({ filter }: CycleBtnGroupMobProps) {
  const [selected, setSelected] = useState("Alle");

  return (
    <div className="inline-flex items-center gap-1 bg-gray-200/80 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            const newSelected =
              selected === tab && tab !== "Alle" ? "Alle" : tab;
            setSelected(newSelected);
            filter(newSelected);
          }}
          className={`px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
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
