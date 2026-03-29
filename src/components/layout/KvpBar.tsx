import { useKvpContext } from "../../context/KvpContext";
import KvpCard from "../kvp/KvpCard";

const VALID_STATES = ["Plan", "Do", "Check", "Act"] as const;

interface KvpBarProps {
  activeFilter: string;
  activePriority: string;
  onOpenModal: () => void;
}

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

  const filtered = kvps.filter((k) => {
    const stateMatch = activeFilter === "Alle" || k.state === activeFilter;
    const priorityMatch =
      activePriority === "Alle" || k.priority === priorityMap[activePriority];
    return stateMatch && priorityMatch;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full pt-3 px-3 rounded-t-xl bg-white text-gray-800 gap-3 overflow-y-auto flex-1 scrollbar-none">
      {VALID_STATES.map((state) => {
        const filteredByState = filtered.filter((k) => k.state === state);

        return (
          <div key={state} className="flex flex-col gap-3 mb-8">
            <div className="flex gap-2 px-2 py-1.5 rounded-lg text-sm font-medium bg-gray-200/80">
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
