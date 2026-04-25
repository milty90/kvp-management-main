import { useKvpContext } from "../../context/KvpContext";
import KvpCard from "../kvp/KvpCard";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTheme } from "../../context/ThemeContext";

const VALID_STATES = ["Plan", "Do", "Check", "Act"] as const;

const colorClassesLight: Record<string, string> = {
  yellow: "bg-yellow-100 border-yellow-300/60 text-yellow-700",
  blue: "bg-blue-100 border-blue-300/50 text-blue-700",
  violet: "bg-violet-100 border-violet-300/50 text-violet-700",
  green: "bg-green-100 border-green-300/50 text-green-700",
};

const colorClassesDark: Record<string, string> = {
  blue: "bg-blue-400/40 border-blue-600/70 text-blue-950",
  violet: "bg-violet-400/40 border-violet-600/70 text-violet-950",
  yellow: "bg-yellow-300/40 border-yellow-600/70 text-yellow-950",
  green: "bg-green-300/40 border-green-600/70 text-green-950",
};

interface KvpBarProps {
  activeFilter: string;
  activePriority: string;
  onOpenModal: () => void;
}
const colorMap: Record<string, string> = {
  Plan: "blue",
  Do: "violet",
  Check: "yellow",
  Act: "green",
};

const priorityMap: Record<string, string> = {
  Hoch: "High",
  Mittel: "Medium",
  Niedrig: "Low",
};

export default function KvpBar({
  activeFilter,
  activePriority,
  onOpenModal,
}: KvpBarProps) {
  const { kvps } = useKvpContext();
  const width = useWindowWidth();

  const filtered = kvps.filter((k) => {
    const stateMatch = activeFilter === "Alle" || k.state === activeFilter;
    const priorityMatch =
      activePriority === "Alle" || k.priority === priorityMap[activePriority];
    return stateMatch && priorityMatch;
  });

  const { theme } = useTheme();
  const colorClasses = theme === "dark" ? colorClassesDark : colorClassesLight;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full pt-2.5 md:pt-3 px-2.5 md:px-3 rounded-t-xl bg-surface text-gray-800 gap-3 overflow-y-auto z-0 flex-1 scrollbar-none">
      {VALID_STATES.map((state) => {
        const filteredByState = filtered.filter((k) => k.state === state);

        return (
          <div
            key={state}
            className={`flex flex-col bg-linear-to-b ${theme === "dark" ? "from-gray-800/20 from-80% to-transparent" : "from-gray-200/20 from-80% to-transparent"} rounded-xl gap-3 mb-4 md:mb-8`}
          >
            <div
              className={`flex gap-2 px-2 py-1.5 rounded-lg text-sm font-medium ${width < 768 ? colorClasses[colorMap[state]] : ` ${theme === "dark" ? "bg-gray-500/20 border-border text-text-primary" : "bg-gray-200/80 border-border text-text-secondary"}`}`}
            >
              <span
                className={`text-sm ml-2 font-semibold ${theme === "dark" ? "text-text-primary text-shadow-lg/20" : " text-text-secondary"}`}
              >
                {state}
              </span>
            </div>

            {filteredByState.length === 0 ? (
              <div className="flex items-center justify-center h-32 rounded-lg border border-dashed border-border">
                <p className="text-xs text-text-secondary">Keine Elemente</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredByState.map((kvp) => (
                  <KvpCard
                    key={kvp.id}
                    {...kvp}
                    state={state}
                    onOpenModal={onOpenModal}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
