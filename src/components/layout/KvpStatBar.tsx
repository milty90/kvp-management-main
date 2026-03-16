import StatCard from "../cards/StatCard";

interface KvpStatBarProps {
  total: number;
  completed: number;
  assigned: number;
  highPriority: number;
}

export function KvpStatBar({
  total,
  completed,
  assigned,
  highPriority,
}: KvpStatBarProps) {
  return (
    <div className="w-full p-4 pt-0 rounded-b-2xl  bg-white text-gray-800 flex items-center justify-between gap-3">
      <StatCard
        status="Gesamt"
        quantity={total.toString()}
        path="data.svg"
        iconColor="blue"
      />
      <StatCard
        status="Abgeschlossen"
        quantity={completed.toString()}
        path="checkmark.svg"
        iconColor="green"
      />
      <StatCard
        status="Zugewiesen"
        quantity={assigned.toString()}
        path="users.svg"
        iconColor="violet"
      />
      <StatCard
        status="Hohe Priorität"
        quantity={highPriority.toString()}
        path="target2.svg"
        iconColor="red"
      />
    </div>
  );
}
