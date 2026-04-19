import { toast } from "react-toastify";
import { useKvpContext } from "../../context/KvpContext";
import KvpCard from "../kvp/KvpCard";
import { useTheme } from "../../context/ThemeContext";

const VALID_STATES = ["Rejected", "Archived"] as const;

export function ArchiveBar() {
  const { kvps } = useKvpContext();
  const { theme } = useTheme();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 w-full pt-2.5 px-2.5 md:pt-3 md:px-3 rounded-t-xl bg-surface text-text-primary gap-3 flex-1 overflow-y-auto scrollbar-none">
      {VALID_STATES.map((state) => {
        const filtered = kvps.filter((k) =>
          state === "Archived"
            ? k.state === "Archived"
            : k.state === "Rejected",
        );

        return (
          <div key={state} className="flex flex-col gap-3 mb-4 md:mb-8">
            <div
              className={`flex gap-2 px-2 py-1.5 rounded-lg text-sm font-medium ${theme === "dark" ? "bg-gray-500/20 text-text-primary" : "bg-gray-200/80 text-text-primary"}`}
            >
              <span
                className={`text-sm ml-2 font-semibold text-gray-600 ${theme === "dark" ? "text-text-secondary" : " text-text-secondary"}`}
              >
                {state === "Archived" ? "Archivierte KVPs" : "Abgelehnte KVPs"}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-32 rounded-lg border border-dashed border-gray-300">
                <p className="text-xs text-gray-500">Keine Elemente</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {filtered.map((kvp) => (
                  <KvpCard
                    key={kvp.id}
                    {...kvp}
                    state={state}
                    onOpenModal={() => {
                      toast.info(
                        "Archivierte und abgelehnte KVPs können nicht bearbeitet werden.",
                        {
                          position: "top-center",
                          className: "mt-6 text-sm font-poppins ",
                        },
                      );
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
