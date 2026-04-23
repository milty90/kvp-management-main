import { useState } from "react";

interface TopNavButtonProps {
  icon: React.ReactNode;
  theme?: string;
}

const tabs = ["Verbesseungen", "Statistiken"];

export function TopNavButton({ theme }: TopNavButtonProps) {
  const [selected, setSelected] = useState("Verbesseungen");
  return (
    <div
      className={`inline-flex items-center p-1 gap-2 rounded-xl ${theme === "dark" ? "bg-gray-500/50" : "bg-gray-200/80"}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            const newSelected = selected === tab ? selected : tab;
            setSelected(newSelected);
            console.log(newSelected);
          }}
          className={`flex px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${
                selected === tab
                  ? `${theme === "dark" ? "text-text-primary bg-button" : "text-white bg-button"} shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]`
                  : `${theme === "dark" ? "text-gray-300 hover:text-text-primary" : "text-gray-600 hover:text-text-primary"}`
              }
            `}
        >
          <img
            src={
              tab === "Verbesseungen"
                ? `${theme === "dark" ? (selected === tab ? "/trending.svg" : "/trending-light-gray.svg") : selected === tab ? "/trending.svg" : "/trending-gray.svg"}`
                : `${theme === "dark" ? (selected === tab ? "/graph.svg" : "/graph-light-gray.svg") : selected === tab ? "/graph.svg" : "/graph-gray.svg"}`
            }
            alt={tab}
            className="w-4 h-4 mr-2 mt-0.5"
          />
          {tab}
        </button>
      ))}
    </div>
  );
}
