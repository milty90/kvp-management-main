import { KvpStatBar } from "../components/layout/KvpStatBar";
import StatActionBar from "../components/layout/StatActionBar";
import StatBar from "../components/layout/StatBar";
import TopBar from "../components/layout/TopBar";
import type { Kvp } from "../types";

interface StatsViewProps {
  kvps?: Kvp[];
}

function StatsView({ kvps = [] }: StatsViewProps) {
  return (
    <div className="flex flex-col px-8 pb-0 pt-8 items-center bg-gray-100 gap-4 h-screen min-h-0 overflow-hidden">
      <TopBar
        kvpButtonColor="gray"
        statButtonColor="blue"
        kvpBar={
          <KvpStatBar
            total={kvps.length}
            completed={kvps.filter((k) => k.state === "Act").length}
            assigned={kvps.filter((k) => k.assignedTo !== "").length}
            highPriority={kvps.filter((k) => k.priority === "High").length}
          />
        }
      />
      <StatActionBar />
      <div className="w-full flex-1 min-h-0">
        <StatBar kvps={kvps} />
      </div>
    </div>
  );
}

export default StatsView;
