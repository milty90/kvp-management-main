import { KvpStatBar } from "../components/layout/KvpStatBar";
import StatBar from "../components/layout/StatBar";
import TopBar from "../components/layout/TopBar";
import { useKvpContext } from "../context/KvpContext";
import { useTheme } from "../context/ThemeContext";

function StatsView() {
  const { kvps } = useKvpContext();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col px-2 pt-0 md:px-8 pb-0 md:pt-8 items-center bg-background gap-3 h-screen min-h-0 overflow-hidden">
      <TopBar
        kvpButtonColor="gray"
        statButtonColor={theme === "dark" ? "green" : "blue"}
        kvpBar={
          <KvpStatBar
            total={kvps.length}
            completed={kvps.filter((k) => k.state === "Act").length}
            assigned={kvps.filter((k) => k.assignedTo !== "").length}
            highPriority={kvps.filter((k) => k.priority === "High").length}
          />
        }
      />
      <div className="w-full flex-1 min-h-0">
        <StatBar kvps={kvps} />
      </div>
    </div>
  );
}

export default StatsView;
