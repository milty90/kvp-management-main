import { useKvpContext } from "../../context/KvpContext";
import KvpCard from "../kvp/KvpCard";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { showToast } from "../items/ToastItem";
import { useTranslation } from "../../utils/useTranslation";
import { useState } from "react";

const VALID_STATES = ["Rejected", "Archived"] as const;

interface ArchiveBarProps {
  activeFilter: string;
  activePriority: string;
  onOpenModal?: () => void;
}

const priorityMap: Record<string, string> = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
  Hoch: "High",
  Mittel: "Medium",
  Niedrig: "Low",
};

export function ArchiveBar({
  activeFilter,
  activePriority,
  onOpenModal,
}: ArchiveBarProps) {
  const { kvps } = useKvpContext();
  const { theme } = useTheme();
  const width = useWindowWidth();
  const translation = useTranslation();

  const filtered = kvps.filter((k) => {
    const stateMatch =
      activeFilter === translation.actionBar.startState ||
      k.state === activeFilter ||
      (activeFilter === "Archiv" && k.state === "Archived") ||
      (activeFilter === "Abgelehnt" && k.state === "Rejected");
    const priorityMatch =
      activePriority === translation.actionBar.startState ||
      k.priority === priorityMap[activePriority];
    return stateMatch && priorityMatch;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 w-full pt-2.5 px-2.5 md:pt-3 md:px-3 rounded-t-xl bg-surface text-text-primary gap-3 flex-1 overflow-y-auto scrollbar-none">
      {VALID_STATES.map((state) => {
        const stateFiltered = filtered.filter((k) => k.state === state);

        return (
          <div
            key={state}
            className={`flex flex-col bg-linear-to-b ${theme === "dark" ? "from-gray-800/20 from-80% to-transparent" : "from-gray-200/20 from-80% to-transparent"} rounded-xl gap-3 mb-4 md:mb-8`}
          >
            <div
              className={`flex gap-2 px-2 py-1.5 rounded-lg text-sm font-medium ${theme === "dark" ? "bg-gray-500/20 text-text-primary" : "bg-gray-200/80 text-text-primary"}`}
            >
              <span
                className={`text-sm ml-2 font-semibold text-gray-600 ${theme === "dark" ? "text-text-secondary" : " text-text-secondary"}`}
              >
                {state === "Archived"
                  ? translation.archiveBar.archivedPCDA
                  : translation.archiveBar.rejectedPCDA}
              </span>
            </div>

            {stateFiltered.length === 0 ? (
              <div className="flex items-center justify-center h-16 md:h-32 rounded-lg border border-dashed border-gray-300">
                <p className="text-xs text-gray-500">
                  {translation.archiveBar.noItems}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {stateFiltered.map((kvp) => (
                  <KvpCard
                    key={kvp.id}
                    {...kvp}
                    state={state}
                    onOpenModal={() => {
                      if (kvp.state === "Archived") {
                        onOpenModal?.();
                      } else {
                        showToast(
                          width,
                          theme,
                          "info",
                          translation.pdcaCard.rejectedToastMessage,
                        );
                      }
                    }}
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
