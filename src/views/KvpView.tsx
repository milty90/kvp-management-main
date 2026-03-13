import TopBar from "../components/layout/TopBar";
import ActionBar from "../components/layout/ActionBar";
import KvpBar from "../components/layout/KvpBar";
import StatusCard from "../components/cards/StatCard";

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
    state: "Plan",
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
    state: "Plan",
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
    priority: "Niedrig",
    createdBy: "Jane Doe",
    createdAt: "08.01.2024",
    targetDate: "12.01.2024",
  },
];

interface KvpViewProps {
  onOpenModal: () => void;
}

function KvpView({ onOpenModal }: KvpViewProps) {
  return (
    <div className="flex flex-col px-8 pb-0 pt-8 items-center bg-gray-100 gap-4 h-full overflow-hidden">
      <TopBar
        planQuantity={kvps.filter((k) => k.state === "Plan").length}
        doQuantity={kvps.filter((k) => k.state === "Do").length}
        checkQuantity={kvps.filter((k) => k.state === "Check").length}
        actQuantity={kvps.filter((k) => k.state === "Act").length}
      />
      <ActionBar onOpenModal={onOpenModal} />
      <KvpBar array={kvps} states={STATES} />
      <div className="w-full grid grid-cols-4 gap-4 my-4">
        <StatusCard
          status="Gesamt"
          quantity={kvps.length.toString()}
          path="data.svg"
          iconColor="blue"
        />
        <StatusCard
          status="Abgeschlossen"
          quantity={kvps.filter((k) => k.state === "Act").length.toString()}
          path="checkmark.svg"
          iconColor="green"
        />
        <StatusCard
          status="Zugewiesen"
          quantity={kvps.filter((k) => k.state === "Plan").length.toString()}
          path="users.svg"
          iconColor="violet"
        />
        <StatusCard
          status="Hohe Priorität"
          quantity={kvps.filter((k) => k.priority === "Hoch").length.toString()}
          path="target2.svg"
          iconColor="red"
        />
      </div>
    </div>
  );
}

export default KvpView;
