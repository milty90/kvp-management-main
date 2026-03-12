import TopBar from "../components/layout/TopBar";
import ActionBar from "../components/kvp/ActionBar";
import KvpCard from "../components/kvp/KvpCard";

type Priority = "Mittel" | "Niedrig" | "Hoch";
type State = "Plan" | "Do" | "Check" | "Act";

const STATES: State[] = ["Plan", "Do", "Check", "Act"];

type Kvp = {
  id: number;
  title: string;
  category: string;
  assignedTo: string;
  description: string;
  state: State;
  priority: Priority;
  createdBy: string;
  createdAt: string;
  targetDate: string;
};

const kvps: Kvp[] = [
  {
    id: 1,
    title: "Beispiel KVP",
    category: "Kategorie 1",
    assignedTo: "Max Mustermann",
    description: "Beschreibung des KVP",
    state: "Plan",
    priority: "Hoch",
    createdBy: "Max Mustermann",
    createdAt: "01.01.2024",
    targetDate: "05.01.2024",
  },
  {
    id: 2,
    title: "Beispiel KVP 2",
    category: "Kategorie 2",
    assignedTo: "Erika Mustermann",
    description:
      "Beschreibung des KVP 2 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Do",
    priority: "Mittel",
    createdBy: "Erika Mustermann",
    createdAt: "02.01.2024",
    targetDate: "06.01.2024",
  },
  {
    id: 3,
    title: "Beispiel KVP 3",
    category: "Kategorie 3",
    assignedTo: "John Doe",
    description:
      "Beschreibung des KVP 3 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Act",
    priority: "Niedrig",
    createdBy: "John Doe",
    createdAt: "03.01.2024",
    targetDate: "07.01.2024",
  },
  {
    id: 4,
    title: "Beispiel KVP 4",
    category: "Kategorie 4",
    assignedTo: "Jane Doe",
    description:
      "Beschreibung des KVP 4 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Plan",
    priority: "Hoch",
    createdBy: "Jane Doe",
    createdAt: "04.01.2024",
    targetDate: "08.01.2024",
  },
  {
    id: 5,
    title: "Beispiel KVP 5",
    category: "Kategorie 5",
    assignedTo: "Max Mustermann",
    description:
      "Beschreibung des KVP 5 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Do",
    priority: "Mittel",
    createdBy: "Max Mustermann",
    createdAt: "05.01.2024",
    targetDate: "09.01.2024",
  },
  {
    id: 6,
    title: "Beispiel KVP 6",
    category: "Kategorie 6",
    assignedTo: "Erika Mustermann",
    description:
      "Beschreibung des KVP 6 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Act",
    priority: "Niedrig",
    createdBy: "Erika Mustermann",
    createdAt: "06.01.2024",
    targetDate: "10.01.2024",
  },
  {
    id: 7,
    title: "Beispiel KVP 7",
    category: "Kategorie 7",
    assignedTo: "John Doe",
    description:
      "Beschreibung des KVP 7 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Plan",
    priority: "Hoch",
    createdBy: "John Doe",
    createdAt: "07.01.2024",
    targetDate: "11.01.2024",
  },
  {
    id: 8,
    title: "Beispiel KVP 8",
    category: "Kategorie 8",
    assignedTo: "Jane Doe",
    description: "Beschreibung des KVP 8",
    state: "Do",
    priority: "Mittel",
    createdBy: "Jane Doe",
    createdAt: "08.01.2024",
    targetDate: "12.01.2024",
  },
];

function KvpView() {
  return (
    <div className="flex flex-col items-center bg-gray-100 gap-4 h-full overflow-hidden">
      <TopBar
        planQuantity={kvps.filter((k) => k.state === "Plan").length}
        doQuantity={kvps.filter((k) => k.state === "Do").length}
        checkQuantity={kvps.filter((k) => k.state === "Check").length}
        actQuantity={kvps.filter((k) => k.state === "Act").length}
      />
      <ActionBar />
      <div className="grid grid-cols-4 w-full p-4 rounded-lg bg-white text-gray-800 gap-3 overflow-y-auto flex-1 scrollbar-none">
        {STATES.map((state) => {
          const filtered = kvps.filter((k) => k.state === state);

          return (
            <div key={state} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <span className="text-sm ml-2 font-semibold  text-gray-500">
                  {state}
                </span>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {filtered.length}
                </span>
              </div>

              {filtered.length === 0 ? (
                <div className="flex items-center justify-center h-32 rounded-lg border border-dashed border-gray-300">
                  <p className="text-xs text-gray-500">Keine Elemente</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filtered.map((kvp) => (
                    <KvpCard key={kvp.id} {...kvp} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KvpView;
