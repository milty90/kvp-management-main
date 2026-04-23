import { useState } from "react";

interface TopNavButtonProps {
  icon: React.ReactNode;
  theme?: string;
  onClick: () => void;
}

const tabs = ["Verbesseungen", "Statistiken"];

export function TopNavButton({ icon, theme, onClick }: TopNavButtonProps) {
  const [selected, setSelected] = useState("Verbesseungen");
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl ${theme === "dark" ? "bg-gray-500/50" : "bg-white text-gray-200/80"}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={onClick}
          className={`px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
              ${
                theme === "dark"
                  ? "text-text-primary bg-gray-500 hover:bg-gray-600"
                  : "text-gray-600 bg-white hover:bg-gray-100"
              }
            `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
