import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const tabs = ["KVPs", "Archiv"];

interface KvpSwitchTabProps {
  onChange?: (state: boolean) => void;
}

export function KvpSwitchTab({ onChange }: KvpSwitchTabProps) {
  const [selected, setSelected] = useState("KVPs");
  const { theme } = useTheme();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setSelected(tab);
            onChange?.(tab === "KVPs");
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
    </div>
  );
}
