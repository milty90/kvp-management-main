import { useLocation } from "react-router-dom";

interface TopNavButtonProps {
  theme?: string;
  onChange?: (state: boolean) => void;
}

const tabs = ["Verbesseungen", "Statistiken"];

export function TopNavButton({ theme, onChange }: TopNavButtonProps) {
  const location = useLocation();
  const selected =
    location.pathname === "/kvps" ? "Verbesseungen" : "Statistiken";
  return (
    <div
      className={`inline-flex items-center p-1 gap-1.5 rounded-xl ${theme === "dark" ? "bg-gray-500/50" : "bg-gray-200/80"}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            const newSelected = selected === tab ? selected : tab;
            if (onChange) {
              onChange(newSelected === "Verbesseungen");
            }
          }}
          className={`flex px-3 md:px-4 py-2 rounded-lg text-sm font-medium
              ${
                selected === tab
                  ? `${theme === "dark" ? "text-text-primary bg-green-800 hover:bg-green-600" : "text-white bg-blue-500 hover:bg-blue-600"} shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]`
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
