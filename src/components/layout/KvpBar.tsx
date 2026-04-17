import { useKvpContext } from "../../context/KvpContext";
import KvpCard from "../kvp/KvpCard";
import { useWindowWidth } from "../../utils/useWindowWidth";

const VALID_STATES = ["Plan", "Do", "Check", "Act"] as const;

const colorClasses: Record<string, string> = {
  yellow: "bg-yellow-100/70 border-yellow-300/60 text-yellow-700",
  blue: "bg-blue-100/70 border-blue-300/50 text-blue-700",
  violet: "bg-violet-100/70 border-violet-300/50 text-violet-700",
  green: "bg-green-100/70 border-green-300/50 text-green-700",
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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full pt-2.5 md:pt-3 px-2.5 md:px-3 rounded-t-xl bg-white text-gray-800 gap-3 overflow-y-auto z-0 flex-1 scrollbar-none">
      {VALID_STATES.map((state) => {
        const filteredByState = filtered.filter((k) => k.state === state);

        return (
          <div key={state} className="flex flex-col gap-3 mb-4 md:mb-8">
            <div
              className={`flex gap-2 px-2 py-1.5 rounded-lg text-sm font-medium ${width < 768 ? colorClasses[colorMap[state]] : " bg-gray-200/80 border-gray-300/50 text-gray-700"}`}
            >
              <span className="text-sm ml-2 font-semibold text-gray-600">
                {state}
              </span>
            </div>

            {filteredByState.length === 0 ? (
              <div className="flex items-center justify-center h-32 rounded-lg border border-dashed border-gray-300">
                <p className="text-xs text-gray-500">Keine Elemente</p>
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
